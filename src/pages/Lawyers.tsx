import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Filter, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/layout/BackButton';
import { Lawyer, getLawyers, bookAppointment } from '@/utils/lawyerUtils';

const appointmentFormSchema = z.object({
  clientName: z.string().min(3, "Name must be at least 3 characters"),
  clientEmail: z.string().email("Please enter a valid email"),
  clientPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  appointmentDate: z.string().min(1, "Please select a date"),
  notes: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

const SPECIALIZATIONS = [
  "All Specializations",
  "Family Law",
  "Property Law", 
  "Criminal Law", 
  "Consumer Law",
  "Labor Law", 
  "Corporate Law"
];

const LOCATIONS = [
  "All Locations",
  "Delhi", 
  "Mumbai", 
  "Bangalore", 
  "Chennai", 
  "Hyderabad", 
  "Kolkata"
];

const Lawyers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('All Specializations');
  const [location, setLocation] = useState('All Locations');
  const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>([]);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      appointmentDate: "",
      notes: "",
    },
  });
  
  useEffect(() => {
    const lawyerData = getLawyers();
    setLawyers(lawyerData);
    setFilteredLawyers(lawyerData);
  }, []);
  
  useEffect(() => {
    let results = lawyers;
    
    if (searchTerm) {
      results = results.filter(lawyer => 
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (specialization !== 'All Specializations') {
      results = results.filter(lawyer => lawyer.specialization === specialization);
    }
    
    if (location !== 'All Locations') {
      results = results.filter(lawyer => lawyer.location === location);
    }
    
    setFilteredLawyers(results);
  }, [searchTerm, specialization, location, lawyers]);
  
  const handleBookAppointment = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setIsBookingOpen(true);
    
    if (!lawyer.isRegistered) {
      toast.warning("This lawyer hasn't completed registration. Appointment booking may be limited.");
    }
  };
  
  const submitAppointment = (data: AppointmentFormValues) => {
    if (!selectedLawyer) {
      return;
    }
    
    const appointment = bookAppointment(
      selectedLawyer.id,
      data.clientName,
      data.clientEmail,
      data.clientPhone,
      data.appointmentDate,
      data.notes
    );
    
    if (appointment) {
      setIsBookingOpen(false);
      form.reset();
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Find Pro-Bono Lawyers | LegalEase India</title>
        <meta name="description" content="Connect with pro-bono lawyers in your area who can help with your legal needs." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BackButton />
            
            <div className="mb-12 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Find Pro-Bono Lawyers</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Connect with experienced lawyers who provide free or reduced-cost legal services
                for those in need.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="search" className="mb-2 block">Search Lawyers</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by name or expertise..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="specialization" className="mb-2 block">Specialization</Label>
                  <Select 
                    value={specialization} 
                    onValueChange={setSpecialization}
                  >
                    <SelectTrigger id="specialization">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPECIALIZATIONS.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="location" className="mb-2 block">Location</Label>
                  <Select 
                    value={location} 
                    onValueChange={setLocation}
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {filteredLawyers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLawyers.map((lawyer) => (
                  <motion.div
                    key={lawyer.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className="w-16 h-16 rounded-full bg-blue-100 mr-4 overflow-hidden">
                              <img 
                                src={lawyer.photo} 
                                alt={lawyer.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{lawyer.name}</CardTitle>
                              <CardDescription>{lawyer.specialization} • {lawyer.experience}</CardDescription>
                            </div>
                          </div>
                          <div className="bg-blue-50 px-2 py-1 rounded text-blue-700 text-sm font-medium">
                            {lawyer.rating} ★
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{lawyer.location}</span>
                          <span className="mx-2">•</span>
                          <span>{lawyer.languages.join(", ")}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{lawyer.description}</p>
                        <div className="bg-gray-50 p-2 rounded-md">
                          <div className="text-sm font-medium mb-1">Available on:</div>
                          <div className="flex flex-wrap gap-1">
                            {lawyer.availability.map((day) => (
                              <span 
                                key={day} 
                                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                              >
                                {day}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full"
                          onClick={() => handleBookAppointment(lawyer)}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Appointment
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-700">No lawyers match your filters</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search criteria or clearing filters</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setSpecialization('All Specializations');
                    setLocation('All Locations');
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </motion.div>
        </section>
      </main>
      
      {selectedLawyer && (
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Book Appointment with {selectedLawyer.name}</DialogTitle>
              <DialogDescription>
                Fill in your details to request an appointment. The lawyer will confirm your
                requested date or suggest an alternative.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submitAppointment)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Full name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="clientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="email@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="clientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your contact number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="appointmentDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Brief description of your legal issue" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-800">
                  <p className="font-medium mb-1">Availability</p>
                  <p>This lawyer is available on: {selectedLawyer.availability.join(", ")}</p>
                </div>
                
                <DialogFooter className="sm:justify-end mt-5 pt-3 border-t">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsBookingOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Request Appointment
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
      
      <Footer />
    </div>
  );
};

export default Lawyers;
