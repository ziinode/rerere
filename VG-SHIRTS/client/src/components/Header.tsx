import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, ShoppingCartIcon, MenuIcon, XIcon } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, toggleCart } = useCart();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigateTo = (path: string) => {
    setLocation(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`bg-white sticky top-0 z-50 transition-shadow ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-primary">
              MONO
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-primary hover:text-tertiary font-medium">
                Sākums
              </Link>
              <Link href="/veikals" className="text-primary hover:text-tertiary font-medium">
                Veikals
              </Link>
              <Link href="/par-mums" className="text-primary hover:text-tertiary font-medium">
                Par mums
              </Link>
              <Link href="/kontakti" className="text-primary hover:text-tertiary font-medium">
                Kontakti
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  type="text" 
                  placeholder="Meklēt..." 
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black" 
                />
              </div>
              
              <button 
                className="relative"
                onClick={toggleCart}
                aria-label="Atvērt grozu"
              >
                <ShoppingCartIcon className="text-black h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Aizvērt izvēlni" : "Atvērt izvēlni"}
              >
                {isMobileMenuOpen ? (
                  <XIcon className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 py-3 space-y-2 bg-white border-t border-gray-200">
            <div className="mb-3 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Meklēt..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black" 
              />
            </div>
            <Link href="/" className="block py-2 text-primary font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Sākums
            </Link>
            <Link 
              href="/veikals" 
              className="block py-2 text-primary font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Veikals
            </Link>
            <Link 
              href="/par-mums" 
              className="block py-2 text-primary font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Par mums
            </Link>
            <Link 
              href="/kontakti"
              className="block py-2 text-primary font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Kontakti
            </Link>
          </div>
        )}
      </header>
      
      <CartDrawer />
    </>
  );
};

export default Header;
