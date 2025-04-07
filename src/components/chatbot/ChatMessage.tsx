
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  content: string;
  sender: 'user' | 'bot';
  index: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, sender, index }) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex mb-4 ${sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex gap-2 max-w-[80%] ${sender === 'user' ? 'flex-row-reverse' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          sender === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-justice-100 text-justice-600'
        }`}>
          {sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>
        <div className={`p-3 rounded-lg ${
          sender === 'user' 
            ? 'bg-justice-600 text-white rounded-tr-none' 
            : 'bg-white border border-gray-200 rounded-tl-none'
        }`}>
          {content.split('\n').map((text, i) => (
            <p key={i} className={i > 0 ? "mt-2" : ""}>{text}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
