import React from "react"; 
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddCategoryPage = () => {
  const [categoryTitle, setCategoryTitle] = useState('')
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token])

  const handleSaveCategory = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/category/create',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        categoryTitle: categoryTitle
      }
    }).then((response) => {
      navigate('/')
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="add-category-container">
      <h2 id="add-quiz-text">Dodaj Kategorię</h2>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Nazwa kategorii" id="form-add-quiz" onChange={(e) => { setCategoryTitle(e.target.value); }}/>
      </div>
      <button type="button" className="btn btn-success" id="add-question-btn" onClick={handleSaveCategory}>Utwórz kategorię</button>
    </div>
  )
}

export default AddCategoryPage