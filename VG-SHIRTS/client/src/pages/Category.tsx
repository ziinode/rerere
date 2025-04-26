import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/ProductCard";
import { type Product } from "@shared/schema";

const Category = () => {
  const { category } = useParams();
  
  // Map URL parameter to category name
  const categoryMap: Record<string, string> = {
    "viriesi": "viriesi",
    "sievietes": "sievietes",
    "unisex": "unisex"
  };
  
  // Get properly formatted category for API query or display
  const normalizedCategory = category ? (categoryMap[category as string] || category) : "all";
  
  // Localized category names for display
  const categoryNames: Record<string, string> = {
    "viriesi": "Vīriešiem",
    "sievietes": "Sievietēm",
    "unisex": "Unisex",
    "all": "Visi produkti"
  };
  
  const displayCategory = normalizedCategory ? (categoryNames[normalizedCategory] || normalizedCategory) : "Visi produkti";
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: [`/api/products/category/${normalizedCategory}`],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Atpakaļ uz sākumlapu
            </Link>
          </Button>
          <Skeleton className="h-12 w-48 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        
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
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Nav atrasts neviens produkts</h2>
        <p className="text-gray-600 mb-8">Diemžēl šajā kategorijā nav pieejami produkti.</p>
        <Button asChild className="bg-black text-white hover:bg-gray-800">
          <Link href="/">Atgriezties veikalā</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Atpakaļ uz sākumlapu
        </Link>
      </Button>
      
      <h1 className="text-3xl font-bold text-black mb-4">{displayCategory}</h1>
      <p className="text-gray-600 mb-8">
        Apskatiet mūsu jaunākos T-kreklus {displayCategory.toLowerCase()}, kas apvieno augstas kvalitātes materiālus ar mūsdienīgu dizainu.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;