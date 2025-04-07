import { generateLegalResponse } from '@/utils/geminiApi';

const generateResponse = async (query: string, knowledgeBase: Record<string, string>) => {
  try {
    // Instead of using the local knowledge base, we'll use Gemini API
    const response = await generateLegalResponse(query);
    return response;
  } catch (error) {
    console.error("Error generating response:", error);
    
    // Fallback to basic matching if API fails
    const lowerCaseQuery = query.toLowerCase();
    
    // Check for specific keywords related to criminal law
    if (lowerCaseQuery.includes('murder')) {
      return knowledgeBase['murder'];
    }
    if (lowerCaseQuery.includes('kidnapping')) {
      return knowledgeBase['kidnapping'];
    }
    if (lowerCaseQuery.includes('ransom')) {
      return knowledgeBase['ransom'];
    }
    if (lowerCaseQuery.includes('extortion')) {
      return knowledgeBase['extortion'];
    }
    if (lowerCaseQuery.includes('rape')) {
      return knowledgeBase['rape'];
    }
    if (lowerCaseQuery.includes('domestic violence')) {
      return knowledgeBase['domestic violence'];
    }
    
    return "I'm sorry, I'm having trouble connecting to my knowledge base. Please try again later.";
  }
};

export default generateResponse;
