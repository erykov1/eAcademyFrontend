import React from "react"; 
import { useState } from "react";
import axios from "axios";

const AddQuiz = () => {
  const [quizName, setQuizName] = useState('')
  const [questions, setQuestions] = useState([])

  const handleAddQuiz = (event) => {
    event.preventDefault()
    axios({
      method: 'post',
      url: 'https://localhost:8080/api/auth/user/register',
      data: {
        quizName: quizName,
        questions: questions
      }
    }).then((response) => {
    }).catch((error) =>{
      console.log(error)
    })
  }

  return (
    <div className="quiz-container">
      <form>
        <div className="form-group">
          <label htmlFor="quizInput">Nazwa quizu</label>
          <input type="email" className="form-control" id="quizInput" aria-describedby="emailHelp" placeholder="Podaj nazwę quizu" onChange={(e) => setQuizName(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary" id="btn-signin">Zaloguj się</button>
      </form>
    </div>
  )
}

export default AddQuiz