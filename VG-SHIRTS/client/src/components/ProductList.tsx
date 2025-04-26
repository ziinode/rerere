import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { type Product } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const ProductList = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });
  
  const filteredProducts = products?.filter(product => {
    if (activeCategory === "all") return true;
    return product.category === activeCategory;
  });

  return (
    <section className="py-16 bg-white" id="produkti">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-black mb-4 text-center">Mūsu produkti</h2>
        <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
          Apskatiet mūsu jaunākos T-kreklus, kas apvieno augstas kvalitātes materiālus ar mūsdienīgu dizainu.
        </p>
        
        <div className="flex flex-wrap mb-8 justify-center">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            className={activeCategory === "all" ? "bg-black text-white" : "bg-white text-black border-gray-300"}
            onClick={() => setActiveCategory("all")}
          >
            Visi
          </Button>
          <Button
            variant={activeCategory === "viriesi" ? "default" : "outline"}
            className={activeCategory === "viriesi" ? "bg-black text-white" : "bg-white text-black border-gray-300"}
            onClick={() => setActiveCategory("viriesi")}
          >
            Vīriešiem
          </Button>
          <Button
            variant={activeCategory === "sievietes" ? "default" : "outline"}
            className={activeCategory === "sievietes" ? "bg-black text-white" : "bg-white text-black border-gray-300"}
            onClick={() => setActiveCategory("sievietes")}
          >
            Sievietēm
          </Button>
          <Button
            variant={activeCategory === "unisex" ? "default" : "outline"}
            className={activeCategory === "unisex" ? "bg-black text-white" : "bg-white text-black border-gray-300"}
            onClick={() => setActiveCategory("unisex")}
          >
            Unisex
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <Skeleton className="h-64 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-8 w-28" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Button 
            variant="outline"
            className="border-black text-black hover:bg-gray-100"
          >
            Skatīt vairāk produktu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
