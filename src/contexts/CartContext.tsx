 import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "./AuthContext";
 import { toast } from "sonner";
 
 interface CartItem {
   id: string;
   bag_id: string;
   quantity: number;
   bag?: {
     id: string;
     name: string;
     bag_id: string;
     image_url: string | null;
   };
 }
 
 interface CartContextType {
   items: CartItem[];
   loading: boolean;
   itemCount: number;
   addToCart: (bagId: string) => Promise<void>;
   removeFromCart: (itemId: string) => Promise<void>;
   updateQuantity: (itemId: string, quantity: number) => Promise<void>;
   clearCart: () => Promise<void>;
   isOpen: boolean;
   setIsOpen: (open: boolean) => void;
 }
 
 const CartContext = createContext<CartContextType | undefined>(undefined);
 
 export const CartProvider = ({ children }: { children: ReactNode }) => {
   const { user } = useAuth();
   const [items, setItems] = useState<CartItem[]>([]);
   const [cartId, setCartId] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
 
   const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
 
   // Fetch or create cart when user changes
   useEffect(() => {
     if (!user) {
       setItems([]);
       setCartId(null);
       return;
     }
 
     const fetchCart = async () => {
       setLoading(true);
       try {
         // Try to get existing cart
         let { data: cart } = await supabase
           .from("carts")
           .select("id")
           .eq("user_id", user.id)
           .single();
 
         // Create cart if it doesn't exist
         if (!cart) {
           const { data: newCart, error } = await supabase
             .from("carts")
             .insert({ user_id: user.id })
             .select("id")
             .single();
           
           if (error) throw error;
           cart = newCart;
         }
 
         setCartId(cart.id);
 
         // Fetch cart items with bag details
         const { data: cartItems } = await supabase
           .from("cart_items")
           .select(`
             id,
             bag_id,
             quantity,
             bag:jute_bags(id, name, bag_id, image_url)
           `)
           .eq("cart_id", cart.id);
 
         setItems(cartItems as CartItem[] || []);
       } catch (err) {
         console.error("Error fetching cart:", err);
       } finally {
         setLoading(false);
       }
     };
 
     fetchCart();
   }, [user]);
 
   const addToCart = useCallback(async (bagId: string) => {
     if (!user || !cartId) {
       toast.error("Please sign in to add items to cart");
       return;
     }
 
      try {
        // Check if item already in cart
        const existingItem = items.find((item) => item.bag_id === bagId);

        if (existingItem) {
          // Update quantity
          await supabase
            .from("cart_items")
            .update({ quantity: existingItem.quantity + 1 })
            .eq("id", existingItem.id);
          
          setItems((prev) =>
            prev.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          );
        } else {
          // Add new item - handle potential duplicate key by upserting
          const { data, error } = await supabase
            .from("cart_items")
            .insert({ cart_id: cartId, bag_id: bagId })
            .select(`
              id,
              bag_id,
              quantity,
              bag:jute_bags(id, name, bag_id, image_url)
            `)
            .single();

          if (error) {
            // If duplicate key, fetch the existing item and increment
            if (error.code === "23505") {
              const { data: existing } = await supabase
                .from("cart_items")
                .select(`id, bag_id, quantity, bag:jute_bags(id, name, bag_id, image_url)`)
                .eq("cart_id", cartId)
                .eq("bag_id", bagId)
                .single();

              if (existing) {
                await supabase
                  .from("cart_items")
                  .update({ quantity: existing.quantity + 1 })
                  .eq("id", existing.id);
                
                setItems((prev) => {
                  const exists = prev.find((i) => i.id === existing.id);
                  if (exists) {
                    return prev.map((i) =>
                      i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i
                    );
                  }
                  return [...prev, { ...existing, quantity: existing.quantity + 1 } as CartItem];
                });
              }
            } else {
              throw error;
            }
          } else {
            setItems((prev) => [...prev, data as CartItem]);
          }
        }
 
       toast.success("Added to cart!");
       setIsOpen(true);
     } catch (err) {
       console.error("Error adding to cart:", err);
       toast.error("Failed to add to cart");
     }
   }, [user, cartId, items]);
 
   const removeFromCart = useCallback(async (itemId: string) => {
     try {
       await supabase.from("cart_items").delete().eq("id", itemId);
       setItems((prev) => prev.filter((item) => item.id !== itemId));
       toast.success("Removed from cart");
     } catch (err) {
       toast.error("Failed to remove item");
     }
   }, []);
 
   const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
     if (quantity < 1) {
       await removeFromCart(itemId);
       return;
     }
 
     try {
       await supabase
         .from("cart_items")
         .update({ quantity })
         .eq("id", itemId);
       
       setItems((prev) =>
         prev.map((item) =>
           item.id === itemId ? { ...item, quantity } : item
         )
       );
     } catch (err) {
       toast.error("Failed to update quantity");
     }
   }, [removeFromCart]);
 
   const clearCart = useCallback(async () => {
     if (!cartId) return;
 
     try {
       await supabase.from("cart_items").delete().eq("cart_id", cartId);
       setItems([]);
     } catch (err) {
       toast.error("Failed to clear cart");
     }
   }, [cartId]);
 
   return (
     <CartContext.Provider
       value={{
         items,
         loading,
         itemCount,
         addToCart,
         removeFromCart,
         updateQuantity,
         clearCart,
         isOpen,
         setIsOpen,
       }}
     >
       {children}
     </CartContext.Provider>
   );
 };
 
 export const useCart = () => {
   const context = useContext(CartContext);
   if (context === undefined) {
     throw new Error("useCart must be used within a CartProvider");
   }
   return context;
 };