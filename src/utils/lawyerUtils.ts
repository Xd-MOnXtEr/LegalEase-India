import { toast } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';
import { nanoid } from 'nanoid';

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
  consultationFee?: number;
  barCouncilNumber?: string;
  qualifications?: string;
  practiceAreas?: string[];
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
  barCouncilNumber: string;
  consultationFee: number;
  qualifications: string;
  practiceAreas: string[];
}

export interface Appointment {
  id: string;
  lawyerId: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'paid';
  notes?: string;
  fee?: number;
  paymentId?: string;
  razorpayOrderId?: string;
}

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
    email: "priya.sharma@example.com",
    consultationFee: 2000,
    barCouncilNumber: "D/123/2008",
    qualifications: "LL.B, Delhi University; LL.M in Family Law, NALSAR",
    practiceAreas: ["Divorce", "Child Custody", "Domestic Violence", "Maintenance Cases"]
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
    email: "arjun.mehta@example.com",
    consultationFee: 2500,
    barCouncilNumber: "MAH/4567/2011",
    qualifications: "B.A.LL.B, Government Law College, Mumbai",
    practiceAreas: ["Property Disputes", "Real Estate Transactions", "Tenant Rights", "Land Acquisition"]
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
    email: "lakshmi.rao@example.com",
    consultationFee: 3000,
    barCouncilNumber: "BNG/8901/2015",
    qualifications: "LL.B, Bangalore University; LL.M in Criminal Law, IIT Bombay",
    practiceAreas: ["Criminal Defense", "Juvenile Justice", "Drug Cases", "Homicide"]
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
    email: "rajiv.singh@example.com",
    consultationFee: 1500,
    barCouncilNumber: "CHN/2345/2010",
    qualifications: "LL.B, Chennai University",
    practiceAreas: ["Consumer Protection", "Business Disputes", "Complaints Handling"]
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
    email: "deepa.gupta@example.com",
    consultationFee: 2200,
    barCouncilNumber: "HYD/6789/2012",
    qualifications: "LL.B, Hyderabad University; LL.M in Labor Law, NIT Warangal",
    practiceAreas: ["Workplace Harassment", "Wrongful Termination", "Labor Disputes", "Employee Benefits"]
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
    email: "vikram.malhotra@example.com",
    consultationFee: 3500,
    barCouncilNumber: "KOL/1011/2013",
    qualifications: "LL.B, Kolkata University; LL.M in Corporate Law, IIT Kanpur",
    practiceAreas: ["Business Formation", "Contract Negotiation", "Corporate Disputes", "Startup Support"]
  }
];

let PENDING_LAWYER_APPLICATIONS: LawyerRegistration[] = [];

let APPOINTMENTS: Appointment[] = [];

export const getLawyers = (): Lawyer[] => {
  return LAWYERS;
};

export const getLawyer = (id: number): Lawyer | undefined => {
  return LAWYERS.find(lawyer => lawyer.id === id);
};

