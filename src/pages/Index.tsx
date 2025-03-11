
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Scale, Users, BookOpen, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';

const Index = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <Features />
        
        {/* How It Works Section */}
        <section className="py-16 bg-justice-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center justify-center bg-justice-100 px-4 py-1.5 rounded-full mb-4">
                <span className="text-justice-700 text-sm font-medium">Simple Process</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-justice-900 mb-6">
                How LegalEase <span className="text-justice-600">Works</span>
              </h2>
              <p className="text-justice-600 text-lg">
                Get the legal help you need in just a few simple steps.
                Our platform is designed to be intuitive and accessible for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  number: '01',
                  title: 'Ask a Question',
                  description: 'Use our AI chatbot to get instant answers to your legal questions, available 24/7.',
                  icon: <MessageSquare className="h-6 w-6" />
                },
                {
                  number: '02',
                  title: 'Connect with a Lawyer',
                  description: 'Find and book appointments with pro-bono lawyers specializing in your case type.',
                  icon: <Users className="h-6 w-6" />
                },
                {
                  number: '03',
                  title: 'Get Resolution',
                  description: 'Receive personalized guidance and access document templates to resolve your legal matter.',
                  icon: <CheckCircle2 className="h-6 w-6" />
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="glass-panel p-6 h-full flex flex-col">
                    <div className="bg-justice-100 p-3 rounded-full inline-flex mb-4">
                      <div className="text-justice-700">{step.icon}</div>
                    </div>
                    <div className="absolute top-6 right-6 font-serif text-4xl font-bold text-justice-100">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-justice-800 mb-3">{step.title}</h3>
                    <p className="text-justice-600">{step.description}</p>
                    
                    {index < 2 && (
                      <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                        <div className="bg-white rounded-full p-2 shadow-sm">
                          <ArrowRight className="h-4 w-4 text-justice-400" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { value: '10,000+', label: 'Legal Questions Answered', icon: <MessageSquare className="h-5 w-5" /> },
                { value: '500+', label: 'Pro-Bono Lawyers', icon: <Users className="h-5 w-5" /> },
                { value: '100+', label: 'Document Templates', icon: <BookOpen className="h-5 w-5" /> }
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-lg bg-justice-50 border border-justice-100">
                  <div className="bg-justice-100 p-3 rounded-full inline-flex mb-4">
                    <div className="text-justice-700">{stat.icon}</div>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-justice-800">{stat.value}</h3>
                  <p className="text-justice-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <motion.section 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="py-20 bg-justice-900 text-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="inline-flex items-center justify-center bg-justice-800 px-4 py-1.5 rounded-full">
                    <Scale className="h-4 w-4 text-justice-300 mr-2" />
                    <span className="text-justice-300 text-sm font-medium">Justice For All</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold">
                    Need legal help <span className="text-justice-300">but can't afford it?</span>
                  </h2>
                  <p className="text-justice-400 text-lg">
                    Everyone deserves access to legal assistance, regardless of their financial situation. 
                    LegalEase India connects you with free resources and pro-bono lawyers committed to 
                    helping those in need.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                    <Button asChild size="lg" className="bg-white text-justice-800 hover:bg-justice-100">
                      <Link to="/chat">
                        <MessageSquare className="mr-2 h-5 w-5" /> Chat with AI
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-justice-700 text-white hover:bg-justice-800">
                      <Link to="/lawyers">
                        <Users className="mr-2 h-5 w-5" /> Find a Lawyer
                      </Link>
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="lg:pl-10">
                  <div className="bg-justice-800 p-6 rounded-lg border border-justice-700">
                    <h3 className="text-xl font-semibold mb-4 text-white">Who Qualifies for Free Legal Aid?</h3>
                    <ul className="space-y-3">
                      {[
                        'People below the poverty line',
                        'Women and children',
                        'Members of SC/ST communities',
                        'Victims of human trafficking',
                        'Persons with disabilities',
                        'Victims of disasters or violence',
                        'Industrial workmen',
                        'Persons in custody'
                      ].map((item, index) => (
                        <li key={index} className="flex">
                          <CheckCircle2 className="h-5 w-5 text-justice-300 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-justice-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-justice-400">
                      As per the Legal Services Authorities Act, 1987
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
