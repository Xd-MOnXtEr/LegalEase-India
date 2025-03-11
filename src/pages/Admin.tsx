
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Users, 
  FileText, 
  BarChart, 
  Search, 
  PlusCircle, 
  Check, 
  X, 
  MoreHorizontal,
  UserCheck,
  UserX,
  Briefcase,
  MessageSquare
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

// Sample admin data - in a real app, this would come from an API
const mockUsers = [
  { 
    id: 1, 
    name: "Rahul Sharma", 
    email: "rahul.sharma@example.com", 
    role: "User", 
    status: "Active", 
    joinDate: "Jan 15, 2023",
    appointments: 2,
    documents: 3
  },
  { 
    id: 2, 
    name: "Priya Singh", 
    email: "priya.singh@example.com", 
    role: "Lawyer", 
    status: "Active", 
    joinDate: "Feb 10, 2023",
    appointments: 5,
    documents: 0
  },
  { 
    id: 3, 
    name: "Vikram Patel", 
    email: "vikram.patel@example.com", 
    role: "Admin", 
    status: "Active", 
    joinDate: "Dec 05, 2022",
    appointments: 0,
    documents: 7
  },
  { 
    id: 4, 
    name: "Neha Gupta", 
    email: "neha.gupta@example.com", 
    role: "User", 
    status: "Inactive", 
    joinDate: "Mar 22, 2023",
    appointments: 1,
    documents: 2
  },
  { 
    id: 5, 
    name: "Arun Kumar", 
    email: "arun.kumar@example.com", 
    role: "Lawyer", 
    status: "Pending", 
    joinDate: "Apr 18, 2023",
    appointments: 0,
    documents: 0
  }
];

const mockLawyers = [
  { 
    id: 1, 
    name: "Adv. Priya Sharma", 
    specialization: "Family Law", 
    location: "Delhi", 
    status: "Active", 
    appointments: 127, 
    rating: 4.8
  },
  { 
    id: 2, 
    name: "Adv. Arjun Mehta", 
    specialization: "Property Law", 
    location: "Mumbai", 
    status: "Active", 
    appointments: 98, 
    rating: 4.6
  },
  { 
    id: 3, 
    name: "Adv. Lakshmi Rao", 
    specialization: "Criminal Law", 
    location: "Bangalore", 
    status: "Active", 
    appointments: 215, 
    rating: 4.9
  },
  { 
    id: 4, 
    name: "Adv. Rajiv Singh", 
    specialization: "Consumer Law", 
    location: "Chennai", 
    status: "Inactive", 
    appointments: 76, 
    rating: 4.5
  },
  { 
    id: 5, 
    name: "Adv. Deepa Gupta", 
    specialization: "Labor Law", 
    location: "Hyderabad", 
    status: "Pending", 
    appointments: 0, 
    rating: 0
  }
];

const mockDocuments = [
  { 
    id: 1, 
    title: "RTI Application Form", 
    category: "RTI Forms", 
    languages: ["English", "Hindi", "Tamil", "Bengali"], 
    downloads: 2348, 
    featured: true
  },
  { 
    id: 2, 
    title: "FIR Template", 
    category: "Police & FIR", 
    languages: ["English", "Hindi", "Marathi", "Gujarati"], 
    downloads: 1865, 
    featured: false
  },
  { 
    id: 3, 
    title: "Domestic Violence Complaint", 
    category: "Police & FIR", 
    languages: ["English", "Hindi", "Tamil"], 
    downloads: 1523, 
    featured: true
  },
  { 
    id: 4, 
    title: "Rent Agreement", 
    category: "Property", 
    languages: ["English", "Hindi"], 
    downloads: 3156, 
    featured: false
  },
  { 
    id: 5, 
    title: "Employment Contract", 
    category: "Employment", 
    languages: ["English"], 
    downloads: 1247, 
    featured: false
  }
];

