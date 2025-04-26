import { Link } from "wouter";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Product } from "@shared/schema";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes[0], product.colors[0]);
  };

  return (
    <Link href={`/produkts/${product.id}`}>
      <div className="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 cursor-pointer h-full">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <button 
              className="bg-white rounded-full h-8 w-8 flex items-center justify-center shadow-sm hover:shadow-md transition"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              aria-label="Pievienot vēlmēm"
            >
              <Heart className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          
          {product.isNew && (
            <div className="absolute top-3 left-3">
              <span className="bg-black text-white text-xs py-1 px-2 rounded">JAUNS</span>
            </div>
          )}
          
          {product.isSale && (
            <div className="absolute top-3 left-3">
              <span className="bg-gray-700 text-white text-xs py-1 px-2 rounded">IZPĀRDOŠANA</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-black font-semibold text-lg mb-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{product.material}</p>
          <div className="flex justify-between items-center">
            <div>
              {product.discountPrice ? (
                <>
                  <span className="text-black font-bold">€{product.price.toFixed(2)}</span>
                  <span className="text-gray-500 line-through text-sm ml-2">€{product.discountPrice.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-black font-bold">€{product.price.toFixed(2)}</span>
              )}
            </div>
            <Button 
              onClick={handleAddToCart}
              className="bg-black text-white hover:bg-gray-800 rounded-lg px-3 py-1 text-sm"
            >
              Pievienot grozam
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
