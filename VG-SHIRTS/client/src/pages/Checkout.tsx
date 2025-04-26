import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/context/CartContext";
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
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Link, useLocation } from "wouter";

const formSchema = z.object({
  customerName: z.string().min(2, { message: "Vārds ir pārāk īss" }),
  customerEmail: z.string().email({ message: "Nederīga e-pasta adrese" }),
  customerPhone: z.string().min(8, { message: "Telefona numurs ir pārāk īss" }),
  customerAddress: z.string().min(5, { message: "Adrese ir pārāk īsa" }),
  cardNumber: z.string().min(16, { message: "Nederīgs kartes numurs" }),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Formāts: MM/YY" }),
  cardCvc: z.string().min(3, { message: "Nederīgs CVC" }),
});

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const shipping = 5.00;
  const totalWithShipping = cartTotal + shipping;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerAddress: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  const orderMutation = useMutation({
    mutationFn: (orderData: any) => {
      return apiRequest("POST", "/api/orders", orderData);
    },
    onSuccess: () => {
      clearCart();
      setLocation("/");
      toast({
        title: "Pasūtījums veiksmīgi izveidots!",
        description: "Paldies par pirkumu! Jūs drīz saņemsiet e-pastu ar apstiprinājumu.",
      });
    },
    onError: (error) => {
      toast({
        title: "Kļūda!",
        description: error instanceof Error ? error.message : "Radās kļūda, mēģiniet vēlreiz.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (cartItems.length === 0) {
      toast({
        title: "Grozs ir tukšs",
        description: "Lūdzu, pievienojiet preces grozam pirms pasūtījuma veikšanas.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real application, you would process the payment here
    
    // Prepare order data
    const orderData = {
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      customerPhone: values.customerPhone,
      customerAddress: values.customerAddress,
      items: cartItems,
      total: totalWithShipping,
      status: "pending"
    };
    
    // Submit order
    orderMutation.mutate(orderData);
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Jūsu grozs ir tukšs</h2>
        <p className="text-gray-600 mb-8">Lūdzu, pievienojiet preces grozam pirms pasūtījuma veikšanas.</p>
        <Button asChild className="bg-black text-white hover:bg-gray-800">
          <Link href="/">Atgriezties veikalā</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-black mb-8 text-center">Kases apstrāde</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Piegādes un maksājuma informācija</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Piegādes informācija</h3>
                  
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pilns vārds</FormLabel>
                        <FormControl>
                          <Input placeholder="Jānis Bērziņš" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-pasta adrese</FormLabel>
                          <FormControl>
                            <Input placeholder="janis@piemers.lv" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefona numurs</FormLabel>
                          <FormControl>
                            <Input placeholder="+371 12345678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="customerAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Piegādes adrese</FormLabel>
                        <FormControl>
                          <Input placeholder="Brīvības iela 1, Rīga, LV-1010" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Maksājuma informācija</h3>
                  
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kartes numurs</FormLabel>
                        <FormControl>
                          <Input placeholder="1234 5678 9012 3456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cardExpiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Derīguma termiņš</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cardCvc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVC/CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-black text-white hover:bg-gray-800 mt-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Apstrādā..." : `Apmaksāt €${totalWithShipping.toFixed(2)}`}
                </Button>
              </form>
            </Form>
          </div>
        </div>
        
        <div className="md:col-span-5">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Jūsu pasūtījums</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={`${item.productId}-${index}`} className="flex justify-between">
                  <div className="flex items-start">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-16 w-16 object-cover rounded-md mr-3" 
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.color === "#000000" ? "Melns" : 
                         item.color === "#FFFFFF" ? "Balts" : 
                         item.color === "#808080" ? "Pelēks" : 
                         item.color} | {item.size}
                      </p>
                      <p className="text-sm text-gray-600">Skaits: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <Separator />
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Kopā:</span>
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Piegāde:</span>
                <span>€{shipping.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Gala summa:</span>
                <span>€{totalWithShipping.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
