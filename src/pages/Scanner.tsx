import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, X, ArrowLeft, Keyboard, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Html5Qrcode } from "html5-qrcode";

type ScanState = "idle" | "scanning" | "permission-denied" | "error";

const Scanner = () => {
  const navigate = useNavigate();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualId, setManualId] = useState("");

  const handleScanResult = useCallback((decodedText: string) => {
    // Stop scanning immediately
    if (scannerRef.current?.isScanning) {
      scannerRef.current.stop().catch(() => {});
    }

    // Extract bag ID from URL or use raw text
    let bagId = decodedText;
    try {
      const url = new URL(decodedText);
      const match = url.pathname.match(/\/bag\/(.+)/);
      if (match) {
        bagId = match[1];
      }
    } catch {
      // Not a URL, use as-is
    }

    toast.success(`QR Code detected: ${bagId}`);
    navigate(`/bag/${bagId}`);
  }, [navigate]);

  const startCamera = async () => {
    try {
      setScanState("scanning");
      
      // Small delay to ensure the DOM element is rendered
      await new Promise(r => setTimeout(r, 100));

      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        handleScanResult,
        () => {} // ignore scan failures (no QR found yet)
      );
    } catch (err) {
      const errMsg = String(err);
      if (errMsg.includes("NotAllowedError") || errMsg.includes("Permission")) {
        setScanState("permission-denied");
      } else {
        setScanState("error");
      }
    }
  };

  const stopCamera = () => {
    if (scannerRef.current?.isScanning) {
      scannerRef.current.stop().catch(() => {});
    }
    scannerRef.current = null;
    setScanState("idle");
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualId.trim()) {
      navigate(`/bag/${manualId.trim()}`);
    } else {
      toast.error("Please enter a valid bag ID");
    }
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="text-lg font-bold text-foreground">Scan QR Code</h1>
          <div className="w-16" /> {/* Spacer */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-lg">
        {/* Camera View / Scanner */}
        {scanState === "scanning" ? (
          <div className="relative rounded-3xl overflow-hidden bg-muted mb-6">
            <div id="qr-reader" className="w-full" />

            {/* Close button */}
            <button
              onClick={stopCamera}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Loading indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm font-medium">Point at a QR code...</span>
              </div>
            </div>
          </div>
        ) : (
          <Card className="mb-6 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square bg-muted/50 flex flex-col items-center justify-center p-8 text-center">
                {scanState === "permission-denied" ? (
                  <>
                    <div className="p-4 rounded-full bg-destructive/10 mb-4">
                      <AlertCircle className="w-12 h-12 text-destructive" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Camera Access Denied</h3>
                    <p className="text-muted-foreground mb-6 max-w-xs">
                      Please allow camera access in your browser settings to scan QR codes.
                    </p>
                    <Button onClick={startCamera} variant="outline">
                      Try Again
                    </Button>
                  </>
                ) : scanState === "error" ? (
                  <>
                    <div className="p-4 rounded-full bg-destructive/10 mb-4">
                      <AlertCircle className="w-12 h-12 text-destructive" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Something Went Wrong</h3>
                    <p className="text-muted-foreground mb-6 max-w-xs">
                      We couldn't access your camera. Please try again or enter your bag ID manually.
                    </p>
                    <Button onClick={startCamera} variant="outline">
                      Try Again
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="p-6 rounded-full bg-primary/10 mb-6 animate-bounce-slow">
                      <Camera className="w-16 h-16 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Ready to Scan</h3>
                    <p className="text-muted-foreground mb-8 max-w-xs">
                      Point your camera at the QR code on your jute bag to discover its story.
                    </p>
                    <Button 
                      onClick={startCamera} 
                      size="lg" 
                      className="rounded-full px-8 bounce-hover"
                    >
                      <Camera className="mr-2 w-5 h-5" />
                      Start Scanning
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Manual Entry */}
        {showManualEntry ? (
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div>
                  <label htmlFor="bagId" className="block text-sm font-medium mb-2">
                    Enter Bag ID
                  </label>
                  <Input
                    id="bagId"
                    placeholder="e.g., JUTE-001"
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    className="text-center text-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Find the ID printed on your bag's label
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowManualEntry(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Find Bag
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Button
            variant="outline"
            className="w-full py-6 rounded-xl"
            onClick={() => setShowManualEntry(true)}
          >
            <Keyboard className="mr-2 w-5 h-5" />
            Enter ID Manually
          </Button>
        )}

        {/* Demo hint */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          📱 Tip: Try ID <strong>JUTE-001</strong> to see a demo bag
        </p>
      </main>
    </div>
  );
};

export default Scanner;