export const registerLawyer = (lawyerData: LawyerRegistration): boolean => {
  try {
    const existingLawyer = LAWYERS.find(lawyer => lawyer.email === lawyerData.email);
    if (existingLawyer) {
      toast.error("A lawyer with this email already exists");
      return false;
    }
    
    if (!lawyerData.barCouncilNumber || !lawyerData.consultationFee) {
      toast.error("Bar Council Number and Consultation Fee are required fields");
      return false;
    }

    if (lawyerData.consultationFee <= 0) {
      toast.error("Consultation fee must be greater than zero");
      return false;
    }
    
    PENDING_LAWYER_APPLICATIONS.push(lawyerData);
    
    const newLawyer: Lawyer = {
      id: LAWYERS.length + 1,
      name: lawyerData.name,
      photo: "/placeholder.svg",
      specialization: lawyerData.specialization,
      experience: lawyerData.experience,
      location: lawyerData.location,
      languages: lawyerData.languages,
      rating: 4.5,
      reviews: 0,
      description: lawyerData.description,
      availability: lawyerData.availability,
      isRegistered: true,
      email: lawyerData.email,
      consultationFee: lawyerData.consultationFee,
      barCouncilNumber: lawyerData.barCouncilNumber,
      qualifications: lawyerData.qualifications,
      practiceAreas: lawyerData.practiceAreas
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

const RAZORPAY_KEY_ID = 'rzp_test_1DP5mmOlF5G5ag';

export const bookAppointment = async (
  lawyerId: number, 
  clientName: string, 
  clientEmail: string, 
  clientPhone: string,
  appointmentDate: string,
  notes?: string
): Promise<Appointment | null> => {
  try {
    const lawyer = getLawyer(lawyerId);
    
    if (!lawyer) {
      toast.error("Lawyer not found");
      return null;
    }
    
    const dayOfWeek = new Date(appointmentDate).toLocaleDateString('en-US', { weekday: 'long' });
    
    if (!lawyer.availability.includes(dayOfWeek)) {
      toast.error(`The lawyer is not available on ${dayOfWeek}s. Please select another date.`);
      return null;
    }

    const fee = lawyer.consultationFee || 1500;

    const appointment: Appointment = {
      id: `app-${nanoid(10)}`,
      lawyerId,
      clientName,
      clientEmail,
      clientPhone,
      date: appointmentDate,
      status: 'pending',
      notes,
      fee
    };
    
    APPOINTMENTS.push(appointment);
    
    toast.success(`Appointment requested with ${lawyer.name} for ${new Date(appointmentDate).toLocaleDateString()}`);
    return appointment;
  } catch (error) {
    console.error("Error booking appointment:", error);
    toast.error("Failed to book appointment");
    return null;
  }
};

export const getAppointments = (lawyerId?: number): Appointment[] => {
  if (lawyerId) {
    return APPOINTMENTS.filter(app => app.lawyerId === lawyerId);
  }
  return APPOINTMENTS;
};

export const updateAppointmentStatus = (appointmentId: string, status: 'pending' | 'confirmed' | 'cancelled' | 'paid'): boolean => {
  const index = APPOINTMENTS.findIndex(app => app.id === appointmentId);
  
  if (index === -1) {
    toast.error("Appointment not found");
    return false;
  }
  
  APPOINTMENTS[index].status = status;
  toast.success(`Appointment status updated to ${status}`);
  return true;
};

export const initiatePayment = async (appointmentId: string): Promise<boolean> => {
  try {
    const appointment = APPOINTMENTS.find(app => app.id === appointmentId);
    
    if (!appointment) {
      toast.error("Appointment not found");
      return false;
    }
    
    const lawyer = getLawyer(appointment.lawyerId);
    
    if (!lawyer) {
      toast.error("Lawyer information not found");
      return false;
    }

    if (!(window as any).Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      await new Promise((resolve) => {
        script.onload = resolve;
      });
    }

    const orderId = `order_${nanoid(16)}`;
    appointment.razorpayOrderId = orderId;

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: (appointment.fee || 0) * 100,
      currency: "INR",
      name: "LegalEase India",
      description: `Consultation with ${lawyer.name}`,
      order_id: orderId,
      handler: function(response: any) {
        const paymentId = response.razorpay_payment_id;
        completePayment(appointment.id, paymentId);
      },
      prefill: {
        name: appointment.clientName,
        email: appointment.clientEmail,
        contact: appointment.clientPhone
      },
      theme: {
        color: "#6941C6"
      }
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();

    return true;
  } catch (error) {
    console.error("Payment initiation error:", error);
    toast.error("Failed to initialize payment. Please try again.");
    return false;
  }
};

const completePayment = (appointmentId: string, paymentId: string): void => {
  const index = APPOINTMENTS.findIndex(app => app.id === appointmentId);
  
  if (index === -1) {
    toast.error("Appointment not found");
    return;
  }
  
  APPOINTMENTS[index].status = 'paid';
  APPOINTMENTS[index].paymentId = paymentId;
  
  toast.success("Payment successful! Your appointment is confirmed.");
};

export const canRegisterAsLawyer = (email: string): boolean => {
  return !LAWYERS.some(lawyer => lawyer.email === email);
};

export const getPendingLawyerApplications = (): LawyerRegistration[] => {
  return PENDING_LAWYER_APPLICATIONS;
};
