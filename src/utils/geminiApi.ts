
const GEMINI_API_KEY = "AIzaSyCbSm3GuiDZHq9rIQc4rq7NFbLeXjpQDVA";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
    finishReason?: string;
  }[];
  promptFeedback?: {
    blockReason?: string;
    safetyRatings?: {
      category: string;
      probability: string;
    }[];
  };
}

/**
 * Generates a response for legal queries using the Gemini API
 * 
 * @param query The legal query to process
 * @param isCasual Boolean indicating if this is a casual conversation
 * @returns A string containing the response
 */
export const generateLegalResponse = async (query: string, isCasual: boolean = false): Promise<string> => {
  try {
    // Select appropriate prompt based on query type
    const prompt = isCasual 
      ? createCasualPrompt(query)
      : createLegalPrompt(query);

    const requestBody = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: isCasual ? 0.7 : 0.2, // Higher temperature for casual conversation
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 800,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    console.log(`Sending ${isCasual ? 'casual' : 'legal'} request to Gemini API`);
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error response from Gemini API (${response.status}): ${errorText}`);
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json() as GeminiResponse;
    console.log("Received response from Gemini API");
    
    // Check for content blocks
    if (data.promptFeedback?.blockReason) {
      console.error("Content blocked by Gemini API:", data.promptFeedback.blockReason);
      return "I'm sorry, but I can't provide information on that topic. Please ask something else related to Indian law or general conversation.";
    }

    // Validate response structure
    if (!data.candidates || data.candidates.length === 0) {
      console.error("No candidates in Gemini response:", data);
      throw new Error("No response candidates received");
    }

    const candidate = data.candidates[0];
    
    // Check for finish reason
    if (candidate.finishReason && candidate.finishReason !== "STOP") {
      console.warn(`Response generation finished with reason: ${candidate.finishReason}`);
    }

    if (!candidate.content?.parts || candidate.content.parts.length === 0) {
      console.error("No content parts in Gemini response:", data);
      throw new Error("Invalid response structure");
    }

    let responseText = candidate.content.parts[0].text.trim();
    
    // Format response for better readability
    responseText = responseText
      .replace(/\n\n/g, '\n')  // Remove excessive newlines
      .replace(/\*\*(.*?)\*\*/g, '$1');  // Remove markdown bold syntax

    return responseText;
    
  } catch (error) {
    console.error("Error with Gemini API:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

/**
 * Creates a specialized prompt for Indian legal context
 */
const createLegalPrompt = (query: string): string => {
  return `
  You are a knowledgeable legal assistant specializing in Indian law. Provide accurate, helpful, and concise information based on the following query. 
  
  - Focus specifically on Indian legal context and statutes
  - Include information about new laws like the Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA) when relevant
  - For criminal offenses, always mention the relevant BNS section (previously IPC), punishment details, and key elements of the offense
  - Provide section numbers when discussing legal provisions
  - If discussing recent legal reforms, explain how they differ from previous laws
  - If you're unsure about a specific detail, acknowledge the limitation
  - Provide clear, practical information when possible
  - Keep responses focused and under 200 words
  - Don't fabricate legal provisions
  - Be conversational and friendly while maintaining accuracy
  
  Query: ${query}
  `;
};

/**
 * Creates a prompt for casual conversation while maintaining legal assistant identity
 */
const createCasualPrompt = (query: string): string => {
  return `
  You are LegalEase, a friendly AI assistant for a legal help website in India. The user is having a casual conversation with you.
  
  - Respond in a friendly, conversational manner
  - Keep your identity as a legal assistant, but be personable and engaging
  - If the user asks about you, mention you're an AI assistant for LegalEase India that helps with legal information
  - Keep responses concise (under 100 words)
  - If the conversation could be steered toward legal topics, gently suggest legal topics you can help with
  - Be helpful and supportive, but don't provide specific legal advice for the user's personal situation
  - Use natural, conversational language with occasional friendly expressions
  - Be respectful and professional, but not overly formal
  
  User message: ${query}
  `;
};

/**
 * Determines if a query is likely a casual conversation rather than a legal query
 * 
 * @param query The user's query text
 * @returns Boolean indicating if the query appears to be casual conversation
 */
export const isCasualConversation = (query: string): boolean => {
  const casualPatterns = [
    // Greetings
    /^(?:hi|hello|hey|greetings|good\s*(?:morning|afternoon|evening)|namaste)/i,
    
    // Questions about the assistant
    /(?:who|what)\s+(?:are|is)\s+you/i,
    /tell\s+(?:me\s+)?about\s+(?:yourself|you)/i,
    /your\s+name/i,
    
    // Pleasantries
    /^(?:how\s+are\s+you|how\s+(?:are\s+)?(?:you\s+)?doing|how'?s\s+it\s+going)/i,
    /^(?:thank(?:s|\s+you)|ty)/i,
    /(?:good|nice)\s+to\s+(?:meet|talk to)\s+you/i,
    
    // Farewell
    /^(?:bye|goodbye|see\s+you|talk\s+to\s+you\s+later|farewell)/i,
    
    // Small talk
    /^(?:what'?s\s+up|how'?s\s+your\s+day|how'?s\s+(?:the\s+)?weather)/i,
    /^(?:lol|haha|that'?s\s+(?:funny|interesting|cool))/i
  ];
  
  // Check if query matches any casual patterns
  return casualPatterns.some(pattern => pattern.test(query.trim()));
};
