import React from "react"; 
import { Link } from 'react-router-dom';

const Quiz = ({quizId, quizName}) => {

  return (
    <div className="quiz-container">
      <Link to={`/quiz/details/${quizId}`} className="quiz-btn">
        {quizName}
      </Link>
    </div>
  )
}

export default Quiz