
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Scale, User, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, initialView }: AuthModalProps) => {
  const [view, setView] = useState<'login' | 'register'>(initialView);
  const [userType, setUserType] = useState<'client' | 'professional'>('client');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (view === 'login') {
      // Login logic would go here
      toast.success('Login successful');
      onClose();
    } else {
      // Registration logic would go here
      toast.success(`Registered as ${userType === 'client' ? 'a client' : 'a legal professional'}`);
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center text-center">
          <Scale className="h-8 w-8 text-justice-600 mb-2" />
          <DialogTitle className="text-xl font-serif">
            {view === 'login' ? 'Welcome Back' : 'Join LegalEase India'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={initialView} value={view} onValueChange={(v) => setView(v as 'login' | 'register')} className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" required />
              </div>
              <div className="flex justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-justice-600 focus:ring-justice-500" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-justice-600 hover:text-justice-800">
                  Forgot password?
                </a>
              </div>
              <Button type="submit" className="w-full bg-justice-700 hover:bg-justice-800">
                Login
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>I am a:</Label>
                <RadioGroup 
                  value={userType} 
                  onValueChange={(v) => setUserType(v as 'client' | 'professional')} 
                  className="flex"
                >
                  <div className="flex items-center space-x-2 mr-6">
                    <RadioGroupItem value="client" id="client" />
                    <Label htmlFor="client" className="flex items-center cursor-pointer">
                      <User className="h-4 w-4 mr-1" /> Client
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="professional" id="professional" />
                    <Label htmlFor="professional" className="flex items-center cursor-pointer">
                      <Briefcase className="h-4 w-4 mr-1" /> Legal Professional
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input id="firstname" placeholder="Enter first name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input id="lastname" placeholder="Enter last name" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input id="register-email" type="email" placeholder="Enter your email" required />
              </div>
              
              {userType === 'professional' && (
                <div className="space-y-2">
                  <Label htmlFor="bar-number">Bar Council Number</Label>
                  <Input id="bar-number" placeholder="Enter your Bar Council ID" required />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input id="register-password" type="password" placeholder="Create a password" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm your password" required />
              </div>
              
              <div className="flex items-start space-x-2 text-sm">
                <input type="checkbox" className="rounded text-justice-600 focus:ring-justice-500 mt-1" required />
                <span>
                  I agree to the <a href="#" className="text-justice-600 hover:text-justice-800">Terms of Service</a> and <a href="#" className="text-justice-600 hover:text-justice-800">Privacy Policy</a>
                </span>
              </div>
              
              <Button type="submit" className="w-full bg-justice-700 hover:bg-justice-800">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
