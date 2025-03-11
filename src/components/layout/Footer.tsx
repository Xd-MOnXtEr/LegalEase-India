
import { Link } from 'react-router-dom';
import { Scale, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = new FormData(form).get('email') as string;
    
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      form.reset();
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <footer className="bg-justice-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Scale className="h-6 w-6 text-justice-300" />
              <span className="text-xl font-serif font-bold text-white">
                LegalEase <span className="text-justice-300">India</span>
              </span>
            </div>
            <p className="text-justice-400 mb-4">
              Making legal assistance accessible to everyone in India through technology
              and a network of pro-bono lawyers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-justice-400 hover:text-justice-300 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-justice-400 hover:text-justice-300 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-justice-400 hover:text-justice-300 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-justice-400 hover:text-justice-300 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Documents', href: '/documents' },
                { name: 'Lawyers', href: '/lawyers' },
                { name: 'Chat', href: '/chat' },
                { name: 'Login', href: '/login' },
                { name: 'Dashboard', href: '/dashboard' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-justice-400 hover:text-justice-300 transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-justice-300 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-justice-400">
                  123 Legal Avenue, New Delhi, 110001, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-justice-300 mr-3 flex-shrink-0" />
                <span className="text-justice-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-justice-300 mr-3 flex-shrink-0" />
                <span className="text-justice-400">info@legalease.india</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-justice-400 mb-4">
              Subscribe to our newsletter for the latest legal resources and updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input 
                name="email"
                type="email" 
                placeholder="Your email address" 
                className="bg-justice-800 border-justice-700 text-white placeholder:text-justice-500"
              />
              <Button 
                type="submit"
                className="w-full bg-justice-600 hover:bg-justice-500 text-white"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 border-t border-justice-800 text-center text-justice-500 text-sm">
          <p>© {new Date().getFullYear()} LegalEase India. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link to="#" className="hover:text-justice-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-justice-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-justice-400 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
