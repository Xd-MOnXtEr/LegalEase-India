
import { generateLegalResponse } from '@/utils/geminiApi';

const generateResponse = async (query: string, knowledgeBase: Record<string, string>) => {
  try {
    // Use the Gemini API to generate a response
    const response = await generateLegalResponse(query);
    return response;
  } catch (error) {
    console.error("Error generating response:", error);
    
    // Fallback to basic keyword matching if API fails
    const lowerCaseQuery = query.toLowerCase();
    
    // Check for specific keywords in the knowledge base
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerCaseQuery.includes(key.toLowerCase())) {
        return value;
      }
    }
    
    return "I'm sorry, I don't have information on that topic. Please ask about specific areas of Indian law.";
  }
};

export default generateResponse;
