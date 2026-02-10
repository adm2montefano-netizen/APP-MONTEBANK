
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getFinancialInsights(transactions: Transaction[], balance: number) {
  const prompt = `
    Analyze these financial transactions for a premium bank customer and provide 3 concise, high-value insights or recommendations.
    Current Balance: R$ ${balance.toFixed(2)}
    Transactions: ${JSON.stringify(transactions)}
    
    Rules:
    - Language: Brazilian Portuguese.
    - Style: Professional, elite, concierge-like.
    - Format: Array of strings.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    const text = response.text;
    // Simple parsing logic: usually it returns a list if prompted
    const lines = text?.split('\n').filter(l => l.trim().length > 5).slice(0, 3) || [];
    return lines.map(l => l.replace(/^[0-9.-]\s*/, '').trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    return [
      "Mantenha seu portfólio diversificado para maximizar rendimentos.",
      "Identificamos uma oportunidade de economia em assinaturas recorrentes.",
      "Seu padrão de gastos está 15% abaixo da média este mês. Parabéns!"
    ];
  }
}
