import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import QuizOpinionRating from "../components/QuizOpinionRating";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const QuizDetailsPage = () => {
  const [quizDetails, setQuizDetails] = useState([])
  const [avgRating, setAvgRating] = useState(0)
  const [quizInfo, setQuizInfo] = useState()
  const [questionsNumber, setQuestionsNumber] = useState(0)
  const token = localStorage.getItem('token');
  let decodedToken = token ? jwtDecode(token) : null;
  let userRole = decodedToken ? decodedToken.role : null;
  const isAdmin = decodedToken?.role === 'ADMIN';
  const { quizId } = useParams() 
  const navigate = useNavigate();

  useEffect(() => {
    getQuizDetails()
    getQuizAvgRating()
    getQuizInfo()
  }, [])

  const getQuizDetails = () => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/quiz/rating/ratings/${quizId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      setQuizDetails(response.data)
    }).catch((error) => {
      console.log(error);
    });
  }

  const getQuizAvgRating = () => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/quiz/rating/average/${quizId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      setAvgRating(response.data)
      console.log("Id quizu : ", quizId, " ocena quizu: ", response.data)
    }).catch((error) => {
      console.log(error);
    });
  }

  const getQuizInfo = () => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/quiz/get/${quizId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      setQuizInfo(response.data)
      setQuestionsNumber(response.data.questions ? response.data.questions.length : 0)
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="quiz-details-page-container">
      <div className="quiz-details-header">
        {quizInfo && (
          <>
            <h2 className="quiz-name">{quizInfo.quizName}</h2>
            <p className="question-count">Liczba pytań: {questionsNumber}</p>
            <p className="question-count">Średnia ocena quizu: {avgRating.quizRating}</p>
          </>
        )}
        <button type="button" class="btn btn-primary" id="resolve-quiz" onClick={() => navigate(`/quiz/game/${quizId}`)}>Rozwiąż Quiz</button>
        {isAdmin && (
          <button
            type="button"
            className="btn btn-warning"
            id="resolve-quiz"
            onClick={() => navigate(`/quiz/edit/${quizId}`)}
          >
            Edytuj pytania
          </button>
        )}
      </div>
      {quizDetails.map((opinion, index) => (
        <QuizOpinionRating
          key={opinion.quizRatingId}
          username={opinion.username}
          opinion={opinion.opinion}
          rating={opinion.rating}
          createdAt={opinion.createdAt}
        />
      ))}
    </div>
  )
}

export default QuizDetailsPage