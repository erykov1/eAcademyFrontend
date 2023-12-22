import React from "react"; 

const QuizDetails = ({quizId, quizName, userRatings}) => {

  return (
    <div className="quiz-details-container">
      <div className="quiz-details-quizname">
        {quizName}
      </div>
      <div className="quiz-details-ratings">
        {userRatings}
      </div>
    </div>
  )
}

export default QuizDetails