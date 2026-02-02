
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, RiskAssessmentData } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeLungScan = async (base64Image: string): Promise<AnalysisResult> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Analyze this chest X-ray or CT scan image for potential indicators of lung cancer or other pulmonary abnormalities.
    
    CRITICAL: This is for educational and screening assistance purposes only.
    
    Structure your response as JSON with:
    - summary: A brief 2-sentence overview.
    - findings: A list of specific observations (e.g., nodules, pleural effusion, opacities).
    - recommendations: Suggested next steps (e.g., consult oncologist, follow-up CT).
    - disclaimer: A strong medical disclaimer.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          findings: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          disclaimer: { type: Type.STRING }
        },
        required: ["summary", "findings", "recommendations", "disclaimer"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const assessRisk = async (data: RiskAssessmentData): Promise<string> => {
  const model = 'gemini-3-pro-preview';
  
  const prompt = `
    Conduct a detailed lung cancer risk assessment based on the following patient data:
    Age: ${data.age}
    Smoking Status: ${data.smokingStatus}
    Pack Years (if applicable): ${data.packYears}
    Family History: ${data.familyHistory ? 'Yes' : 'No'}
    Symptoms: ${data.symptoms.join(', ') || 'None reported'}
    Occupational Hazards: ${data.occupationalHazards.join(', ') || 'None reported'}

    Provide a professional, empathetic analysis. Mention specific risk factors from medical literature (like USPSTF screening guidelines).
    Include a clear section on whether they might qualify for LDCT screening.
    Always include a disclaimer that this is not a medical diagnosis.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      temperature: 0.7,
    }
  });

  return response.text || "Unable to generate assessment.";
};

export const getLungCancerInfo = async (query: string): Promise<{text: string, sources: any[]}> => {
  const model = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: `Provide up-to-date medical information about: ${query}. Use search grounding for accuracy.`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return {
    text: response.text || "Information unavailable.",
    sources
  };
};
