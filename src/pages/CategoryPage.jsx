import React from "react";
import Category from "../components/Category";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Quiz from "../components/Quiz";

const CategoryPage = () => {
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState(0)
  const [quizzes, setQuizzes] = useState([])
  const token = localStorage.getItem('token');

  useEffect(() => {
    handleGetAllCategories()
    console.log("kategorie: ", categories)
  }, [])

  const handleGetAllCategories = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/api/category/get/all',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      setCategories(response.data)
    }).catch((error) => {
      console.log("Nie działa request");
      console.log(error);
    });
  }

  const handleGetQuizzesForCategory = (categoryId) => {
    console.log("wybor quizu z id: ", categoryId);
    axios({
        method: 'get',
        url: `http://localhost:8080/api/quiz/get/assigned/${categoryId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        setQuizzes(response.data);
    }).catch((error) => {
        console.log("Nie działa request");
        console.log(error);
    });
  };

  const handleCategoryClick = (categoryId) => {
    setCategoryId(categoryId);
    handleGetQuizzesForCategory(categoryId);
  }

  return (
    <div className="category-page-container">
      <div className="category-page-categories">
        {categories.map((category, index) => (
          <div key={index}>
            <Category
              categoryName={category.categoryTitle}
              categoryId={category.categoryId}
              onClick={handleCategoryClick}
            />
          </div>
        ))}
      </div>
      <div className="separator" />
      <div className="category-section">
        {quizzes.map((quiz) => (
          <div key={quiz.quizId}>
            <Quiz quizName={quiz.quizName} quizId={quiz.quizId} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryPage;