
/**
 * Utility functions for handling document downloads and management
 */

import { toast } from 'sonner';

export interface Document {
  id: string;
  title: string;
  category: string;
  description: string;
  languages: string[];
  featured?: boolean;
  fileUrl?: string;
}

// Extended document templates database
export const documentTemplates: Document[] = [
  {
    id: 'doc-1',
    title: 'RTI Application Form',
    category: 'Government',
    description: 'Standard application form for filing Right to Information requests to public authorities.',
    languages: ['English', 'Hindi'],
    featured: true,
    fileUrl: '/documents/rti-application-form.pdf'
  },
  {
    id: 'doc-2',
    title: 'FIR Template',
    category: 'Criminal',
    description: 'First Information Report template with instructions for filing complaints to police.',
    languages: ['English', 'Hindi', 'Bengali', 'Tamil'],
    featured: true,
    fileUrl: '/documents/fir-template.pdf'
  },
  {
    id: 'doc-3',
    title: 'Domestic Violence Complaint Form',
    category: 'Family',
    description: 'Legal form for filing domestic violence complaints under the Protection of Women from Domestic Violence Act.',
    languages: ['English', 'Hindi', 'Marathi', 'Telugu'],
    fileUrl: '/documents/domestic-violence-complaint.pdf'
  },
  {
    id: 'doc-4',
    title: 'Rent Agreement Template',
    category: 'Property',
    description: 'Standard lease agreement template for renting residential property with customizable terms.',
    languages: ['English', 'Hindi'],
    featured: true,
    fileUrl: '/documents/rent-agreement.pdf'
  },
  {
    id: 'doc-5',
    title: 'Employment Contract Template',
    category: 'Employment',
    description: 'Comprehensive employment agreement template compliant with Indian labor laws.',
    languages: ['English'],
    fileUrl: '/documents/employment-contract.pdf'
  },
  {
    id: 'doc-6',
    title: 'Consumer Complaint Form',
    category: 'Consumer',
    description: 'Template for filing complaints with Consumer Disputes Redressal Commission.',
    languages: ['English', 'Hindi', 'Tamil'],
    fileUrl: '/documents/consumer-complaint-form.pdf'
  },
  {
    id: 'doc-7',
    title: 'Bail Application',
    category: 'Criminal',
    description: 'Template for regular bail application to be filed in court.',
    languages: ['English', 'Hindi'],
    fileUrl: '/documents/bail-application.pdf'
  },
  {
    id: 'doc-8',
    title: 'Will Template',
    category: 'Estate Planning',
    description: 'Simple last will and testament template with instructions for proper execution.',
    languages: ['English', 'Hindi', 'Kannada'],
    featured: true,
    fileUrl: '/documents/will-template.pdf'
  },
  {
    id: 'doc-9',
    title: 'Income Certificate Application',
    category: 'Government',
    description: 'Application form for obtaining income certificate from revenue authorities.',
    languages: ['English', 'Hindi'],
    fileUrl: '/documents/income-certificate-application.pdf'
  },
  {
    id: 'doc-10',
    title: 'Power of Attorney Format',
    category: 'Legal',
    description: 'General Power of Attorney template for authorizing someone to act on your behalf.',
    languages: ['English', 'Hindi', 'Gujarati'],
    fileUrl: '/documents/power-of-attorney.pdf'
  },
  {
    id: 'doc-11',
    title: 'Maintenance Application Form',
    category: 'Family',
    description: 'Application template for claiming maintenance under Section 125 CrPC.',
    languages: ['English', 'Hindi', 'Malayalam'],
    fileUrl: '/documents/maintenance-application.pdf'
  },
  {
    id: 'doc-12',
    title: 'Grievance Letter to Employer',
    category: 'Employment',
    description: 'Template for addressing workplace grievances formally with employers.',
    languages: ['English'],
    fileUrl: '/documents/grievance-letter-employer.pdf'
  },
  // New templates
  {
    id: 'doc-13',
    title: 'Police Complaint Template',
    category: 'Criminal',
    description: 'General format for filing written complaints to police stations.',
    languages: ['English', 'Hindi', 'Punjabi'],
    fileUrl: '/documents/police-complaint.pdf'
  },
  {
    id: 'doc-14',
    title: 'Mutual Divorce Petition',
    category: 'Family',
    description: 'Template for filing mutual consent divorce petition under Section 13B of Hindu Marriage Act.',
    languages: ['English', 'Hindi'],
    featured: true,
    fileUrl: '/documents/mutual-divorce-petition.pdf'
  },
  {
    id: 'doc-15',
    title: 'Startup Incorporation Documents',
    category: 'Business',
    description: 'Bundle of templates for startup incorporation including MoA, AoA and shareholder agreement.',
    languages: ['English'],
    fileUrl: '/documents/startup-incorporation.pdf'
  }
];

