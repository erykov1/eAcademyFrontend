import React from "react"; 
import { useState, useEffect } from "react";
import '../components/QuestionDetails';
import QuestionDetails from "../components/QuestionDetails";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [result, setResult] = useState(0);
  const [questionsNumber, setQuestionsNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const { quizId } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    getQuiz();
  }, []);

  const getQuiz = () => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/quiz/get/${quizId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        setQuiz(response.data);
        const questionIds = response.data.questions.map(question => question);
        findAllQuestionsFromGivenQuiz(questionIds);
      })
      .catch((error) => {
        console.log("Nie działa request");
        console.log(error);
      });
  };
  
  const findAllQuestionsFromGivenQuiz = (questionIds) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/question/get/questions/ids',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: questionIds
    })
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleAnswerClick = (selectedAnswerIndex) => {
    setQuestionsNumber(questions.length);
    if (questions.length === 0 || currentQuestionIndex >= questions.length) {
      console.error("Brak danych quizu lub błędny indeks pytania");
      return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerCorrect = selectedAnswerIndex === currentQuestion?.correctAnswer;
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswerIndex]);
    setIsCorrect(isAnswerCorrect);
    setResult((prevResult) => {
      if (isAnswerCorrect) {
        return prevResult + 1;
      }
      return prevResult;
    });
    
    // Przekieruj do ekranu koncowego tylko po zakończeniu quizu
    if (currentQuestionIndex === questions.length - 1) {
      const timeoutId = setTimeout(() => {
        navigate('/quiz/end-quiz', { state: { result, questionsNumber, userAnswers, questions, quizId } });
      }, 2000);
      return () => clearTimeout(timeoutId);
    }

    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
    
    setIsCorrect(null);
  };

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

  return (
    <div className="quiz-page-contaier">
      {currentQuestion && (
        <QuestionDetails
          key={currentQuestion.id}
          question={currentQuestion.content}
          answerA={currentQuestion.answerA}
          answerB={currentQuestion.answerB}
          answerC={currentQuestion.answerC}
          answerD={currentQuestion.answerD}
          correctAnswer={currentQuestion.correctAnswer}
          handleClick={handleAnswerClick}
          isCorrect={isCorrect}
        />
      )}
    </div>
  );
}


export default QuizPage;