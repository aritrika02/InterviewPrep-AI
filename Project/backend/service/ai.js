
const { GoogleGenAI } = require("@google/genai");

// Initialize Gemini AI
function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  return new GoogleGenAI({ apiKey });
}

// Generate structured JSON using Gemini
async function generateJson(prompt) {
  const ai = getClient();

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.4
    }
  });

  const raw = response.text;

  if (!raw) {
    throw new Error("Gemini returned an empty response");
  }

  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");

  return JSON.parse(cleaned);
}

// Clean extracted text
function cleanText(value, max = 120) {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

// Validate and format AI-generated questions
function cleanQuestions(input) {
  if (!Array.isArray(input)) {
    throw new Error("Invalid questions array");
  }

  const seen = new Set();

  return input
    .map(item => {
      const question = cleanText(
        typeof item === "string"
          ? item
          : item?.question,
        500
      );

      const difficulty = cleanText(
        item?.difficulty,
        20
      );

      return {
        question,
        difficulty: ["Easy", "Medium", "Hard"].includes(
          difficulty
        )
          ? difficulty
          : "Medium",
        category:
          cleanText(item?.category, 50) || "General"
      };
    })
    .filter(item => {
      const key = item.question.toLowerCase();

      if (
        item.question.length < 10 ||
        seen.has(key)
      ) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .slice(0, 50);
}

module.exports = {
  generateJson,
  cleanText,
  cleanQuestions
};
