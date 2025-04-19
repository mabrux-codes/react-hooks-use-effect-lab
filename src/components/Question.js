import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Set up the timer to decrease timeRemaining by 1 every second
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          // When timeRemaining hits 0, reset to 10 and call onAnswered(false)
          onAnswered(false);
          return 10;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]); // Dependencies: timeRemaining and onAnswered

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
