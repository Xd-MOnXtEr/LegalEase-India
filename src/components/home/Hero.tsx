
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Scale, MessageSquare, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: 'AI Legal Assistance',
      description: 'Get instant answers to common legal questions through our AI chatbot.',
      link: '/chat'
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Connect with Lawyers',
      description: 'Find and book appointments with pro-bono lawyers in your area.',
      link: '/lawyers'
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: 'Document Templates',
      description: 'Access free legal document templates like RTI forms, FIR formats, and more.',
      link: '/documents'
    }
  ];

  return (
    <section className="relative pt-16 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-justice-50 to-white -z-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center justify-center bg-justice-100 px-4 py-1.5 rounded-full mb-6">
            <Scale className="h-4 w-4 text-justice-700 mr-2" />
            <span className="text-justice-700 text-sm font-medium">Free Legal Aid Simplified</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-justice-900 mb-6">
            Justice shouldn't be a <span className="text-justice-600">privilege</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-justice-600 mb-8 max-w-3xl mx-auto">
            LegalEase India provides free legal assistance, especially for underprivileged people. 
            Get answers to your legal questions, connect with pro-bono lawyers, and access document templates.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button asChild size="lg" className="bg-justice-700 hover:bg-justice-800 text-white px-8">
              <Link to="/chat">
                <MessageSquare className="mr-2 h-5 w-5" /> Chat with AI
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-justice-300 text-justice-700 hover:bg-justice-50 px-8">
              <Link to="/lawyers">
                <Users className="mr-2 h-5 w-5" /> Find a Lawyer
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-panel p-6 flex flex-col items-center text-center"
              >
                <div className="bg-justice-100 p-3 rounded-full mb-4">
                  <div className="text-justice-700">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-justice-800 mb-2">{feature.title}</h3>
                <p className="text-justice-600 mb-4">{feature.description}</p>
                <Link 
                  to={feature.link}
                  className="text-justice-600 font-medium hover:text-justice-800 mt-auto flex items-center"
                >
                  Learn more
                  <svg className="ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