// Get document by ID
export const getDocumentById = (documentId: string): Document | undefined => {
  return documentTemplates.find(doc => doc.id === documentId);
};

// Get document file URL
export const getDocumentFileUrl = (documentId: string): string => {
  const document = getDocumentById(documentId);
  return document?.fileUrl || '';
};

export const downloadDocument = (documentId: string, documentTitle: string): void => {
  try {
    // Get the document URL
    const fileUrl = getDocumentFileUrl(documentId);
    
    if (!fileUrl) {
      toast.error(`Document file for ${documentTitle} not found`);
      return;
    }
    
    // For this demo, we'll create a sample PDF on-the-fly
    // In a production app, this would download an actual file from a server
    const blob = generateSamplePDF(documentTitle, documentId);
    const blobUrl = window.URL.createObjectURL(blob);
    
    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${documentTitle.replace(/\s+/g, '-').toLowerCase()}.pdf`;
    
    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the blob URL
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
    
    toast.success(`Downloading ${documentTitle}`);
  } catch (error) {
    console.error("Error downloading document:", error);
    toast.error("Failed to download document. Please try again.");
  }
};

// Get featured documents
export const getFeaturedDocuments = (): Document[] => {
  return documentTemplates.filter(doc => doc.featured === true);
};

// Get documents by category
export const getDocumentsByCategory = (category: string): Document[] => {
  return documentTemplates.filter(doc => doc.category === category);
};

// Search documents
export const searchDocuments = (query: string): Document[] => {
  const lowerCaseQuery = query.toLowerCase();
  return documentTemplates.filter(doc => 
    doc.title.toLowerCase().includes(lowerCaseQuery) || 
    doc.description.toLowerCase().includes(lowerCaseQuery) ||
    doc.category.toLowerCase().includes(lowerCaseQuery)
  );
};

// Generate categories from documents
export const getDocumentCategories = (): string[] => {
  const categories = new Set(documentTemplates.map(doc => doc.category));
  return Array.from(categories);
};

// Helper function to generate a sample PDF for demo purposes
const generateSamplePDF = (title: string, docId: string): Blob => {
  // Get corresponding document
  const document = getDocumentById(docId);
  
  // This is a very basic representation of a PDF file
  // In a real app, you would use a proper PDF generation library or serve real files
  const pdfContent = `
%PDF-1.5
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
5 0 obj
<< /Length 368 >>
stream
BT
/F1 24 Tf
100 700 Td
(${title}) Tj
/F1 12 Tf
0 -50 Td
(LegalEase India Document Template) Tj
0 -20 Td
(Category: ${document?.category || 'Legal Document'}) Tj
0 -20 Td
(This is a legal document template provided for reference only.) Tj
0 -20 Td
(Please consult with a qualified legal professional before use.) Tj
0 -40 Td
(Available in: ${document?.languages.join(', ') || 'English'}) Tj
0 -20 Td
(Document ID: ${docId}) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000233 00000 n
0000000309 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
718
%%EOF
  `.trim();
  
  return new Blob([pdfContent], { type: 'application/pdf' });
};
