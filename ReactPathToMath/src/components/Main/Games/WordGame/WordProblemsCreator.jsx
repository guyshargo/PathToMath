import React, { useEffect, useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useGrade } from '../../../Utils/GradeComponent';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const WordProblemsCreator = ({ subject, var1, var2, answer }) => {
  const { grade } = useGrade();
  const [wordProblem, setWordProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const generate = async () => {
      if (!subject || var1 == null || var2 == null || answer == null) return;

      setLoading(true);
      setWordProblem("");

const prompt = `Write a short, fun and clear math word problem for a child in grade ${grade}.
It should be about ${subject}, and use the numbers ${var1} and ${var2}.
Make sure the correct answer to the problem is ${answer}, which may be a negative number.
Do NOT include the answer. Just return the question sentence.`;

      let attempt = 0;

      while (attempt < MAX_RETRIES && !cancelled) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt
          });

          const text = response?.text?.trim();
          if (text) {
            setWordProblem(text);
            break;
          } else {
            throw new Error("Empty response from Gemini.");
          }
        } catch (err) {
          console.warn(`Attempt ${attempt + 1} failed:`, err.message);
          attempt++;
          if (attempt < MAX_RETRIES) {
            await sleep(2000); // wait 2 seconds before retrying
          } else {
            setWordProblem("⚠️ Error generating question after multiple attempts.");
          }
        }
      }

      setLoading(false);
    };

    generate();

    return () => {
      cancelled = true; // prevent state updates if unmounted
    };
  }, [subject, var1, var2, answer, grade]);

  return (
    <div className="relative max-w-2xl mx-auto mt-6">
      <div className="relative bg-white rounded-2xl overflow-hidden">
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-indigo-500 border-t-transparent"></div>
                <span className="text-gray-600 font-medium">Creating your word problem...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-indigo-400">
                <p className="text-gray-700 text-lg leading-relaxed font-medium">
                  {wordProblem || "Ready to generate a word problem!"}
                </p>
              </div>

              {subject && (
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    📚 {subject}
                  </span>
                  {var1 !== null && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      🔢 Uses {var1} & {var2}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordProblemsCreator;
