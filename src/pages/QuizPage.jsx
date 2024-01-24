import React from "react"; 
import { useRef, useState, useEffect } from "react";
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
  const userAnswersRef = useRef([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/")
    }
    getQuiz();
    userAnswersRef.current = userAnswers;
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
      return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerCorrect = selectedAnswerIndex === currentQuestion?.correctAnswer;
    userAnswersRef.current = [...userAnswersRef.current, selectedAnswerIndex];
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswerIndex]);
    setIsCorrect(isAnswerCorrect); 
    const updatedResult = isAnswerCorrect ? result + 1 : result;
    setResult(updatedResult);
    if (currentQuestionIndex === questions.length - 1) {
      const timeoutId = setTimeout(() => {
        navigate('/quiz/end-quiz', {
          state: { updatedResult, questionsNumber, userAnswers: userAnswersRef.current, questions, quizId },
        });
      }, 1000);
  
      return () => clearTimeout(timeoutId);
    }
    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) =>
        prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
      );
      setIsCorrect(null); 
    }, 1000);
  };

  const currentQuestion = questions.length > 0 ? questions[currentQuestionIndex] : null;

  return (
    <div className="quiz-page-container">
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