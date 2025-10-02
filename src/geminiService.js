import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getQuestions(exam, subject, topic) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
  Generate 5 SSC ${exam} exam multiple-choice questions for subject: ${subject}, topic: ${topic}.
  Return JSON in this exact format:

  [
    {
      "question": "string",
      "options": ["opt1", "opt2", "opt3", "opt4"],
      "answer": "correct option text",
      "explanation": "short explanation"
    }
  ]
  `;

  const result = await model.generateContent(prompt);

  try {
    // Gemini sometimes wraps JSON in markdown
    const text = result.response.text();
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch (err) {
    console.error("Error parsing Gemini response:", err);
    return [];
  }
}
