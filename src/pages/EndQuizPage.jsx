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
  const [summaryText, setSummaryText] = useState('')
  const [summaryResult, setSummaryResult] = useState('')

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
    if (!localStorage.getItem("token")) {
      navigate("/")
    }
    if (location.state && location.state.userAnswers
      && location.state.questions && location.state.quizId) {
      setResult(location.state.updatedResult);
      setQuestionsNumber(location.state.questionsNumber)
      setUserAnswers(location.state.userAnswers)
      setQuestions(location.state.questions)
      setQuizId(location.state.quizId)
      handleSummaryText()
      handleSummaryResult()
    }
  }, [location.state]);

  const handleSummaryText = () => {
    if (result >= 5 || result == 0) {
      setSummaryText("pytań")
    } else {
      setSummaryText("pytania")
    }
  }

  const handleSummaryResult = () => {
    if (result >= 5 || result === 0) {
      setSummaryResult("poprawnych odpowiedzi")
    } else if (result < 5 && result > 1) {
      setSummaryResult("poprawne odpowiedzi")
    } else {
      setSummaryResult("poprawną odpowiedź")
    }
  }

  return (
    <div className="end-quiz-page-container">
      <div className="end-quiz-section">
        <div>
          <p id="end-quiz-section-text">Ukończyłeś Quiz</p>
          <p id="end-quiz-summary-text">Na {questionsNumber} {summaryText} udzieliłeś {result} {summaryResult}</p>
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