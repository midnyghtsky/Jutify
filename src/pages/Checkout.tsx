import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Send, Leaf, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const orderInquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  phone: z.string().regex(/^[\d\s+()-]*$/, "Invalid phone number").max(20, "Phone number too long").optional().or(z.literal("")),
  message: z.string().max(1000, "Message must be less than 1000 characters").optional().or(z.literal("")),
});
 
 const Checkout = () => {
   const { items, clearCart } = useCart();
   const { user } = useAuth();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [submitted, setSubmitted] = useState(false);
   const [form, setForm] = useState({
     name: "",
     email: user?.email || "",
     phone: "",
     message: "",
   });
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!user) {
       toast.error("Please sign in to submit inquiry");
       return;
     }
 
     setLoading(true);
     try {
      // Validate form input
      const validationResult = orderInquirySchema.safeParse({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });

      if (!validationResult.success) {
        toast.error(validationResult.error.errors[0].message);
        setLoading(false);
        return;
      }

      const validated = validationResult.data;

      // Create inquiry
      const { data: inquiry, error: inquiryError } = await supabase
        .from("order_inquiries")
        .insert({
          user_id: user.id,
          name: validated.name,
          email: validated.email,
          phone: validated.phone || null,
          message: validated.message || null,
        })
        .select("id")
        .single();

      if (inquiryError) throw inquiryError;
 
       // Add inquiry items
       const inquiryItems = items.map((item) => ({
         inquiry_id: inquiry.id,
         bag_id: item.bag_id,
         quantity: item.quantity,
       }));
 
       const { error: itemsError } = await supabase
         .from("order_inquiry_items")
         .insert(inquiryItems);
 
       if (itemsError) throw itemsError;
 
        // Send email notification
        const emailPayload = {
          inquiry: {
            name: validated.name,
            email: validated.email,
            phone: validated.phone || null,
            message: validated.message || null,
            items: items.map((item) => ({
              name: item.bag?.name || "Unknown",
              bag_id: item.bag?.bag_id || "N/A",
              quantity: item.quantity,
            })),
          },
        };

        const { error: emailError } = await supabase.functions.invoke(
          "send-inquiry-email",
          { body: emailPayload }
        );

        if (emailError) {
          console.error("Email notification failed:", emailError);
          // Don't block the user; inquiry is already saved
        }

        // Show success (keep items in cart)
        setSubmitted(true);
        toast.success("Inquiry submitted successfully!");
     } catch (err) {
       console.error("Error submitting inquiry:", err);
       toast.error("Failed to submit inquiry. Please try again.");
     } finally {
       setLoading(false);
     }
   };
 
   if (!user) {
     return (
       <div className="min-h-screen bg-background flex items-center justify-center p-4">
         <Card className="max-w-md w-full">
           <CardContent className="p-8 text-center">
             <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
               <Leaf className="w-8 h-8 text-primary" />
             </div>
             <h2 className="text-xl font-bold mb-2">Sign In Required</h2>
             <p className="text-muted-foreground mb-6">
               Please sign in to submit an order inquiry
             </p>
             <Link to="/auth">
               <Button>Sign In</Button>
             </Link>
           </CardContent>
         </Card>
       </div>
     );
   }
 
   if (submitted) {
     return (
       <div className="min-h-screen bg-background flex items-center justify-center p-4">
         <Card className="max-w-md w-full">
           <CardContent className="p-8 text-center">
             <div className="w-16 h-16 rounded-full bg-leaf/10 flex items-center justify-center mx-auto mb-4">
               <Check className="w-8 h-8 text-leaf" />
             </div>
             <h2 className="text-2xl font-bold mb-2">Inquiry Submitted!</h2>
             <p className="text-muted-foreground mb-6">
               Thank you for your interest! We'll review your request and get back to you within 24-48 hours with pricing and availability.
             </p>
             <Link to="/">
               <Button>Back to Home</Button>
             </Link>
           </CardContent>
         </Card>
       </div>
     );
   }
 
   if (items.length === 0) {
     return (
       <div className="min-h-screen bg-background flex items-center justify-center p-4">
         <Card className="max-w-md w-full">
           <CardContent className="p-8 text-center">
             <div className="text-6xl mb-4">🛒</div>
             <h2 className="text-xl font-bold mb-2">Cart is Empty</h2>
             <p className="text-muted-foreground mb-6">
               Add some items to your cart before checking out
             </p>
             <Link to="/products">
               <Button>Browse Products</Button>
             </Link>
           </CardContent>
         </Card>
       </div>
     );
   }
 
   return (
     <div className="min-h-screen bg-background pb-8">
       <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
         <div className="container mx-auto px-4 py-4">
           <Link to="/products" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors w-fit">
             <ArrowLeft className="w-5 h-5" />
             <span className="font-medium">Back to Products</span>
           </Link>
         </div>
       </header>
 
       <main className="container mx-auto px-4 max-w-2xl pt-8">
         <div className="text-center mb-8">
           <h1 className="text-3xl font-bold mb-2">Request Quote</h1>
           <p className="text-muted-foreground">
             Fill in your details and we'll get back to you with pricing
           </p>
         </div>
 
         {/* Order Summary */}
         <Card className="mb-6">
           <CardHeader>
             <CardTitle className="text-lg">Your Items</CardTitle>
           </CardHeader>
           <CardContent className="space-y-3">
             {items.map((item) => (
               <div key={item.id} className="flex justify-between items-center">
                 <div>
                   <span className="font-medium">{item.bag?.name}</span>
                   <span className="text-muted-foreground ml-2">× {item.quantity}</span>
                 </div>
                 <span className="text-sm text-muted-foreground">{item.bag?.bag_id}</span>
               </div>
             ))}
           </CardContent>
         </Card>
 
         {/* Contact Form */}
         <Card>
           <CardHeader>
             <CardTitle className="text-lg">Contact Information</CardTitle>
             <CardDescription>
               We'll use this information to send you a quote
             </CardDescription>
           </CardHeader>
           <CardContent>
             <form onSubmit={handleSubmit} className="space-y-4">
               <div className="space-y-2">
                 <Label htmlFor="name">Full Name *</Label>
                 <Input
                   id="name"
                   value={form.name}
                   onChange={(e) => setForm({ ...form, name: e.target.value })}
                   placeholder="Your name"
                   required
                 />
               </div>
 
               <div className="space-y-2">
                 <Label htmlFor="email">Email *</Label>
                 <Input
                   id="email"
                   type="email"
                   value={form.email}
                   onChange={(e) => setForm({ ...form, email: e.target.value })}
                   placeholder="you@example.com"
                   required
                 />
               </div>
 
               <div className="space-y-2">
                 <Label htmlFor="phone">Phone (optional)</Label>
                 <Input
                   id="phone"
                   type="tel"
                   value={form.phone}
                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
                   placeholder="+1 (555) 123-4567"
                 />
               </div>
 
               <div className="space-y-2">
                 <Label htmlFor="message">Additional Notes (optional)</Label>
                 <Textarea
                   id="message"
                   value={form.message}
                   onChange={(e) => setForm({ ...form, message: e.target.value })}
                   placeholder="Any special requirements or questions..."
                   rows={3}
                 />
               </div>
 
               <Button type="submit" className="w-full" disabled={loading}>
                 <Send className="w-4 h-4 mr-2" />
                 {loading ? "Submitting..." : "Submit Inquiry"}
               </Button>
             </form>
           </CardContent>
         </Card>
       </main>
     </div>
   );
 };
 
 export default Checkout;