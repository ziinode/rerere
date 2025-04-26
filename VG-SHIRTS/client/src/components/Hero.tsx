import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Minimālisma elegance <br/>ikdienas stilam
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-lg">
              Atklājiet mūsu jauno monohromātisko t-kreklu kolekciju, kas radīta, lai papildinātu jūsu garderobi ar laika pārbaudi izturējušu stilu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-base"
              >
                <Link href="/veikals">
                  Iepazīt kolekciju
                </Link>
              </Button>
              <Button 
                variant="outline" 
                asChild
                className="border-black text-black hover:bg-gray-100 px-8 py-6 text-base"
              >
                <Link href="/par-mums">
                  Par mūsu zīmolu
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="T-krekli uz modeļiem" 
              className="rounded-xl shadow-lg w-full h-auto object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
