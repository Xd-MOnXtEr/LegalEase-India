
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Scale, Menu, X, LogIn, MessageSquare, FileText, Users, User2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Documents', href: '/documents' },
    { name: 'Lawyers', href: '/lawyers' },
    { name: 'Chat', href: '/chat' },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Scale className="h-6 w-6 text-justice-600" />
            <span className="text-xl font-serif font-bold text-justice-800">
              LegalEase <span className="text-justice-600">India</span>
            </span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'text-justice-700'
                    : 'text-gray-600 hover:text-justice-700 hover:bg-gray-50'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-justice-600"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <Link to="/login">
              <Button variant="outline" className="hidden md:flex">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2">
                      <Scale className="h-5 w-5 text-justice-600" />
                      <span className="font-semibold text-lg">LegalEase</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>
                  
                  <nav className="flex flex-col space-y-1 py-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`px-4 py-2 text-sm rounded-md ${
                          isActive(item.href)
                            ? 'bg-justice-50 text-justice-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="mt-auto border-t border-gray-200 pt-4 pb-6">
                    <div className="flex flex-col space-y-3 px-4">
                      <Link 
                        to="/login" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-2 text-sm text-justice-700"
                      >
                        <LogIn className="h-4 w-4" />
                        <span>Login / Register</span>
                      </Link>
                      <Link 
                        to="/dashboard" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-justice-700"
                      >
                        <User2 className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
