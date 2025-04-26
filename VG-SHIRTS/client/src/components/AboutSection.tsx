import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-100" id="par-mums">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1555529771-122e5d9f2341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" 
              alt="Veikala interjers" 
              className="rounded-xl shadow-lg"
            />
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-black mb-6">Par mums</h2>
            <p className="text-gray-600 mb-6">
              MONO ir Latvijā dibināts apģērbu zīmols, kas specializējas minimālistiskā dizaina T-kreklos. 
              Mūsu mērķis ir piedāvāt augstas kvalitātes, vienkāršus, bet eleganttus apģērbus, kas ir 
              piemēroti gan ikdienas valkāšanai, gan īpašiem gadījumiem.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <div className="flex items-center mb-2">
                  <CheckCircle className="text-black mr-2 h-5 w-5" />
                  <h3 className="font-semibold">Kvalitāte</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Mēs izmantojam tikai augstākās kvalitātes materiālus, lai nodrošinātu mūsu produktu izturību.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <CheckCircle className="text-black mr-2 h-5 w-5" />
                  <h3 className="font-semibold">Ilgtspēja</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Mūsu ražošanas process ir videi draudzīgs, izmantojot organiskos un pārstrādātos materiālus.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <CheckCircle className="text-black mr-2 h-5 w-5" />
                  <h3 className="font-semibold">Dizains</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Mūsu T-krekli ir izstrādāti ar minimālistisku pieeju, kas izceļ vienkāršības eleganci.
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <CheckCircle className="text-black mr-2 h-5 w-5" />
                  <h3 className="font-semibold">Lokāli ražots</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Visi mūsu produkti tiek ražoti Latvijā, atbalstot vietējo ekonomiku.
                </p>
              </div>
            </div>
            
            <Button 
              asChild
              className="bg-black text-white hover:bg-gray-800"
            >
              <Link href="/kontakti">Sazināties ar mums</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
