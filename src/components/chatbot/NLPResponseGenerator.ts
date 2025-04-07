
import { generateLegalResponse } from '@/utils/geminiApi';

/**
 * Generates a response to a legal query using a combination of knowledge base matching
 * and the Gemini API for more complex queries
 * 
 * @param query The user's legal query
 * @param knowledgeBase A dictionary of keywords and their corresponding legal information
 * @returns A string containing the answer to the query
 */
const generateResponse = async (query: string, knowledgeBase: Record<string, string>) => {
  try {
    // First check if we have a direct match in the knowledge base
    const lowerCaseQuery = query.toLowerCase();
    
    // Check for casual greetings and simple queries first
    const casualPhrases = ["hello", "hi", "how are you", "thank you", "thanks", "bye"];
    for (const phrase of casualPhrases) {
      if (lowerCaseQuery.includes(phrase)) {
        const response = knowledgeBase[phrase];
        if (response) {
          console.log(`Casual phrase match found for: ${phrase}`);
          return response;
        }
      }
    }
    
    // Look for direct keyword matches in knowledge base
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerCaseQuery.includes(key.toLowerCase())) {
        console.log(`Direct match found for: ${key}`);
        return value;
      }
    }
    
    // For complex queries, use semantic matching to find the best match
    let bestMatch = findBestSemanticMatch(query, knowledgeBase);
    if (bestMatch) {
      console.log(`Semantic match found with score: ${bestMatch.score}`);
      return bestMatch.response;
    }
    
    // If no good match in the knowledge base, use the Gemini API
    console.log("No match in knowledge base, using Gemini API");
    const response = await generateLegalResponse(query);
    return response;
    
  } catch (error) {
    console.error("Error generating response:", error);
    
    // More robust fallback to keyword matching if API fails
    const lowerCaseQuery = query.toLowerCase();
    
    // Try to find partial matches
    let bestMatch = null;
    let bestMatchScore = 0;
    
    // Check for partial keyword matches and find the best one
    for (const [key, value] of Object.entries(knowledgeBase)) {
      const keyWords = key.toLowerCase().split(" ");
      const queryWords = lowerCaseQuery.split(" ");
      
      // Calculate match score based on word overlaps
      let matchScore = 0;
      for (const keyWord of keyWords) {
        if (queryWords.includes(keyWord)) {
          matchScore += 1;
        }
        // Check for fuzzy matches (substrings)
        else {
          for (const queryWord of queryWords) {
            if (keyWord.includes(queryWord) || queryWord.includes(keyWord)) {
              matchScore += 0.5;
            }
          }
        }
      }
      
      if (matchScore > 0 && matchScore > bestMatchScore) {
        bestMatch = value;
        bestMatchScore = matchScore;
      }
    }
    
    if (bestMatch) {
      console.log(`Fallback match found with score: ${bestMatchScore}`);
      return bestMatch;
    }
    
    return "I'm sorry, I don't have specific information on that topic. For legal advice tailored to your situation, please consider consulting with a qualified lawyer. You can find pro-bono lawyers on our Lawyers page.";
  }
};

/**
 * Finds the best semantic match for a query in the knowledge base
 * 
 * @param query The user's query
 * @param knowledgeBase The knowledge base to search
 * @returns The best matching response and its score, or null if no good match
 */
function findBestSemanticMatch(query: string, knowledgeBase: Record<string, string>) {
  let bestScore = 0;
  let bestResponse = null;
  const threshold = 0.3; // Minimum similarity threshold
  
  const queryWords = new Set(query.toLowerCase().split(/\s+/).filter(word => word.length > 2));
  
  for (const [key, value] of Object.entries(knowledgeBase)) {
    const keyWords = new Set(key.toLowerCase().split(/\s+/).filter(word => word.length > 2));
    
    // Calculate Jaccard similarity (intersection over union)
    const intersection = new Set([...queryWords].filter(word => keyWords.has(word)));
    const union = new Set([...queryWords, ...keyWords]);
    
    const score = intersection.size / union.size;
    
    if (score > bestScore && score >= threshold) {
      bestScore = score;
      bestResponse = value;
    }
  }
  
  return bestResponse ? { response: bestResponse, score: bestScore } : null;
}

export default generateResponse;
