
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Filter } from 'lucide-react';
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
import { toast } from 'sonner';

// Mock lawyer data
const LAWYERS = [
  {
    id: 1,
    name: "Adv. Priya Sharma",
    photo: "/placeholder.svg",
    specialization: "Family Law",
    experience: "15 years",
    location: "Delhi",
    languages: ["Hindi", "English"],
    rating: 4.8,
    reviews: 127,
    description: "Specializes in divorce cases, child custody, and domestic violence matters. Provides pro-bono services twice a week.",
    availability: ["Monday", "Wednesday", "Friday"]
  },
  {
    id: 2,
    name: "Adv. Arjun Mehta",
    photo: "/placeholder.svg",
    specialization: "Property Law",
    experience: "12 years",
    location: "Mumbai",
    languages: ["Hindi", "English", "Marathi"],
    rating: 4.6,
    reviews: 98,
    description: "Expert in property disputes, tenant rights, and real estate documentation. Offers free consultation to senior citizens.",
    availability: ["Tuesday", "Thursday", "Saturday"]
  },
  {
    id: 3,
    name: "Adv. Lakshmi Rao",
    photo: "/placeholder.svg",
    specialization: "Criminal Law",
    experience: "20 years",
    location: "Bangalore",
    languages: ["English", "Kannada", "Telugu"],
    rating: 4.9,
    reviews: 215,
    description: "Former public prosecutor with extensive experience in criminal defense. Provides pro-bono services for underrepresented communities.",
    availability: ["Monday", "Tuesday", "Thursday", "Friday"]
  },
  {
    id: 4,
    name: "Adv. Rajiv Singh",
    photo: "/placeholder.svg",
    specialization: "Consumer Law",
    experience: "8 years",
    location: "Chennai",
    languages: ["English", "Tamil", "Hindi"],
    rating: 4.5,
    reviews: 76,
    description: "Focuses on consumer protection cases and disputes with businesses. Offers free initial consultation.",
    availability: ["Wednesday", "Friday", "Saturday"]
  },
  {
    id: 5,
    name: "Adv. Deepa Gupta",
    photo: "/placeholder.svg",
    specialization: "Labor Law",
    experience: "10 years",
    location: "Hyderabad",
    languages: ["Hindi", "English", "Telugu"],
    rating: 4.7,
    reviews: 91,
    description: "Specializes in workplace harassment cases, wrongful termination, and labor disputes. Offers sliding scale fees based on income.",
    availability: ["Monday", "Thursday", "Saturday"]
  },
  {
    id: 6,
    name: "Adv. Vikram Malhotra",
    photo: "/placeholder.svg",
    specialization: "Corporate Law",
    experience: "18 years",
    location: "Kolkata",
    languages: ["English", "Bengali", "Hindi"],
    rating: 4.8,
    reviews: 158,
    description: "Expert in business formation, contracts, and corporate disputes. Provides pro-bono services to startups led by marginalized communities.",
    availability: ["Tuesday", "Wednesday", "Friday"]
  }
];

// Available specializations
const SPECIALIZATIONS = [
  "All Specializations",
  "Family Law",
  "Property Law", 
  "Criminal Law", 
  "Consumer Law",
  "Labor Law", 
  "Corporate Law"
];

// Available locations
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
  const [filteredLawyers, setFilteredLawyers] = useState(LAWYERS);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Filter lawyers based on search and filters
  useEffect(() => {
    let results = LAWYERS;
    
    // Apply text search
    if (searchTerm) {
      results = results.filter(lawyer => 
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply specialization filter
    if (specialization !== 'All Specializations') {
      results = results.filter(lawyer => lawyer.specialization === specialization);
    }
    
    // Apply location filter
    if (location !== 'All Locations') {
      results = results.filter(lawyer => lawyer.location === location);
    }
    
    setFilteredLawyers(results);
  }, [searchTerm, specialization, location]);
  
  // Handle booking appointment
  const handleBookAppointment = (lawyer) => {
    setSelectedLawyer(lawyer);
    setIsBookingOpen(true);
  };
  
  // Submit appointment booking
  const submitAppointment = () => {
    if (!appointmentDate) {
      toast.error("Please select a date for your appointment");
      return;
    }
    
    // In a real app, this would connect to a backend API
    toast.success(`Appointment requested with ${selectedLawyer.name} for ${appointmentDate}`);
    setIsBookingOpen(false);
    setAppointmentDate('');
  };
  
  return (
    <>
      <Helmet>
        <title>Find Pro-Bono Lawyers | LegalEase India</title>
        <meta name="description" content="Connect with pro-bono lawyers in your area who can help with your legal needs." />
      </Helmet>
      
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Find Pro-Bono Lawyers</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with experienced lawyers who provide free or reduced-cost legal services
              for those in need.
            </p>
          </div>
          
          {/* Search and Filter Section */}
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
          
          {/* Lawyers Grid */}
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
      
      {/* Appointment Booking Dialog */}
      {selectedLawyer && (
        <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book Appointment with {selectedLawyer.name}</DialogTitle>
              <DialogDescription>
                Select a date and time for your appointment. We'll notify you once the lawyer confirms.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-800">
                <p className="font-medium mb-1">Availability</p>
                <p>This lawyer is available on: {selectedLawyer.availability.join(", ")}</p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitAppointment}>
                Request Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Lawyers;
