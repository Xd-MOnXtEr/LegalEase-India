import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  Download, 
  Search, 
  BookOpen, 
  Building, 
  Home, 
  HeartHandshake, 
  Briefcase, 
  Gavel,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Document, downloadDocument } from '@/utils/documentUtils';

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const documentCategories = [
    { id: 'all', name: 'All Documents', icon: <FileText className="h-4 w-4" /> },
    { id: 'rti', name: 'RTI Forms', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'police', name: 'Police & FIR', icon: <HeartHandshake className="h-4 w-4" /> },
    { id: 'property', name: 'Property', icon: <Home className="h-4 w-4" /> },
    { id: 'consumer', name: 'Consumer', icon: <Users className="h-4 w-4" /> },
    { id: 'employment', name: 'Employment', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'court', name: 'Court', icon: <Gavel className="h-4 w-4" /> },
    { id: 'government', name: 'Government', icon: <Building className="h-4 w-4" /> }
  ];
  
  const documents: Document[] = [
    {
      id: 'doc-1',
      title: 'RTI Application Form',
      category: 'rti',
      description: 'Standard format for filing Right to Information requests to any public authority in India.',
      languages: ['English', 'Hindi', 'Tamil', 'Bengali'],
      featured: true
    },
    {
      id: 'doc-2',
      title: 'FIR Template',
      category: 'police',
      description: 'Template for filing a First Information Report in cases of cognizable offenses.',
      languages: ['English', 'Hindi', 'Marathi', 'Gujarati']
    },
    {
      id: 'doc-3',
      title: 'Domestic Violence Complaint',
      category: 'police',
      description: 'Application for protection under the Protection of Women from Domestic Violence Act.',
      languages: ['English', 'Hindi', 'Tamil'],
      featured: true
    },
    {
      id: 'doc-4',
      title: 'Rent Agreement',
      category: 'property',
      description: 'Standard rental agreement template for residential properties.',
      languages: ['English', 'Hindi']
    },
    {
      id: 'doc-5',
      title: 'Employment Contract',
      category: 'employment',
      description: 'Basic employment contract template with standard terms and conditions.',
      languages: ['English']
    },
    {
      id: 'doc-6',
      title: 'Consumer Complaint Form',
      category: 'consumer',
      description: 'Form for filing complaints with the consumer forum for defective products or services.',
      languages: ['English', 'Hindi', 'Kannada']
    },
    {
      id: 'doc-7',
      title: 'Bail Application',
      category: 'court',
      description: 'Template for applying for regular bail in criminal cases.',
      languages: ['English', 'Hindi']
    },
    {
      id: 'doc-8',
      title: 'Will Template',
      category: 'property',
      description: 'Simple will template for bequeathing property and assets.',
      languages: ['English', 'Hindi', 'Punjabi']
    },
    {
      id: 'doc-9',
      title: 'Income Certificate Application',
      category: 'government',
      description: 'Application format for obtaining income certificate from revenue authorities.',
      languages: ['English', 'Hindi', 'Telugu']
    },
    {
      id: 'doc-10',
      title: 'Power of Attorney',
      category: 'property',
      description: 'General power of attorney template for property and legal matters.',
      languages: ['English', 'Hindi']
    },
    {
      id: 'doc-11',
      title: 'Maintenance Application',
      category: 'court',
      description: 'Application for maintenance under Section 125 CrPC or Hindu Marriage Act.',
      languages: ['English', 'Hindi', 'Bengali']
    },
    {
      id: 'doc-12',
      title: 'Grievance Letter to Employer',
      category: 'employment',
      description: 'Format for raising formal workplace grievances with management.',
      languages: ['English']
    }
  ];
  
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const featuredDocuments = documents.filter(doc => doc.featured);
  
  const handleDownload = (documentId: string, documentTitle: string) => {
    downloadDocument(documentId, documentTitle);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Legal Document Templates | LegalEase India</title>
        <meta name="description" content="Access and download free legal document templates in multiple Indian languages." />
      </Helmet>

      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-justice-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-justice-900 mb-4">
                  Legal Document <span className="text-justice-600">Templates</span>
                </h1>
                <p className="text-justice-600 text-lg mb-8">
                  Access and download free legal document templates in multiple Indian languages.
                  Use these professionally drafted templates for your legal needs.
                </p>
                
                <div className="flex max-w-md mx-auto relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-justice-400" />
                  <Input
                    type="text"
                    placeholder="Search for documents..."
                    className="pl-10 pr-4 py-6 w-full rounded-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Document Categories */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <Tabs 
              defaultValue="all" 
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <ScrollArea className="w-full">
                <TabsList className="flex p-1 mb-8">
                  {documentCategories.map(category => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex items-center gap-2 px-4 py-2"
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>
              
              {documentCategories.map(category => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  {category.id === 'all' && featuredDocuments.length > 0 && (
                    <div className="mb-12">
                      <h2 className="text-2xl font-serif font-semibold text-justice-800 mb-6">
                        Featured Documents
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredDocuments.map(doc => (
                          <Card key={doc.id} className="h-full flex flex-col border-justice-100 hover:border-justice-300 transition-all">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg font-semibold">{doc.title}</CardTitle>
                                <Badge variant="outline" className="bg-justice-50 text-justice-700">Featured</Badge>
                              </div>
                              <CardDescription className="text-justice-600">{doc.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-3 pt-0">
                              <div className="flex flex-wrap gap-2">
                                {doc.languages.map(lang => (
                                  <Badge key={lang} variant="secondary" className="bg-justice-100 text-justice-700 border-none">
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                            <CardFooter className="mt-auto pt-4">
                              <Button
                                onClick={() => handleDownload(doc.id, doc.title)}
                                className="w-full bg-justice-700 hover:bg-justice-800 text-white"
                              >
                                <Download className="mr-2 h-4 w-4" /> Download
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h2 className="text-2xl font-serif font-semibold text-justice-800 mb-6">
                      {category.id === 'all' ? 'All Documents' : `${category.name}`}
                    </h2>
                    
                    {filteredDocuments.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-justice-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-justice-700 mb-2">No documents found</h3>
                        <p className="text-justice-500">
                          Try adjusting your search or category filter to find what you're looking for.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDocuments.map(doc => (
                          <Card key={doc.id} className="h-full flex flex-col border-justice-100 hover:border-justice-300 transition-all">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg font-semibold">{doc.title}</CardTitle>
                              <CardDescription className="text-justice-600">{doc.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-3 pt-0">
                              <div className="flex flex-wrap gap-2">
                                {doc.languages.map(lang => (
                                  <Badge key={lang} variant="secondary" className="bg-justice-100 text-justice-700 border-none">
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                            <CardFooter className="mt-auto pt-4">
                              <Button
                                onClick={() => handleDownload(doc.id, doc.title)}
                                className="w-full bg-justice-700 hover:bg-justice-800 text-white"
                              >
                                <Download className="mr-2 h-4 w-4" /> Download
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Documents;
