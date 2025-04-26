import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.trim() === "") {
      toast({
        title: "Kļūda",
        description: "Lūdzu, ievadiet e-pasta adresi",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, this would send the email to a server
    toast({
      title: "Paldies par pierakstīšanos!",
      description: "Jūs saņemsiet jaunumus par mūsu produktiem un piedāvājumiem.",
    });
    
    setEmail("");
  };

  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Piesakies jaunumiem</h2>
          <p className="mb-8">Saņem informāciju par jaunākajiem produktiem un īpašajiem piedāvājumiem</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Tavs e-pasts"
              className="flex-1 px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              type="submit"
              className="bg-white text-black hover:bg-gray-100 px-6 py-6 text-base"
            >
              Pierakstīties
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
