import React from 'react';

function QuestionBox({ question, userAnswer, setUserAnswer, onSubmit }) {
  // Handle form submission when user presses Enter or clicks the button
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {/* Display the current question */}
      <div className="text-2xl font-medium mb-2">Question: {question}</div>

      {/* Input field for the user's answer */}
      <input
        type="text"
        value={userAnswer}
        onChange={(event) => setUserAnswer(event.target.value)}
        className="border p-2 rounded mr-2"
        autoFocus
      />

      {/* Submit button */}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}

export default QuestionBox;
