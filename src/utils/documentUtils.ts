
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

// This would typically come from an API or database
export const getDocumentFileUrl = (documentId: string): string => {
  // In a real application, this would be a dynamic URL to the actual document
  const documentMap: Record<string, string> = {
    'doc-1': '/documents/rti-application-form.pdf',
    'doc-2': '/documents/fir-template.pdf',
    'doc-3': '/documents/domestic-violence-complaint.pdf',
    'doc-4': '/documents/rent-agreement.pdf',
    'doc-5': '/documents/employment-contract.pdf',
    'doc-6': '/documents/consumer-complaint-form.pdf',
    'doc-7': '/documents/bail-application.pdf',
    'doc-8': '/documents/will-template.pdf',
    'doc-9': '/documents/income-certificate-application.pdf',
    'doc-10': '/documents/power-of-attorney.pdf',
    'doc-11': '/documents/maintenance-application.pdf',
    'doc-12': '/documents/grievance-letter-employer.pdf',
  };
  
  return documentMap[documentId] || '';
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
    const blob = generateSamplePDF(documentTitle);
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

// Helper function to generate a sample PDF for demo purposes
const generateSamplePDF = (title: string): Blob => {
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
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 68 >>
stream
BT
/F1 24 Tf
100 700 Td
(${title} - Sample Document) Tj
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
0000000300 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
418
%%EOF
  `.trim();
  
  return new Blob([pdfContent], { type: 'application/pdf' });
};
