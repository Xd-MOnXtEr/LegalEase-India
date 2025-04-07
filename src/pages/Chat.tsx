
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import ChatInterface from '@/components/chatbot/ChatInterface';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackButton from '@/components/layout/BackButton';

const Chat = () => {
  return (
    <>
      <Helmet>
        <title>AI Legal Assistant | LegalEase India</title>
        <meta name="description" content="Get instant answers to your legal questions with our AI-powered legal assistant." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <section className="container mx-auto px-4 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto relative"
            >
              <BackButton />
              <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  AI Legal Assistant
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Get instant answers to your common legal questions. Our AI assistant provides general legal information based on Indian law.
                </p>
              </div>
              
              <ChatInterface />
            </motion.div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Chat;
