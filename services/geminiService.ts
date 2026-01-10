import { GoogleGenAI } from "@google/genai";
import { UserRole } from "../types";

// Initialize Gemini
// NOTE: In a real app, do not expose API keys on the client side.
// This is for a hackathon prototype running locally or in a secure sandbox.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAIResponse = async (
  query: string,
  userRole: UserRole,
  contextData: any
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // Construct a context-aware system instruction
    const systemInstruction = `
      You are TrustRent AI, an intelligent assistant for a rental management platform.
      
      User Role: ${userRole}
      
      Current Data Context (JSON):
      ${JSON.stringify(contextData, null, 2)}
      
      Instructions:
      1. Answer questions concisely based strictly on the provided data context.
      2. If you are a Landlord, you care about rent collection, occupancy, and tenant risk.
      3. If you are a Tenant, you care about due dates, credit scores, and payment history.
      4. If the user asks about something not in the data, politely say you don't have that info.
      5. Keep answers short and professional.
      6. If asked about credit score logic: "On-time payments increase score by ~5-10 points. Late payments decrease it by ~15-20 points."
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: query,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the AI service right now. Please try again later.";
  }
};
