import { generateLegalResponse, isCasualConversation } from '@/utils/geminiApi';
import legalKnowledgeBase from './LegalKnowledgeBase';

/**
 * Generates a response to a legal query using a combination of knowledge base matching
 * and the Gemini API for more complex queries
 * 
 * @param query The user's legal query
 * @param knowledgeBase A dictionary of keywords and their corresponding legal information
 * @returns A string containing the answer to the query
 */
const generateResponse = async (query: string, knowledgeBase: Record<string, string> = legalKnowledgeBase) => {
  try {
    // Check if this is likely a casual conversation
    const casual = isCasualConversation(query);
    if (casual) {
      console.log("Detected casual conversation");
      return await generateLegalResponse(query, true);
    }

    // First check if we have a direct match in the knowledge base
    const lowerCaseQuery = query.toLowerCase().trim();
    
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
    
    // Check for exact matches with known legal terms
    if (knowledgeBase[lowerCaseQuery]) {
      console.log(`Exact match found for: ${lowerCaseQuery}`);
      return knowledgeBase[lowerCaseQuery];
    }

    // Check for BNS section queries with different formats (e.g., "bns 103", "section 103 bns", "s. 103 bns")
    const bnsSectionMatch = lowerCaseQuery.match(/(?:bns|section|s\.?)\s*(\d+)(?:\s*bns)?/i);
    if (bnsSectionMatch) {
      const sectionNumber = bnsSectionMatch[1];
      const sectionKey = `section ${sectionNumber} bns`;
      if (knowledgeBase[sectionKey]) {
        console.log(`BNS section match found for: ${sectionKey}`);
        return knowledgeBase[sectionKey];
      }
    }
    
    // Check for direct keyword matches in knowledge base
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerCaseQuery.includes(key.toLowerCase())) {
        console.log(`Direct match found for: ${key}`);
        return value;
      }
    }

    // Look for crime or legal concept keywords as standalone terms
    const queryWords = lowerCaseQuery.split(/\s+/);
    const legalTerms = [
      "murder", "rape", "theft", "assault", "kidnapping", "extortion", "fraud", 
      "cheating", "defamation", "terrorism", "trafficking", "stalking", "dowry",
      "sedition", "domestic violence", "cybercrime", "forgery", "robbery"
    ];

    for (const word of queryWords) {
      if (legalTerms.includes(word) && knowledgeBase[word]) {
        console.log(`Legal term match found for: ${word}`);
        return knowledgeBase[word];
      }
    }
    
    // Look for partial matches by checking if query words are in keywords
    const significantQueryWords = new Set(lowerCaseQuery.split(/\s+/).filter(word => word.length > 2));
    let bestPartialMatch = null;
    let bestPartialScore = 0;

    for (const [key, value] of Object.entries(knowledgeBase)) {
      const keyWords = key.toLowerCase().split(/\s+/);
      let matchScore = 0;
      
      for (const word of significantQueryWords) {
        for (const keyWord of keyWords) {
          // Check for word inclusion
          if (keyWord.includes(word) || word.includes(keyWord)) {
            matchScore += (keyWord === word) ? 1.5 : 0.5;
          }
        }
      }
      
      if (matchScore > bestPartialScore) {
        bestPartialScore = matchScore;
        bestPartialMatch = value;
      }
    }
    
    if (bestPartialMatch && bestPartialScore > 1.5) {
      console.log(`Partial match found with score: ${bestPartialScore}`);
      return bestPartialMatch;
    }
    
    // For complex queries, use semantic matching to find the best match
    let bestMatch = findBestSemanticMatch(query, knowledgeBase);
    if (bestMatch) {
      console.log(`Semantic match found with score: ${bestMatch.score}`);
      return bestMatch.response;
    }
    
    // Analyze the query for multiple facets and combine responses
    const multiResponse = generateMultiFacetedResponse(query, knowledgeBase);
    if (multiResponse) {
      console.log("Generated multi-faceted response");
      return multiResponse;
    }
    
    // If no good match in the knowledge base, use the Gemini API
    console.log("No match in knowledge base, using Gemini API");
    const response = await generateLegalResponse(query, false);
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
    
    // Handle casual conversational queries with generic responses
    if (isCasualConversation(query)) {
      return generateConversationalResponse(query);
    }
    
    return "I'm sorry, I don't have specific information on that topic. For legal advice tailored to your situation, please consider consulting with a qualified lawyer. You can find pro-bono lawyers on our Lawyers page.";
  }
};

/**
 * Analyzes query to detect if it's conversational rather than legal
 */
function isConversationalQuery(query: string): boolean {
  const conversationalPatterns = [
    /\b(?:hello|hi|hey|greetings|howdy)\b/i,
    /\bhow (?:are|r) (?:you|u)\b/i,
    /\bnice to meet you\b/i,
    /\b(?:thanks|thank you|ty)\b/i,
    /\b(?:bye|goodbye|see you|talk to you later)\b/i,
    /\bwhat'?s (?:up|going on)\b/i,
    /\bwho (?:are|r) (?:you|u)\b/i
  ];
  
  return conversationalPatterns.some(pattern => pattern.test(query));
}

/**
 * Generates appropriate responses to conversational queries
 */
function generateConversationalResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  if (/\b(?:hello|hi|hey|greetings|howdy)\b/i.test(lowerQuery)) {
    return "Hello! I'm your AI legal assistant. How can I help you with legal information today?";
  }
  
  if (/\bhow (?:are|r) (?:you|u)\b/i.test(lowerQuery)) {
    return "I'm doing well, thank you for asking! I'm here to help with legal questions based on Indian law. What can I assist you with?";
  }
  
  if (/\bwho (?:are|r) (?:you|u)\b/i.test(lowerQuery)) {
    return "I'm an AI legal assistant for LegalEase India. I can provide information about Indian laws, legal procedures, and help you understand legal concepts. How can I assist you today?";
  }
  
  if (/\b(?:thanks|thank you|ty)\b/i.test(lowerQuery)) {
    return "You're welcome! If you have any more legal questions, feel free to ask anytime.";
  }
  
  if (/\b(?:bye|goodbye|see you|talk to you later)\b/i.test(lowerQuery)) {
    return "Goodbye! Feel free to return if you have more legal questions in the future.";
  }
  
  // Default conversational response
  return "I'm here to help with your legal questions. Could you please ask about specific legal topics or issues you're facing?";
}

/**
 * Combines multiple knowledge base entries to generate a comprehensive response
 * for queries that might span multiple legal topics
 */
function generateMultiFacetedResponse(query: string, knowledgeBase: Record<string, string>): string | null {
  // Extract potential key topics from the query
  const keyWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 3);
  const relevantResponses: string[] = [];
  
  // Find matches for each significant word in the query
  for (const word of keyWords) {
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (key.toLowerCase().includes(word)) {
        if (!relevantResponses.includes(value)) {
          relevantResponses.push(value);
        }
        // Limit to prevent overly long responses
        if (relevantResponses.length >= 2) break;
      }
    }
    if (relevantResponses.length >= 2) break;
  }
  
  // If we found multiple relevant entries, combine them
  if (relevantResponses.length > 1) {
    return `Here's information that might help with your query:\n\n${relevantResponses.join('\n\n')}`;
  }
  
  return null;
}

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
