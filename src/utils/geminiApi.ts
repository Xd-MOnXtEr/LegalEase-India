
const GEMINI_API_KEY = "AIzaSyCbSm3GuiDZHq9rIQc4rq7NFbLeXjpQDVA";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
  promptFeedback?: {
    blockReason?: string;
  };
}

export const generateLegalResponse = async (query: string): Promise<string> => {
  try {
    const prompt = `You are a legal assistant specializing in Indian law. Provide accurate and helpful information based on the following query. If you don't know the answer, be honest about it. Keep responses concise and focused on Indian legal context. Query: ${query}`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
      }),
    });

    if (!response.ok) {
      console.error("Error response from Gemini API:", response.status, response.statusText);
      return "I'm having trouble connecting to my knowledge base right now. Please try again later.";
    }

    const data = await response.json() as GeminiResponse;
    console.log("Gemini API response:", data);

    if (data.promptFeedback?.blockReason) {
      console.error("Content blocked:", data.promptFeedback.blockReason);
      return "I'm sorry, but I can't provide information on that topic. Please ask something else related to Indian law.";
    }

    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content?.parts?.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Unexpected response structure:", data);
      return "I couldn't generate a response for that query. Please try asking something else about Indian law.";
    }
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return "I'm experiencing technical difficulties. Please try again later.";
  }
};
