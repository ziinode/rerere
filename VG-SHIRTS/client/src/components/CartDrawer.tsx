import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { XIcon, Plus, Minus } from "lucide-react";
import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";

const CartDrawer = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartTotal 
  } = useCart();
  
  const shipping = cartTotal > 0 ? 5.00 : 0;
  const totalWithShipping = cartTotal + shipping;

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsCartOpen(false)}>
      <div 
        className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl z-50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-black">Jūsu grozs</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gray-600 hover:text-black"
              aria-label="Aizvērt grozu"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-gray-500 mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-16 w-16 mx-auto mb-4"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                    />
                  </svg>
                  <p className="text-lg font-medium">Jūsu grozs ir tukšs</p>
                  <p className="text-sm mt-2">Iepriekš pievienotās preces būs redzamas šeit</p>
                </div>
                <Button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 bg-black text-white hover:bg-gray-800"
                >
                  Turpināt iepirkties
                </Button>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex py-4 border-b border-gray-200">
                  <div className="h-20 w-20 rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-black">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(index)}
                        className="text-gray-600 hover:text-black"
                        aria-label="Dzēst preci"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {item.color === "#000000" ? "Melns" : 
                       item.color === "#FFFFFF" ? "Balts" : 
                       item.color === "#808080" ? "Pelēks" : 
                       item.color} | {item.size}
                    </p>
                    <div className="flex justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button 
                          className="px-2 py-1 text-gray-600 hover:text-black"
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          aria-label="Samazināt daudzumu"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 py-1 border-x border-gray-200">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 text-gray-600 hover:text-black"
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          aria-label="Palielināt daudzumu"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Kopā:</span>
                <span className="font-medium">€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Piegāde:</span>
                <span className="font-medium">€{shipping.toFixed(2)}</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between mb-6 text-lg font-bold">
                <span>Gala summa:</span>
                <span>€{totalWithShipping.toFixed(2)}</span>
              </div>
              
              <Button 
                asChild
                className="w-full bg-black text-white hover:bg-gray-800 mb-2"
              >
                <Link href="/apmaksa" onClick={() => setIsCartOpen(false)}>
                  Doties uz kasi
                </Link>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsCartOpen(false)}
                className="w-full border-black text-black hover:bg-gray-100"
              >
                Turpināt iepirkties
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
