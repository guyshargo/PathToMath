import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useGrade } from '../../Utils/GradeComponent.jsx';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // תעדיפי להשתמש ב-VITE_ אם את עם Vite
const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

const WordProblemsCreator = ({ var1, var2, answer, subject }) => {
  const { grade } = useGrade();
  const [wordProblem, setWordProblem] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generateWordProblem = async () => {
      setLoading(true);
      const model = ai.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
You are a math teacher for elementary school for grade ${grade}.
Create a simple, clear word problem for ${subject.toLowerCase()} using the following variables:
- First number: ${var1}
- Second number: ${var2}
- Answer: ${answer}
dont tell them the answer, just give them the question
The question must match the ${subject.toLowerCase()} operation, and be phrased naturally like a story but not too long.
Only return the question sentence.
      `;

      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        setWordProblem(text.trim());
      } catch (error) {
        console.error("Error generating word problem:", error);
        setWordProblem("Failed to generate word problem.");
      }
      setLoading(false);
    };

    if (var1 && var2 && answer && subject) {
      generateWordProblem();
    }
  }, [var1, var2, answer, subject]);

  return (
    <div className="p-4 background border rounded bg-white shadow-md max-w-xl mx-auto mt-4">
      <h2 className="text-lg font-bold mb-2">Word Problem</h2>
      {loading ? (
        <p>Generating question...</p>
      ) : (
        <p>{wordProblem}</p>
      )}
    </div>
  );
};

export default WordProblemsCreator;
