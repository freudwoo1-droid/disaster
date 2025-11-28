'use server';

import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

export async function getDisasterGuidanceAction(userMessage: string): Promise<string> {
  // Server-side environment variable access (Secure)
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.error("API_KEY is missing on server");
    return "시스템 오류: API 키가 설정되지 않았습니다. 관리자에게 문의하세요.";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.5,
      },
    });

    return response.text || "죄송합니다. 답변을 생성할 수 없습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "통신 오류가 발생했습니다. 잠시 후 다시 시도해주시거나, 즉시 119 또는 관할 구청에 문의하십시오.";
  }
}