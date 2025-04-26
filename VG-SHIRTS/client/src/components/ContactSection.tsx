import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPinIcon, 
  PhoneIcon, 
  MailIcon, 
  ClockIcon, 
  FacebookIcon, 
  InstagramIcon, 
  TwitterIcon 
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Vārds ir pārāk īss" }),
  email: z.string().email({ message: "Nederīga e-pasta adrese" }),
  subject: z.string().min(3, { message: "Tēma ir pārāk īsa" }),
  message: z.string().min(10, { message: "Ziņa ir pārāk īsa" }),
});

const ContactSection = () => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, this would send the form data to a server
    console.log(values);
    
    toast({
      title: "Ziņa nosūtīta!",
      description: "Mēs ar jums sazināsimies pēc iespējas ātrāk.",
    });
    
    form.reset();
  }

  return (
    <section className="py-16 bg-white" id="kontakti">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-black mb-12 text-center">Sazinies ar mums</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-black mb-6">Sūti mums ziņu</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vārds</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Jūsu vārds" 
                            {...field} 
                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-pasts</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="jusu.epasts@piemers.lv" 
                            {...field} 
                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tēma</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Jūsu ziņas tēma" 
                          {...field} 
                          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ziņa</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Rakstiet savu ziņu šeit..." 
                          {...field} 
                          rows={5}
                          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="bg-black text-white hover:bg-gray-800 px-6 py-3"
                >
                  Nosūtīt ziņu
                </Button>
              </form>
            </Form>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-black mb-6">Kontaktinformācija</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <MapPinIcon className="text-black mt-1 mr-4 h-5 w-5" />
                <div>
                  <h4 className="font-medium">Adrese</h4>
                  <p className="text-gray-600">Brīvības iela 123, Rīga, LV-1001</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <PhoneIcon className="text-black mt-1 mr-4 h-5 w-5" />
                <div>
                  <h4 className="font-medium">Telefons</h4>
                  <p className="text-gray-600">+371 12345678</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MailIcon className="text-black mt-1 mr-4 h-5 w-5" />
                <div>
                  <h4 className="font-medium">E-pasts</h4>
                  <p className="text-gray-600">info@mono.lv</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <ClockIcon className="text-black mt-1 mr-4 h-5 w-5" />
                <div>
                  <h4 className="font-medium">Darba laiks</h4>
                  <p className="text-gray-600">Pirmdiena - Piektdiena: 10:00 - 18:00</p>
                  <p className="text-gray-600">Sestdiena: 11:00 - 16:00</p>
                  <p className="text-gray-600">Svētdiena: Slēgts</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Seko mums</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-black text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={20} />
                </a>
                <a 
                  href="#" 
                  className="bg-black text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={20} />
                </a>
                <a 
                  href="#" 
                  className="bg-black text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                  aria-label="Twitter"
                >
                  <TwitterIcon size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
