
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

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response from Gemini API:", response.status, response.statusText, errorText);
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json() as GeminiResponse;
    
    if (data.promptFeedback?.blockReason) {
      console.error("Content blocked:", data.promptFeedback.blockReason);
      return "I'm sorry, but I can't provide information on that topic. Please ask something else related to Indian law.";
    }

    if (!data.candidates || data.candidates.length === 0) {
      console.error("No candidates in response:", data);
      throw new Error("No response candidates received");
    }

    if (!data.candidates[0].content?.parts || data.candidates[0].content.parts.length === 0) {
      console.error("No content parts in response:", data);
      throw new Error("Invalid response structure");
    }

    return data.candidates[0].content.parts[0].text;
    
  } catch (error) {
    console.error("Error with Gemini API:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
