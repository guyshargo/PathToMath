import React from 'react';
// json of questions 
export const questions = {
    // Define templates for different subjects
    // Each subject has positive and negative templates
  addition: {
    positive: "Liam has ${var1} apples and gets ${var2} more. How many apples now?",
    negative: "Liam had ${var1} apples but lost ${var2}. How many left?"
  },
  subtraction: {
    positive: "Emma had ${var1} candies and gave ${var2} away. How many left?",
    negative: "Emma wants to give ${var2} candies but has ${var1}. How many more she needs?"
  },
  multiplication: {
    positive: "There are ${var1} boxes with ${var2} toys each. How many toys total?",
    negative: "A bug removed ${var1} boxes with ${var2} toys. How many lost?"
  },
  division: {
    positive: "You have ${var1} marbles and ${var2} kids. How many per kid?",
    negative: "Need ${var2} parts, only have ${var1}. What is the shortage per part?"
  },
  percentage: {
    positive: "${var2} out of ${var1} students did homework. What percent is that?",
    negative: "${var2} out of ${var1} failed. What is the failure percentage?"
  }
};

const getFallbackQuestion = (subject, var1, var2, answer) => {
  const templates = questions[subject];
  if (!templates) return "No template found for subject.";
  const type = answer >= 0 ? "positive" : "negative";
  const template = templates[type];
  return template.replace("${var1}", var1).replace("${var2}", var2);
};

export const FallbackWordProblem = ({ subject, var1, var2, answer }) => {
  const question = getFallbackQuestion(subject, var1, var2, answer);
  return <div>{question}</div>;
};

export default { FallbackWordProblem };