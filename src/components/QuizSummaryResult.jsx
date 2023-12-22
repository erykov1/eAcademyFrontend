import React from "react"
import { useState, useEffect } from "react";

const QuizSummaryResult = ({ question, userAnswer }) => {
  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <div className={`quiz-summary-result ${isCorrect ? 'correct' : 'incorrect'}`}>
      <h3>Pytanie: {question.content}</h3>
      <p>Twoja odpowiedź: {userAnswer}</p>
      <p>
        Odpowiedź poprawna: <span className="correct-answer">{question.correctAnswer}</span>
      </p>
    </div>
  );
};

export default QuizSummaryResult