
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  MessageSquare, 
  Users, 
  FileText, 
  Shield, 
  Globe, 
  BookOpen 
} from 'lucide-react';

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [60, 0, 0, 60]);
  
  const featuresData = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "AI Legal Chatbot",
      description: "Get instant answers to your legal questions through our advanced AI assistant trained on Indian law."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Pro-Bono Lawyers",
      description: "Connect with qualified lawyers offering free legal services to those in need across India."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Document Templates",
      description: "Access and download ready-to-use templates for RTI applications, legal notices, FIR formats, and more."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Rights Protection",
      description: "Learn about your fundamental legal rights and how to protect them in various situations."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multilingual Support",
      description: "Access legal information in multiple Indian languages to overcome language barriers."
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Legal Education",
      description: "Simple, easy-to-understand articles and guides on common legal issues in India."
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <motion.div 
          style={{ opacity, y }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center bg-justice-100 px-4 py-1.5 rounded-full mb-4">
            <span className="text-justice-700 text-sm font-medium">Comprehensive Legal Support</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-justice-900 mb-6">
            Free Legal Assistance <span className="text-justice-600">For Everyone</span>
          </h2>
          <p className="text-justice-600 text-lg">
            LegalEase India provides a comprehensive platform with multiple services 
            designed to simplify legal assistance for all Indians, with special focus 
            on accessibility for underprivileged communities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
              className="bg-white border border-justice-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-justice-50 p-3 rounded-full inline-flex mb-4">
                <div className="text-justice-600">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-justice-800 mb-3">{feature.title}</h3>
              <p className="text-justice-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
