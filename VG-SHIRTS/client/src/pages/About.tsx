import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

const About = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Atpakaļ uz sākumlapu
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold text-black mb-8">Par mums</h1>
      </div>
      
      <AboutSection />
      <div className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-black mb-6">Mūsu vērtības</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Kvalitāte</h3>
              <p className="text-gray-600">
                MONO uzstāj uz visaugstāko kvalitāti katrā T-kreklā. Mēs rūpīgi izvēlamies materiālus, 
                lai garantētu, ka katrs apģērbs kalpo ilgi un saglabā savu formu un krāsu arī pēc daudzām 
                mazgāšanas reizēm.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Ilgtspēja</h3>
              <p className="text-gray-600">
                Mēs ticam, ka mode var būt gan stilīga, gan atbildīga. Mūsu ražošanas process ir videi 
                draudzīgs, un mēs cenšamies samazināt savu ietekmi uz vidi, izmantojot organiskos un 
                pārstrādātos materiālus kur vien iespējams.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Vietējā ražošana</h3>
              <p className="text-gray-600">
                Visi MONO produkti tiek dizainēti un ražoti Latvijā. Mēs lepojamies ar mūsu amatnieku 
                darbu un vietējo tradīciju saglabāšanu, vienlaikus atbalstot vietējo ekonomiku un radot 
                darbavietas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;