
import { Link } from 'react-router-dom';
import { Instagram, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary py-8 mt-auto">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-2 mb-2">
              <img 
                src="/lovable-uploads/9b5842dd-9df6-4558-b7b1-8f96bda04cce.png" 
                alt="RK.Creation Logo" 
                className="h-10 w-auto"
              />
              <span className="text-lg font-semibold">RK.Creation</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Custom Handkerchiefs & Fabric Paintings
            </p>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <span>Vadodara, Gujarat, India</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone size={18} />
                <span>+91 7434902998</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Instagram size={18} />
                <a 
                  href="https://instagram.com/_rk.creation1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  @_rk.creation1
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} RK.Creation. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Policy: No Return, No Exchange
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
