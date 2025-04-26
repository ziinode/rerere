import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Star, 
  StarHalf,
  Heart, 
  Plus, 
  Minus 
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { type Product } from "@shared/schema";
import { useCart } from "@/context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const productId = parseInt(id as string);
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();
  
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
  });
  
  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor) return;
    
    addToCart(product, quantity, selectedSize, selectedColor);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <Skeleton className="w-full h-[500px] rounded-lg" />
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-full h-20 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-6" />
            <Skeleton className="h-5 w-full mb-8" />
            
            <Skeleton className="h-6 w-1/4 mb-2" />
            <div className="flex flex-wrap gap-2 mb-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-12" />
              ))}
            </div>
            
            <Skeleton className="h-6 w-1/4 mb-2" />
            <div className="flex gap-3 mb-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
            </div>
            
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-10 w-32 mb-8" />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Produkts nav atrasts</h2>
        <p className="text-gray-600 mb-8">Diemžēl pieprasītais produkts neeksistē vai nav pieejams.</p>
        <Button asChild className="bg-black text-white hover:bg-gray-800">
          <Link href="/">Atgriezties veikalā</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        asChild
        className="mb-6 flex items-center text-black"
      >
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Atpakaļ uz veikalu
        </Link>
      </Button>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="overflow-hidden rounded-lg mb-4">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-auto object-cover" 
            />
          </div>
          {/* Thumbnail gallery would go here, but we only have one image per product in our data */}
          <div className="grid grid-cols-4 gap-2">
            <div className="rounded-lg overflow-hidden border-2 border-black">
              <img 
                src={product.images[0]} 
                alt={`${product.name} skats 1`} 
                className="w-full h-20 object-cover" 
              />
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold text-black">
                €{product.price.toFixed(2)}
              </span>
              <div className="flex">
                <Star className="text-yellow-500 h-5 w-5" />
                <Star className="text-yellow-500 h-5 w-5" />
                <Star className="text-yellow-500 h-5 w-5" />
                <Star className="text-yellow-500 h-5 w-5" />
                <StarHalf className="text-yellow-500 h-5 w-5" />
                <span className="text-gray-600 ml-1">(24)</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">{product.name}</h1>
            <p className="text-gray-600">{product.material}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-black font-medium mb-2">Apraksts</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-black font-medium mb-2">Izvēlieties izmēru</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant="outline"
                  className={`border ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-600 text-gray-600 hover:border-black hover:text-black"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-red-500 text-sm mt-2">Lūdzu izvēlieties izmēru</p>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="text-black font-medium mb-2">Krāsa</h3>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`h-8 w-8 rounded-full ${
                    selectedColor === color ? "ring-2 ring-offset-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Krāsa: ${
                    color === "#000000" ? "Melns" : color === "#FFFFFF" ? "Balts" : "Pelēks"
                  }`}
                />
              ))}
            </div>
            {!selectedColor && (
              <p className="text-red-500 text-sm mt-2">Lūdzu izvēlieties krāsu</p>
            )}
          </div>
          
          <div className="mb-8">
            <h3 className="text-black font-medium mb-2">Daudzums</h3>
            <div className="flex w-32 h-10 border border-gray-300 rounded-lg overflow-hidden">
              <button 
                className="w-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                onClick={() => handleQuantityChange(-1)}
                aria-label="Samazināt daudzumu"
              >
                <Minus className="h-3 w-3" />
              </button>
              <input 
                type="number" 
                className="w-12 border-x border-gray-300 text-center focus:outline-none" 
                value={quantity} 
                min="1"
                readOnly
              />
              <button 
                className="w-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                onClick={() => handleQuantityChange(1)}
                aria-label="Palielināt daudzumu"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-black text-white hover:bg-gray-800 flex-1"
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
            >
              Pievienot grozam
            </Button>
            <Button 
              variant="outline" 
              className="border-black text-black hover:bg-gray-100"
            >
              <Heart className="mr-2 h-4 w-4" /> Pievienot vēlmēm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
