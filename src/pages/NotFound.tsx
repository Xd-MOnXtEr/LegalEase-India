
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import BackButton from "@/components/layout/BackButton";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md w-full bg-white p-8 rounded-lg shadow-md"
      >
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <h1 className="text-6xl font-bold text-justice-600 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <a href="/" className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-justice-600 hover:bg-justice-700 md:py-3 md:text-lg md:px-8 transition-colors duration-300">
          Return to Home
        </a>
      </motion.div>
    </div>
  );
};

export default NotFound;
