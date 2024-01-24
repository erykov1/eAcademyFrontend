import React from "react"; 
import { useState, useEffect } from "react";
import axios from "axios";

const UserRatings = ({quizId}) => {
  const [ratings, setRatings] = ([])
  const token = localStorage.getItem('token');

  useEffect(() => {
    getRatings()
  }, [])

  const getRatings = (event) => {
    event.preventDefault()
    axios({
      method: 'get',
      url: `http://localhost:8080/api/quiz/rating/details/${quizId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      setRatings(response.data)
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="user-ratings-container">
      {ratings.map((rating, index) => (
        <div key={index}>
          <p>Rating: {rating}</p>
          <p>Opinion: {ratings.opinions[index]}</p>
          <p>Created At: {new Date(ratings.createdAt[index]).toLocaleString()}</p>
          <p>Username: {ratings.usernames[index]}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default UserRatings