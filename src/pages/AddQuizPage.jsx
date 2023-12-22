import React from "react"; 
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/Category";

const AddQuizPage = () => {
  const [quizName, setQuizName] = useState('')
  const [category, setCategory] = useState([])
  const [assignedCategory, setAssignedCategory] = useState(0)
  const [quizId, setQuizId] = useState(0)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    handleGetCategoriesTitles()
  }, [])

  const handleCategoryChange = (event) => {
    console.log("wybor: ", event.target.value)
    const selectedCategoryId = event.target.value;
    setAssignedCategory(selectedCategoryId);
  }

  const handleSaveQuiz = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/quiz/create',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        quizName: quizName,
        questions: [],
        assignedCategory: assignedCategory
      }
    }).then((response) => {
      setQuizId(response.data.quizId)
      const quizData = {
        quizId: response.data.quizId,
        assignedCategory: assignedCategory
      };
      console.log("Przesylanie quizId i assignedCategory", quizData);
      navigate('/add-question', { state: quizData });
    }).catch((error) => {
      console.log("Nie działa request");
      console.log(error);
    });
  };

  const handleGetCategoriesTitles = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/api/category/get/all',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      setCategory(response.data)
    }).catch((error) => {
      console.log("Nie działa request");
      console.log(error);
    });
  }

  return (
    <div className="add-quiz-container">
      <div className="add-quiz">
        <h2 id="add-quiz-text">Dodaj Quiz</h2>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Nazwa quizu" id="form-add-quiz" onChange={(e) => { setQuizName(e.target.value); }}/>
        </div>
        <h3 id="add-quiz-text">Przypisz Quiz do kategorii</h3>
        <select className="form-select" aria-label="Default select example" id="form-add-quiz" onChange={handleCategoryChange}>
          {category.map((category) => (
            <option value={category.categoryId}>{category.categoryTitle}</option>
          ))}
        </select>
        <button type="button" className="btn btn-success" id="add-question-btn" onClick={handleSaveQuiz}>Utwórz quiz</button>
      </div>
    </div>
  )
}

export default AddQuizPage