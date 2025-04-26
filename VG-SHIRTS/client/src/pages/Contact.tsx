import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactSection from "@/components/ContactSection";

const Contact = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Atpakaļ uz sākumlapu
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold text-black mb-8">Kontakti</h1>
      </div>
      
      <ContactSection />
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-black mb-6">Bieži uzdotie jautājumi</h2>
        <div className="space-y-6">
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Cik ilgi aizņems mana pasūtījuma piegāde?</h3>
            <p className="text-gray-600">
              Standarta piegāde Latvijā aizņem 1-2 darba dienas. Pasūtījumi uz citām ES valstīm tiek piegādāti 3-5 darba dienu laikā.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Vai es varu apmainīt vai atgriezt produktu?</h3>
            <p className="text-gray-600">
              Jā, jūs varat apmainīt vai atgriezt produktus 14 dienu laikā pēc saņemšanas, ja tie ir nelietoti un oriģinālajā iepakojumā.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Kādi ir pieejamie maksājumu veidi?</h3>
            <p className="text-gray-600">
              Mēs pieņemam kredītkartes (Visa, Mastercard), PayPal, kā arī bankas pārskaitījumus.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Vai jūs piedāvājat vairumtirdzniecības iespējas?</h3>
            <p className="text-gray-600">
              Jā, mēs piedāvājam īpašus nosacījumus vairumtirdzniecības klientiem. Lūdzu, sazinieties ar mums pa e-pastu info@mono.lv, lai uzzinātu vairāk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;