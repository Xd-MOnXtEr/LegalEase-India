
import { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import generateResponse from './NLPResponseGenerator';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import legalKnowledgeBase from './LegalKnowledgeBase';

interface ChatMessage {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Number of recent messages to consider for context
const CONTEXT_MESSAGE_COUNT = 3;

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content: "Hello! I'm your AI legal assistant. How can I help you with legal information based on Indian law today? You can ask me anything from casual questions to specific legal queries.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = { 
      content: input, 
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and show loading
    setInput('');
    setIsLoading(true);
    
    try {
      // Get recent message context
      const recentMessages = messages
        .slice(-CONTEXT_MESSAGE_COUNT)
        .map(msg => `${msg.sender}: ${msg.content}`)
        .join('\n');
      
      // Process the query with our enhanced knowledge base and Gemini API
      const contextualizedQuery = `Recent conversation:\n${recentMessages}\n\nUser query: ${input}`;
      const response = await generateResponse(input, legalKnowledgeBase);
      
      const botMessage: ChatMessage = { 
        content: response, 
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: ChatMessage = { 
        content: "I'm sorry, I encountered an error while processing your question. Please try again later.", 
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error("Error generating response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        content: "Hello! I'm your AI legal assistant. How can I help you with legal information based on Indian law today? You can ask me anything from casual questions to specific legal queries.",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    toast.success("Chat history cleared");
  };

  return (
    <Card className="w-full border border-justice-200 shadow-sm overflow-hidden">
      <div className="bg-justice-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">LegalEase AI Assistant</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearChat} 
          className="text-white hover:text-white/80 hover:bg-justice-700"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Clear Chat
        </Button>
      </div>
      
      <CardContent className="p-0">
        <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              content={message.content} 
              sender={message.sender} 
              index={index} 
            />
          ))}
          
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-gray-200 flex gap-2">
          <Input
            placeholder="Ask me anything - from casual questions to legal queries..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!input.trim() || isLoading}
            className="bg-justice-600 hover:bg-justice-700"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
