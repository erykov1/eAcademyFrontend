import React, { useState, useEffect } from "react"; 

const QuestionDetails = ({ question, answerA, answerB, answerC, answerD, correctAnswer, handleClick }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (selected) => {
    if (!isAnswered) {
      setSelectedAnswer(selected);
      setIsAnswered(true);
      handleClick(selected);
    }
  };

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question]);

  return (
    <div className="question-details-container">
      <div className="question-answer-container">
        <div className="question-section">
          {question}
        </div>
        <div className="answers-section">
          <button type="button" class="btn btn-primary" id="btn-answer" onClick={() => handleAnswerClick(answerA)}>{answerA}</button>
          <button type="button" class="btn btn-primary" id="btn-answer" onClick={() => handleAnswerClick(answerB)}>{answerB}</button>
        </div>
        <div className="answers-section">
          <button type="button" class="btn btn-primary" id="btn-answer" onClick={() => handleAnswerClick(answerC)}>{answerC}</button>
          <button type="button" class="btn btn-primary" id="btn-answer" onClick={() => handleAnswerClick(answerD)}>{answerD}</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;