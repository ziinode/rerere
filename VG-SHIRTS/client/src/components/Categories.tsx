import { Link } from "wouter";
import { ArrowRightIcon } from "lucide-react";

const Categories = () => {
  return (
    <section className="py-16 bg-gray-100" id="produkti">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-black mb-12 text-center">Veikals</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pamata kolekcija */}
          <div className="relative rounded-xl overflow-hidden group cursor-pointer h-96">
            <img 
              src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80" 
              alt="T-krekli" 
              className="w-full h-full object-cover transition duration-300 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-bold mb-2">Pamata kolekcija</h3>
              <p className="text-white/80 mb-4">Klasiskie T-krekli</p>
              <Link 
                href="/veikals"
                className="text-white font-medium flex items-center hover:underline"
              >
                Skatīt visus
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Jaunumi */}
          <div className="relative rounded-xl overflow-hidden group cursor-pointer h-96">
            <img 
              src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80" 
              alt="Jaunumi" 
              className="w-full h-full object-cover transition duration-300 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-bold mb-2">Jaunumi</h3>
              <p className="text-white/80 mb-4">Jaunākā kolekcija</p>
              <Link 
                href="/veikals"
                className="text-white font-medium flex items-center hover:underline"
              >
                Skatīt jaunumus
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Izpārdošana */}
          <div className="relative rounded-xl overflow-hidden group cursor-pointer h-96">
            <img 
              src="https://images.unsplash.com/photo-1613915617430-8ab0fd7c6d4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80" 
              alt="Izpārdošana" 
              className="w-full h-full object-cover transition duration-300 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-bold mb-2">Izpārdošana</h3>
              <p className="text-white/80 mb-4">Īpašie piedāvājumi</p>
              <Link 
                href="/veikals"
                className="text-white font-medium flex items-center hover:underline"
              >
                Skatīt piedāvājumus
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
