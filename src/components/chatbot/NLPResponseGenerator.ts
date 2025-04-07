
import { generateLegalResponse } from '@/utils/geminiApi';

const generateResponse = async (query: string, knowledgeBase: Record<string, string>) => {
  try {
    // First check if we have a direct match in the knowledge base
    const lowerCaseQuery = query.toLowerCase();
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerCaseQuery.includes(key.toLowerCase())) {
        return value;
      }
    }
    
    // If no direct match, use the Gemini API
    const response = await generateLegalResponse(query);
    return response;
    
  } catch (error) {
    console.error("Error generating response:", error);
    
    // More robust fallback to keyword matching if API fails
    const lowerCaseQuery = query.toLowerCase();
    let bestMatch = null;
    let bestMatchScore = 0;
    
    // Check for partial keyword matches and find the best one
    for (const [key, value] of Object.entries(knowledgeBase)) {
      const keyWords = key.toLowerCase().split(" ");
      const matchScore = keyWords.filter(word => lowerCaseQuery.includes(word)).length;
      
      if (matchScore > 0 && matchScore > bestMatchScore) {
        bestMatch = value;
        bestMatchScore = matchScore;
      }
    }
    
    if (bestMatch) {
      return bestMatch;
    }
    
    return "I'm sorry, I don't have information on that topic. Please ask about specific areas of Indian law.";
  }
};

export default generateResponse;
