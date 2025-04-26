import { Link } from "wouter";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MONO</h3>
            <p className="text-white/70 mb-4">Minimālistisks stils ikdienai un īpašiem brīžiem.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white" aria-label="Facebook">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white" aria-label="Instagram">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white" aria-label="Twitter">
                <TwitterIcon size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Veikals</h3>
            <ul className="space-y-2">
              <li><Link href="/veikals" className="text-white/70 hover:text-white">Visi produkti</Link></li>
              <li><Link href="/" className="text-white/70 hover:text-white">Jaunumi</Link></li>
              <li><Link href="/" className="text-white/70 hover:text-white">Piedāvājumi</Link></li>
              <li><Link href="/" className="text-white/70 hover:text-white">Dāvanu kartes</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Noderīgi</h3>
            <ul className="space-y-2">
              <li><Link href="/par-mums" className="text-white/70 hover:text-white">Par mums</Link></li>
              <li><Link href="/kontakti" className="text-white/70 hover:text-white">Kontakti</Link></li>
              <li><Link href="/kontakti" className="text-white/70 hover:text-white">Piegāde</Link></li>
              <li><Link href="/kontakti" className="text-white/70 hover:text-white">Apmaiņa un atgriešana</Link></li>
              <li><Link href="/kontakti" className="text-white/70 hover:text-white">Biežāk uzdotie jautājumi</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakti</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                <span className="text-white/70">Brīvības iela 123, Rīga, LV-1001</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-2"></i>
                <span className="text-white/70">+371 12345678</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-2"></i>
                <span className="text-white/70">info@mono.lv</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 mb-4 md:mb-0">© {new Date().getFullYear()} MONO. Visas tiesības aizsargātas.</p>
          
          <div className="flex space-x-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png" alt="PayPal" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
