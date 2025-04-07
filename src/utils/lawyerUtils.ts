
import { toast } from 'sonner';

export interface Lawyer {
  id: number;
  name: string;
  photo: string;
  specialization: string;
  experience: string;
  location: string;
  languages: string[];
  rating: number;
  reviews: number;
  description: string;
  availability: string[];
  isRegistered?: boolean;
  email?: string;
}

export interface LawyerRegistration {
  name: string;
  email: string;
  specialization: string;
  experience: string;
  location: string;
  languages: string[];
  description: string;
  availability: string[];
  barNumber?: string;
}

export interface Appointment {
  id: string;
  lawyerId: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
}

// This would typically come from an API or database
const LAWYERS: Lawyer[] = [
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
    availability: ["Monday", "Wednesday", "Friday"],
    isRegistered: true,
    email: "priya.sharma@example.com"
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
    availability: ["Tuesday", "Thursday", "Saturday"],
    isRegistered: true,
    email: "arjun.mehta@example.com"
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
    availability: ["Monday", "Tuesday", "Thursday", "Friday"],
    isRegistered: true,
    email: "lakshmi.rao@example.com"
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
    availability: ["Wednesday", "Friday", "Saturday"],
    isRegistered: false,
    email: "rajiv.singh@example.com"
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
    availability: ["Monday", "Thursday", "Saturday"],
    isRegistered: false,
    email: "deepa.gupta@example.com"
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
    availability: ["Tuesday", "Wednesday", "Friday"],
    isRegistered: true,
    email: "vikram.malhotra@example.com"
  }
];

// Store registered lawyer applications in memory (would be in a database in a real application)
let PENDING_LAWYER_APPLICATIONS: LawyerRegistration[] = [];

// Store appointments in memory (would be in a database in a real application)
let APPOINTMENTS: Appointment[] = [];

export const getLawyers = (): Lawyer[] => {
  return LAWYERS;
};

export const getLawyer = (id: number): Lawyer | undefined => {
  return LAWYERS.find(lawyer => lawyer.id === id);
};

export const registerLawyer = (lawyerData: LawyerRegistration): boolean => {
  try {
    // Check if email already exists
    const existingLawyer = LAWYERS.find(lawyer => lawyer.email === lawyerData.email);
    if (existingLawyer) {
      toast.error("A lawyer with this email already exists");
      return false;
    }
    
    // Add to pending applications (in a real app, this would be verified by admin)
    PENDING_LAWYER_APPLICATIONS.push(lawyerData);
    
    // In a real application, this would go through approval process
    // For demo purposes, we'll auto-approve and add to the lawyers list
    const newLawyer: Lawyer = {
      id: LAWYERS.length + 1,
      name: lawyerData.name,
      photo: "/placeholder.svg", // Default placeholder
      specialization: lawyerData.specialization,
      experience: lawyerData.experience,
      location: lawyerData.location,
      languages: lawyerData.languages,
      rating: 4.5, // Default starting rating
      reviews: 0,
      description: lawyerData.description,
      availability: lawyerData.availability,
      isRegistered: true,
      email: lawyerData.email
    };
    
    LAWYERS.push(newLawyer);
    toast.success("Lawyer profile created successfully! Your profile is now visible to potential clients.");
    return true;
  } catch (error) {
    console.error("Error registering lawyer:", error);
    toast.error("Failed to register lawyer account");
    return false;
  }
};

export const bookAppointment = (
  lawyerId: number, 
  clientName: string, 
  clientEmail: string, 
  clientPhone: string,
  appointmentDate: string,
  notes?: string
): Appointment | null => {
  const lawyer = getLawyer(lawyerId);
  
  if (!lawyer) {
    toast.error("Lawyer not found");
    return null;
  }
  
  // In a real application, we would check if the lawyer is available on this date
  const dayOfWeek = new Date(appointmentDate).toLocaleDateString('en-US', { weekday: 'long' });
  
  if (!lawyer.availability.includes(dayOfWeek)) {
    toast.error(`The lawyer is not available on ${dayOfWeek}s. Please select another date.`);
    return null;
  }
  
  const appointment: Appointment = {
    id: `app-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    lawyerId,
    clientName,
    clientEmail,
    clientPhone,
    date: appointmentDate,
    status: 'pending',
    notes
  };
  
  // Save appointment
  APPOINTMENTS.push(appointment);
  
  toast.success(`Appointment requested with ${lawyer.name} for ${new Date(appointmentDate).toLocaleDateString()}`);
  return appointment;
};

export const getAppointments = (lawyerId?: number): Appointment[] => {
  if (lawyerId) {
    return APPOINTMENTS.filter(app => app.lawyerId === lawyerId);
  }
  return APPOINTMENTS;
};

export const updateAppointmentStatus = (appointmentId: string, status: 'pending' | 'confirmed' | 'cancelled'): boolean => {
  const index = APPOINTMENTS.findIndex(app => app.id === appointmentId);
  
  if (index === -1) {
    toast.error("Appointment not found");
    return false;
  }
  
  APPOINTMENTS[index].status = status;
  toast.success(`Appointment status updated to ${status}`);
  return true;
};

// Check if a user can register as a lawyer (would typically involve verification)
export const canRegisterAsLawyer = (email: string): boolean => {
  // Check if email is already registered as a lawyer
  return !LAWYERS.some(lawyer => lawyer.email === email);
};

// Get pending lawyer applications
export const getPendingLawyerApplications = (): LawyerRegistration[] => {
  return PENDING_LAWYER_APPLICATIONS;
};
