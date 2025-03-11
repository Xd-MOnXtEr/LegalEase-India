
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Download, File, FileText, MessageSquare, User, Users } from 'lucide-react';
import { toast } from 'sonner';

// Sample user data - in a real app, this would come from an API
const userData = {
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  joinDate: "January 15, 2023",
  appointments: [
    {
      id: "apt-1",
      lawyer: "Adv. Priya Sharma",
      date: "2023-06-15",
      time: "10:00 AM",
      status: "completed",
      notes: "Discussed property inheritance case"
    },
    {
      id: "apt-2",
      lawyer: "Adv. Arjun Mehta",
      date: "2023-09-22",
      time: "2:30 PM",
      status: "upcoming",
      notes: "Initial consultation for divorce proceedings"
    }
  ],
  documents: [
    {
      id: "doc-1",
      name: "Property Deed.pdf",
      date: "2023-03-10",
      size: "2.4 MB"
    },
    {
      id: "doc-2",
      name: "Marriage Certificate.pdf",
      date: "2023-04-15",
      size: "1.2 MB"
    },
    {
      id: "doc-3",
      name: "Court Notice.pdf",
      date: "2023-08-05",
      size: "0.8 MB"
    }
  ],
  conversations: [
    {
      id: "conv-1",
      date: "2023-05-20",
      topic: "Property Rights",
      messageCount: 12
    },
    {
      id: "conv-2",
      date: "2023-07-18",
      topic: "Consumer Complaint",
      messageCount: 8
    }
  ]
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleDownload = (docId: string, docName: string) => {
    // In a real app, this would trigger an actual download
    toast.success(`Downloading ${docName}`);
  };
  
  return (
    <>
      <Helmet>
        <title>Your Dashboard | LegalEase India</title>
        <meta name="description" content="Manage your legal consultations, documents, and chat history." />
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
                  <h1 className="text-2xl md:text-3xl font-bold text-justice-800">Your Dashboard</h1>
                  <p className="text-justice-600">Manage your legal affairs in one place</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button variant="outline" className="flex items-center">
                    <File className="mr-2 h-4 w-4" />
                    New Document
                  </Button>
                  <Button className="bg-justice-600 hover:bg-justice-700 text-white">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat with AI
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                    <CardDescription>Your scheduled legal consultations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-justice-50 text-justice-700 rounded-md p-3 flex items-start">
                      <Calendar className="h-5 w-5 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">{userData.appointments.filter(apt => apt.status === "upcoming").length} upcoming appointment(s)</p>
                        <p className="text-sm mt-1">Next: {userData.appointments.find(apt => apt.status === "upcoming")?.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Documents</CardTitle>
                    <CardDescription>Your uploaded legal documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-justice-50 text-justice-700 rounded-md p-3 flex items-start">
                      <FileText className="h-5 w-5 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">{userData.documents.length} document(s)</p>
                        <p className="text-sm mt-1">Last updated: {userData.documents[0].date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Chat History</CardTitle>
                    <CardDescription>Your conversations with our AI</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-justice-50 text-justice-700 rounded-md p-3 flex items-start">
                      <MessageSquare className="h-5 w-5 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">{userData.conversations.length} conversation(s)</p>
                        <p className="text-sm mt-1">Last topic: {userData.conversations[0].topic}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="conversations">Conversations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Your personal details and preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium">{userData.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email Address</p>
                            <p className="font-medium">{userData.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Member Since</p>
                            <p className="font-medium">{userData.joinDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Account Status</p>
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                              <p className="font-medium">Active</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button variant="outline">Edit Profile</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Appointments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {userData.appointments.length > 0 ? (
                          <div className="space-y-4">
                            {userData.appointments.slice(0, 2).map((apt) => (
                              <div key={apt.id} className="border rounded-md p-3">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="font-medium">{apt.lawyer}</div>
                                  <div className={`text-xs px-2 py-1 rounded ${
                                    apt.status === 'completed' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                  </div>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mb-1">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{apt.date}</span>
                                  <span className="mx-2">•</span>
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{apt.time}</span>
                                </div>
                                <p className="text-sm">{apt.notes}</p>
                              </div>
                            ))}
                            
                            <div className="flex justify-center">
                              <Button variant="link" className="text-justice-600" onClick={() => setActiveTab("appointments")}>
                                View All Appointments
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-4">No appointments found.</p>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Documents</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {userData.documents.length > 0 ? (
                          <div className="space-y-4">
                            {userData.documents.slice(0, 3).map((doc) => (
                              <div key={doc.id} className="flex items-center justify-between border rounded-md p-3">
                                <div className="flex items-center">
                                  <div className="bg-gray-100 p-2 rounded mr-3">
                                    <FileText className="h-4 w-4 text-justice-600" />
                                  </div>
                                  <div>
                                    <div className="font-medium">{doc.name}</div>
                                    <div className="text-xs text-gray-500">{doc.date} • {doc.size}</div>
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleDownload(doc.id, doc.name)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            
                            <div className="flex justify-center">
                              <Button variant="link" className="text-justice-600" onClick={() => setActiveTab("documents")}>
                                View All Documents
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-4">No documents found.</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="appointments">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Appointments</CardTitle>
                      <CardDescription>Manage your consultations with legal professionals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {userData.appointments.length > 0 ? (
                        <div className="space-y-4">
                          {userData.appointments.map((apt) => (
                            <div key={apt.id} className="border rounded-md p-4">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                  <div className="flex items-center">
                                    <Users className="h-5 w-5 text-justice-600 mr-2" />
                                    <h3 className="font-medium text-lg">{apt.lawyer}</h3>
                                  </div>
                                  <div className="flex items-center text-gray-500 mt-2 mb-3">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span>{apt.date}</span>
                                    <span className="mx-2">•</span>
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>{apt.time}</span>
                                  </div>
                                  <p className="text-gray-700">{apt.notes}</p>
                                </div>
                                
                                <div className="flex flex-col items-start md:items-end gap-2">
                                  <div className={`text-sm px-3 py-1 rounded-full ${
                                    apt.status === 'completed' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                  </div>
                                  
                                  <div className="flex gap-2">
                                    {apt.status === 'upcoming' && (
                                      <Button variant="outline" size="sm">
                                        Reschedule
                                      </Button>
                                    )}
                                    <Button 
                                      variant={apt.status === 'upcoming' ? 'destructive' : 'outline'} 
                                      size="sm"
                                    >
                                      {apt.status === 'upcoming' ? 'Cancel' : 'Details'}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium mb-2">No appointments found</h3>
                          <p className="text-gray-500 mb-4">You haven't scheduled any consultations yet.</p>
                          <Button>Book an Appointment</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="documents">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Documents</CardTitle>
                      <CardDescription>Access and manage your legal documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {userData.documents.length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-gray-500">{userData.documents.length} documents</p>
                            <Button size="sm">
                              <File className="h-4 w-4 mr-2" />
                              Upload New
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {userData.documents.map((doc) => (
                              <div key={doc.id} className="border rounded-md p-4 flex items-start justify-between">
                                <div className="flex items-start">
                                  <div className="bg-justice-50 p-3 rounded mr-3">
                                    <FileText className="h-5 w-5 text-justice-600" />
                                  </div>
                                  <div>
                                    <div className="font-medium">{doc.name}</div>
                                    <div className="text-sm text-gray-500 mt-1">Uploaded on {doc.date}</div>
                                    <div className="text-sm text-gray-500">{doc.size}</div>
                                  </div>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleDownload(doc.id, doc.name)}
                                  className="flex-shrink-0"
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium mb-2">No documents found</h3>
                          <p className="text-gray-500 mb-4">Upload your first document to get started.</p>
                          <Button>Upload Document</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="conversations">
                  <Card>
                    <CardHeader>
                      <CardTitle>Chat History</CardTitle>
                      <CardDescription>Your previous conversations with our AI assistant</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {userData.conversations.length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-gray-500">{userData.conversations.length} conversations</p>
                            <Button size="sm" className="bg-justice-600 hover:bg-justice-700">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              New Chat
                            </Button>
                          </div>
                          
                          {userData.conversations.map((conv) => (
                            <div key={conv.id} className="border rounded-md p-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="font-medium">{conv.topic}</div>
                                  <div className="text-sm text-gray-500 mt-1">
                                    {conv.date} • {conv.messageCount} messages
                                  </div>
                                </div>
                                <Button variant="outline" size="sm">
                                  View Chat
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium mb-2">No conversations yet</h3>
                          <p className="text-gray-500 mb-4">Start chatting with our AI legal assistant.</p>
                          <Button className="bg-justice-600 hover:bg-justice-700">Start New Chat</Button>
                        </div>
                      )}
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

export default Dashboard;
