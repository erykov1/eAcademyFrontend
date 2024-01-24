import React from "react"; 
import { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';

const CreateQuizRating = ({quizId}) => {
  const [rating, setRating] = useState(0)
  const [opinion, setOpinion] = useState('')
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const username = decodedToken.sub;

  const handleAddQuizRating = (event) => {
    event.preventDefault()
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/quiz/rating/create',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        rating: rating,
        opinion: opinion,
        username: username,
        quizId: quizId
      }
    }).then((response) => {
    }).catch((error) =>{
      console.log(error)
    })
  }

  return (
    <div className="create-quiz-rating-container">
      <p>Możesz podzielić się swoją opinią na temat quizu</p>
      <form class="row gy-2 gx-3 align-items-center">
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">Twoja opinia</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setOpinion(e.target.value)}></textarea>
        </div>
        <div class="col-auto">
          <label class="visually-hidden" for="autoSizingSelect">Ocena quizu</label>
          <select class="form-select" id="autoSizingSelect" onChange={(e) => setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary" onClick={handleAddQuizRating} id="btn-submit-opinion">Wyślij</button>
        </div>
      </form>
    </div>  
  )
}

export default CreateQuizRating