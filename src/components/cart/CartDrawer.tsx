 import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
 import { Button } from "@/components/ui/button";
 import { ShoppingCart, Plus, Minus, Trash2, Leaf } from "lucide-react";
 import { useCart } from "@/contexts/CartContext";
 import { useAuth } from "@/contexts/AuthContext";
 import { Link, useNavigate } from "react-router-dom";
 import { Badge } from "@/components/ui/badge";
 
 const CartDrawer = () => {
   const { items, itemCount, isOpen, setIsOpen, removeFromCart, updateQuantity } = useCart();
   const { user } = useAuth();
   const navigate = useNavigate();
 
   const handleCheckout = () => {
     setIsOpen(false);
     navigate("/checkout");
   };
 
   return (
     <Sheet open={isOpen} onOpenChange={setIsOpen}>
       <SheetTrigger asChild>
         <Button variant="ghost" size="icon" className="relative">
           <ShoppingCart className="w-5 h-5" />
           {itemCount > 0 && (
             <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
               {itemCount}
             </Badge>
           )}
         </Button>
       </SheetTrigger>
       <SheetContent className="w-full sm:max-w-md flex flex-col">
         <SheetHeader>
           <SheetTitle className="flex items-center gap-2">
             <ShoppingCart className="w-5 h-5" />
             Your Cart
           </SheetTitle>
         </SheetHeader>
 
         {!user ? (
           <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
             <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
               <Leaf className="w-8 h-8 text-primary" />
             </div>
             <h3 className="text-lg font-semibold mb-2">Sign in to view cart</h3>
             <p className="text-muted-foreground mb-4">
               Create an account to save your cart and place orders
             </p>
             <Link to="/auth" onClick={() => setIsOpen(false)}>
               <Button>Sign In</Button>
             </Link>
           </div>
         ) : items.length === 0 ? (
           <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
             <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 text-3xl">
               🛒
             </div>
             <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
             <p className="text-muted-foreground mb-4">
               Browse our sustainable jute bags and add some to your cart
             </p>
             <Link to="/products" onClick={() => setIsOpen(false)}>
               <Button>Browse Products</Button>
             </Link>
           </div>
         ) : (
           <>
             <div className="flex-1 overflow-y-auto py-4 space-y-4">
               {items.map((item) => (
                 <div
                   key={item.id}
                   className="flex gap-4 p-3 rounded-lg bg-muted/50"
                 >
                    {(() => {
                      const bagImageMap: Record<string, string> = {
                        "JUTE-001": "/images/bag-1.jpeg",
                        "JUTE-002": "/images/bag-2.jpeg",
                        "JUTE-003": "/images/bag-3.png",
                      };
                      const imgSrc = bagImageMap[item.bag?.bag_id || ""] || "/images/bag-1.jpeg";
                      return (
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={imgSrc} alt={item.bag?.name} className="w-full h-full object-cover" />
                        </div>
                      );
                    })()}
                   <div className="flex-1 min-w-0">
                     <h4 className="font-medium truncate">{item.bag?.name}</h4>
                     <p className="text-sm text-muted-foreground">{item.bag?.bag_id}</p>
                     <div className="flex items-center gap-2 mt-2">
                       <Button
                         variant="outline"
                         size="icon"
                         className="h-7 w-7"
                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
                       >
                         <Minus className="w-3 h-3" />
                       </Button>
                       <span className="w-8 text-center">{item.quantity}</span>
                       <Button
                         variant="outline"
                         size="icon"
                         className="h-7 w-7"
                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
                       >
                         <Plus className="w-3 h-3" />
                       </Button>
                     </div>
                   </div>
                   <Button
                     variant="ghost"
                     size="icon"
                     className="h-8 w-8 text-muted-foreground hover:text-destructive"
                     onClick={() => removeFromCart(item.id)}
                   >
                     <Trash2 className="w-4 h-4" />
                   </Button>
                 </div>
               ))}
             </div>
 
             <div className="border-t pt-4 space-y-4">
               <div className="flex justify-between text-sm">
                 <span className="text-muted-foreground">Total items</span>
                 <span className="font-medium">{itemCount}</span>
               </div>
               <Button className="w-full" onClick={handleCheckout}>
                 Request Quote
               </Button>
               <p className="text-xs text-center text-muted-foreground">
                 Submit an inquiry and we'll get back to you with pricing
               </p>
             </div>
           </>
         )}
       </SheetContent>
     </Sheet>
   );
 };
 
 export default CartDrawer;