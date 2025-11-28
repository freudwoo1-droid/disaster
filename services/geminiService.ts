import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const getDisasterGuidance = async (userMessage: string): Promise<string> => {
  try {
    const client = getAI();
    
    // Using a chat model for conversational context if needed, but generateContent works well for Q&A
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7, // Slightly lower temperature for more stable/reliable advice
      },
    });

    return response.text || "죄송합니다. 현재 연결 상태가 불안정하여 답변을 생성할 수 없습니다. 안전한 곳으로 대피 후 다시 시도해주세요.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "통신 오류가 발생했습니다. 잠시 후 다시 시도해주시거나, 즉시 119 또는 관할 구청에 문의하십시오.";
  }
};
