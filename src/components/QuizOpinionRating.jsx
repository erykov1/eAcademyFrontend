import React from "react";

const QuizOpinionRating = ({username, opinion, rating, createdAt}) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="opinion-item">
      <div className="opinion-header">
        <span className="username">{username}</span>
        <span className="timestamp">{formatDate(createdAt)}</span>
      </div>
      <div className="opinion-content">
        <p className="opinion-text">{opinion}</p>
        <div className="opinion-rating">Rating: {rating}/5</div>
      </div>
    </div>
  )
}

export default QuizOpinionRating