// Mock stats
const mockStats = {
  totalUsers: 1248,
  totalDocuments: 45,
  totalLawyers: 86,
  totalAppointments: 3156,
  registrationsThisMonth: 124,
  documentDownloads: 8765,
  appointmentsThisMonth: 342,
  aiChats: 5621
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter users based on search query
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter lawyers based on search query
  const filteredLawyers = mockLawyers.filter(lawyer => 
    lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lawyer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter documents based on search query
  const filteredDocuments = mockDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Actions
  const handleUserAction = (userId: number, action: string) => {
    toast.success(`${action} user with ID ${userId}`);
  };
  
  const handleLawyerAction = (lawyerId: number, action: string) => {
    toast.success(`${action} lawyer with ID ${lawyerId}`);
  };
  
  const handleDocumentAction = (documentId: number, action: string) => {
    toast.success(`${action} document with ID ${documentId}`);
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | LegalEase India</title>
        <meta name="description" content="Administrative dashboard for managing users, lawyers, and content." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-justice-800">Admin Dashboard</h1>
                  <p className="text-justice-600">Manage users, lawyers, and content</p>
                </div>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="dashboard">
                    <BarChart className="h-4 w-4 mr-2" />
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="users">
                    <User className="h-4 w-4 mr-2" />
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="lawyers">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Lawyers
                  </TabsTrigger>
                  <TabsTrigger value="documents">
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </TabsTrigger>
                </TabsList>
                
                {/* Dashboard Tab */}
                <TabsContent value="dashboard">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <User className="h-4 w-4 mr-2 text-justice-600" />
                          Users
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{mockStats.totalUsers}</div>
                        <p className="text-sm text-green-600 mt-1">+{mockStats.registrationsThisMonth} this month</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-justice-600" />
                          Lawyers
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{mockStats.totalLawyers}</div>
                        <p className="text-sm text-justice-600 mt-1">Pro-bono network</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-justice-600" />
                          Documents
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{mockStats.totalDocuments}</div>
                        <p className="text-sm text-blue-600 mt-1">{mockStats.documentDownloads} downloads</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2 text-justice-600" />
                          AI Chats
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{mockStats.aiChats}</div>
                        <p className="text-sm text-green-600 mt-1">Questions answered</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Platform Statistics</CardTitle>
                        <CardDescription>Overview of platform activity</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                          <p className="text-gray-500">Charts and graphs would appear here in a real application</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Users Tab */}
                <TabsContent value="users">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <CardTitle>User Management</CardTitle>
                          <CardDescription>View and manage all users</CardDescription>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search users..."
                              className="pl-9"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                          <Button>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add User
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Role</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Joined</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredUsers.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    user.role === 'Admin' 
                                      ? 'bg-justice-100 text-justice-700' 
                                      : user.role === 'Lawyer'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {user.role}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    user.status === 'Active' 
                                      ? 'bg-green-100 text-green-700' 
                                      : user.status === 'Inactive'
                                        ? 'bg-gray-100 text-gray-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {user.status}
                                  </span>
                                </TableCell>
                                <TableCell>{user.joinDate}</TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem onClick={() => handleUserAction(user.id, "Viewed")}>
                                        <User className="h-4 w-4 mr-2" />
                                        View Profile
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleUserAction(user.id, "Edited")}>
                                        <FileText className="h-4 w-4 mr-2" />
                                        Edit User
                                      </DropdownMenuItem>
                                      {user.status === 'Active' ? (
                                        <DropdownMenuItem onClick={() => handleUserAction(user.id, "Deactivated")}>
                                          <UserX className="h-4 w-4 mr-2" />
                                          Deactivate
                                        </DropdownMenuItem>
                                      ) : (
                                        <DropdownMenuItem onClick={() => handleUserAction(user.id, "Activated")}>
                                          <UserCheck className="h-4 w-4 mr-2" />
                                          Activate
                                        </DropdownMenuItem>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                            
                            {filteredUsers.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                  No users found.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Lawyers Tab */}
                <TabsContent value="lawyers">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <CardTitle>Lawyer Management</CardTitle>
                          <CardDescription>View and manage all pro-bono lawyers</CardDescription>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search lawyers..."
                              className="pl-9"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                          <Button>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Lawyer
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Specialization</TableHead>
                              <TableHead>Location</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Appointments</TableHead>
                              <TableHead>Rating</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredLawyers.map((lawyer) => (
                              <TableRow key={lawyer.id}>
                                <TableCell className="font-medium">{lawyer.name}</TableCell>
                                <TableCell>{lawyer.specialization}</TableCell>
                                <TableCell>{lawyer.location}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    lawyer.status === 'Active' 
                                      ? 'bg-green-100 text-green-700' 
                                      : lawyer.status === 'Inactive'
                                        ? 'bg-gray-100 text-gray-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                  }`}>
                                    {lawyer.status}
                                  </span>
                                </TableCell>
                                <TableCell>{lawyer.appointments}</TableCell>
                                <TableCell>
                                  {lawyer.rating > 0 ? (
                                    <div className="flex items-center">
                                      <span className="mr-1">{lawyer.rating}</span>
                                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    </div>
                                  ) : (
                                    <span className="text-gray-400">N/A</span>
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem onClick={() => handleLawyerAction(lawyer.id, "Viewed")}>
                                        <User className="h-4 w-4 mr-2" />
                                        View Profile
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleLawyerAction(lawyer.id, "Edited")}>
                                        <FileText className="h-4 w-4 mr-2" />
                                        Edit Profile
                                      </DropdownMenuItem>
                                      {lawyer.status === 'Active' ? (
                                        <DropdownMenuItem onClick={() => handleLawyerAction(lawyer.id, "Deactivated")}>
                                          <UserX className="h-4 w-4 mr-2" />
                                          Deactivate
                                        </DropdownMenuItem>
                                      ) : (
                                        <DropdownMenuItem onClick={() => handleLawyerAction(lawyer.id, "Activated")}>
                                          <UserCheck className="h-4 w-4 mr-2" />
                                          Activate
                                        </DropdownMenuItem>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                            
                            {filteredLawyers.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                  No lawyers found.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Documents Tab */}
                <TabsContent value="documents">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <CardTitle>Document Management</CardTitle>
                          <CardDescription>Manage legal document templates</CardDescription>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search documents..."
                              className="pl-9"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                          </div>
                          <Button>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Document
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Languages</TableHead>
                              <TableHead>Downloads</TableHead>
                              <TableHead>Featured</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredDocuments.map((doc) => (
                              <TableRow key={doc.id}>
                                <TableCell className="font-medium">{doc.title}</TableCell>
                                <TableCell>
                                  <span className="px-2 py-1 bg-justice-50 text-justice-700 rounded-full text-xs">
                                    {doc.category}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-wrap gap-1">
                                    {doc.languages.map((lang, idx) => (
                                      <span 
                                        key={idx} 
                                        className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                                      >
                                        {lang}
                                      </span>
                                    ))}
                                  </div>
                                </TableCell>
                                <TableCell>{doc.downloads}</TableCell>
                                <TableCell>
                                  {doc.featured ? (
                                    <Check className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <X className="h-5 w-5 text-gray-300" />
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem onClick={() => handleDocumentAction(doc.id, "Viewed")}>
                                        <FileText className="h-4 w-4 mr-2" />
                                        View Document
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleDocumentAction(doc.id, "Edited")}>
                                        <FileText className="h-4 w-4 mr-2" />
                                        Edit Document
                                      </DropdownMenuItem>
                                      {doc.featured ? (
                                        <DropdownMenuItem onClick={() => handleDocumentAction(doc.id, "Unfeatured")}>
                                          <X className="h-4 w-4 mr-2" />
                                          Remove from Featured
                                        </DropdownMenuItem>
                                      ) : (
                                        <DropdownMenuItem onClick={() => handleDocumentAction(doc.id, "Featured")}>
                                          <Check className="h-4 w-4 mr-2" />
                                          Add to Featured
                                        </DropdownMenuItem>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            ))}
                            
                            {filteredDocuments.length === 0 && (
                              <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                  No documents found.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Admin;
