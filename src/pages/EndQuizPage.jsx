import React from "react"; 
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import CreateQuizRating from "../components/CreateQuizRating";
import QuizSummaryResult from "../components/QuizSummaryResult";

const EndQuizPage = () => {
  const location = useLocation();
  const [result, setResult] = useState(0);
  const [questionsNumber, setQuestionsNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [questions, setQuestions] = useState([])
  const navigate = useNavigate();
  const [isCollapsed, setCollapsed] = useState(false)
  const [quizId, setQuizId] = useState(0)

  const handleCollapse = () => {
    setCollapsed(!isCollapsed)
  }

  const renderQuizSummaryResults = () => {
    if (isCollapsed) {
      return null; 
    }

    return questions.map((question, index) => (
      <QuizSummaryResult key={index} question={question} userAnswer={userAnswers[index]} />
    ));
  };

  useEffect(() => {
    if (location.state && location.state.result && location.state.userAnswers 
      && location.state.questions && location.state.quizId) {
      setResult(location.state.result);
      setQuestionsNumber(location.state.questionsNumber)
      setUserAnswers(location.state.userAnswers)
      setQuestions(location.state.questions)
      setQuizId(location.state.quizId)
    }
  }, [location.state]);

  return (
    <div className="end-quiz-page-container">
      <div className="end-quiz-section">
        <div>
          <p id="end-quiz-section-text">Ukończyłeś Quiz</p>
          Na {questionsNumber} pytań udzieliłeś {result} poprawnych odpowiedzi
          Twój wynik z quizu to: {result}
        </div>
        <div className="btn-section-end-quiz">
          <button type="button" className="btn btn-primary" id="btn-end-quiz" onClick={() => navigate("/")}>Powrót do menu</button>
        </div>
        <CreateQuizRating quizId={quizId}/>
      </div>
      <div className="quiz-summary-container">
        <h3>Podsumowanie quizu</h3>
        <button
            type="button"
            className="btn btn-primary"
            id="toggle-collapse-btn"
            onClick={handleCollapse}
        >
          {isCollapsed ? "Rozwiń" : "Zwiń"}
        </button>
        {renderQuizSummaryResults()}
      </div>
    </div>
  );
}

export default EndQuizPage;