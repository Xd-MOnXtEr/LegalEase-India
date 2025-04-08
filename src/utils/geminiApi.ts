
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
 * @returns A string containing the legal information response
 */
export const generateLegalResponse = async (query: string): Promise<string> => {
  try {
    // Create a specialized prompt for Indian legal context with focus on new laws
    const prompt = `
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

    const requestBody = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
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

    console.log("Sending request to Gemini API");
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
      return "I'm sorry, but I can't provide information on that topic. Please ask something else related to Indian law.";
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
