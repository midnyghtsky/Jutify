 import { useState } from "react";
 import { useNavigate, Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
 import { Label } from "@/components/ui/label";
 import { ArrowLeft, Leaf, Mail, Lock } from "lucide-react";
 import { useAuth } from "@/contexts/AuthContext";
 import { toast } from "sonner";
 
const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [honeypot, setHoneypot] = useState("");
    const [loading, setLoading] = useState(false);
    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // Honeypot check — bots fill this hidden field, humans don't
      if (honeypot) {
        toast.error("Submission blocked.");
        return;
      }

      setLoading(true);
  
      try {
        if (isLogin) {
          const { error } = await signIn(email, password);
          if (error) {
            toast.error(error.message);
          } else {
            toast.success("Welcome back!");
            navigate("/");
          }
        } else {
          const { error } = await signUp(email, password);
          if (error) {
            toast.error(error.message);
          } else {
            toast.success("Check your email to confirm your account!");
          }
        }
      } catch (err) {
        toast.error("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
 
   return (
     <div className="min-h-screen bg-background flex flex-col">
       <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
         <div className="container mx-auto px-4 py-4">
           <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors w-fit">
             <ArrowLeft className="w-5 h-5" />
             <span className="font-medium">Home</span>
           </Link>
         </div>
       </header>
 
       <main className="flex-1 flex items-center justify-center p-4">
         <Card className="w-full max-w-md">
           <CardHeader className="text-center">
             <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
               <Leaf className="w-8 h-8 text-primary" />
             </div>
             <CardTitle className="text-2xl">
               {isLogin ? "Welcome Back" : "Join Us"}
             </CardTitle>
             <CardDescription>
               {isLogin
                 ? "Sign in to access your cart and orders"
                 : "Create an account to start shopping sustainably"}
             </CardDescription>
           </CardHeader>
           <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field — hidden from real users, catches bots */}
                <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                  />
                </div>
               <div className="space-y-2">
                 <Label htmlFor="email">Email</Label>
                 <div className="relative">
                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                   <Input
                     id="email"
                     type="email"
                     placeholder="you@example.com"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="pl-10"
                     required
                   />
                 </div>
               </div>
 
               <div className="space-y-2">
                 <Label htmlFor="password">Password</Label>
                 <div className="relative">
                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                   <Input
                     id="password"
                     type="password"
                     placeholder="••••••••"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="pl-10"
                     required
                     minLength={6}
                   />
                 </div>
               </div>
 
               <Button type="submit" className="w-full" disabled={loading}>
                 {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
               </Button>
             </form>
 
             <div className="mt-6 text-center">
               <button
                 type="button"
                 onClick={() => setIsLogin(!isLogin)}
                 className="text-sm text-muted-foreground hover:text-primary transition-colors"
               >
                 {isLogin
                   ? "Don't have an account? Sign up"
                   : "Already have an account? Sign in"}
               </button>
             </div>
           </CardContent>
         </Card>
       </main>
     </div>
   );
 };
 
 export default Auth;