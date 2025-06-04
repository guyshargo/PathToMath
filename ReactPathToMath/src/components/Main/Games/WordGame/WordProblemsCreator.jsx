import React, { useEffect, useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useGrade } from '../../../Utils/GradeComponent';
import FallbackWordProblem from './FallBackQuestions';
import questions from './FallBackQuestions';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const WordProblemsCreator = ({ subject, var1, var2, answer }) => {
  const { grade } = useGrade();
  const [wordProblem, setWordProblem] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //flag for generating question
    let cancelled = false;
    //generate question function
    const generate = async () => {
      //vars validation
      if (!subject || var1 == null || var2 == null || answer == null) return;
      //set loading to true
      setLoading(true);
      //set the word to be empty
      setWordProblem("");
      //prompt for giving question
      const prompt = `Here are two example word problems:
      Positive answer exmple: "${questions[subject]?.positive}"
      Negative answer exmple: "${questions[subject]?.negative}"
      Now, write a new short, fun, and clear math word problem for a child in grade ${grade}.
      It should be about ${subject}, using the numbers ${var1} and ${var2}.
      Make sure the correct answer is ${answer}, which may be a negative number.
      Do NOT include the answer — just the question sentence.
      Match the tone and structure of the examples above.`

      try {
        //getting response from gemini api
        const response = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: prompt,
        });
        //if question wasnt already generated
        if (!cancelled) {
          const text = response?.text?.trim();
          setWordProblem(text || "error");
        }

      } catch (error) {
        //gemini couldnt generate question
        console.warn("Gemini error", error.message);
        //set the question as error to give default question from json
        if (!cancelled) setWordProblem("error");
      }
      //if not canceleed set to false
      if (!cancelled) setLoading(false);
    };
    //generate questiom
    generate();

    return () => {
      //return cancelled for stopping to generate question
      cancelled = true;
    };
  }, [subject, var1, var2, answer, grade]);


  return (
    <div className="w-full mt-6">
      <div className="relative overflow-hidden m-full">
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-indigo-500 border-t-transparent"></div>
                <span className="text-gray-600 font-medium">generating problem...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4  w-full">
              <div className="  w-full rounded-xl ">
                <p className="w-full text-gray-700 text-lg lg:text-xl leading-relaxed font-medium">
                  {wordProblem != "error" ? wordProblem : <FallbackWordProblem subject={subject} var1={var1} var2={var2} answer={answer} />}
                </p>
              </div>

              {subject && (
                <div className="flex flex-wrap gap-2 pt-2">
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
