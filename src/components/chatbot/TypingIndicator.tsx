
import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-start mb-4"
    >
      <div className="flex gap-2 max-w-[80%]">
        <div className="w-8 h-8 rounded-full bg-justice-100 text-justice-600 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4" />
        </div>
        <div className="p-3 rounded-lg bg-white border border-gray-200 rounded-tl-none">
          <div className="flex space-x-2 items-center">
            <div className="h-2 w-2 bg-justice-300 rounded-full animate-bounce"></div>
            <div className="h-2 w-2 bg-justice-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="h-2 w-2 bg-justice-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
