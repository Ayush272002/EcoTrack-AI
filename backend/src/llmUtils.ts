import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_MODEL = "gemini-2.5-flash";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMNI_API_KEY || "",
});

export async function generateText(prompt: string): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    return response.text || null;
  } catch (error) {
    console.error("Error generating text:", error);
    return null;
  }
}

export async function generateTextWithContext(
  prompt: string,
  context: string
): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: `${prompt}\n\n${context}`,
    });

    const generatedText = response.text || null;
    console.log("Generated text with context:", generatedText);

    return generatedText;
  } catch (error) {
    console.error("Error generating text with context:", error);
    return null;
  }
}
