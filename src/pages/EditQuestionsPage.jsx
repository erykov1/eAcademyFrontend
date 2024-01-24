import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AddQuestionsForm from "../components/AddQuestionsForm";
import Delete from '../assets/images/delete.png';
import QuestionForm from "../components/QuestionForm";

const EditQuestionsPage = () => {
  const [questionsIds, setQuestionsIds] = useState([])
  const [ids, setIds] = useState([])
  const [questions, setQuestions] = useState([])
  const [forms, setForms] = useState([]);
  const [formData, setFormData] = useState([]);
  const {quizId} = useParams()
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  useEffect(() => {
    if(!localStorage.getItem("token")) {
      navigate("/")
    }
    getQuizQuestionsIds()
  }, [])

  const getQuizQuestionsIds = () => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/quiz/get/${quizId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      const quizQuestions = response.data.questions;
      if (quizQuestions && quizQuestions.length > 0) {
        setQuestionsIds(quizQuestions);
        getQuizQuestions(quizQuestions);
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  
  const getQuizQuestions = (questions) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/question/get/questions/ids',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: questions
    }).then((response) => {
      setQuestions(response.data);
    }).catch((error) =>{
      console.log(error);
    });
  }

  const handleAddQuestion = () => {
    setForms([...forms, {}]); 
  };

  const handleDeleteQuestion = (index) => {
    const updatedForms = [...forms];
    updatedForms.splice(index, 1);
    setForms(updatedForms);
  };  

  const handleFormDataChange = (index, data) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = data;
    setFormData(updatedFormData);
  };

  const handleSaveQuestions = (event) => {
    event.preventDefault();
    const preparedData = Object.values(formData).map((data) => ({
      content: data.question,
      answerA: data.answerA,
      answerB: data.answerB,
      answerC: data.answerC,
      answerD: data.answerD,
      correctAnswer: data.correctAnswer,
    }));    
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/question/add/all',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: preparedData,
    }).then((response) => {
      const ids = response.data.map((data) => data.questionId)
      setIds(questionsIds)
      setIds((prevIds) => [...prevIds, ...ids]);
      handleAssignQuestionsToQuiz(event);
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleAssignQuestionsToQuiz = (event) => {
    event.preventDefault()
    axios({
      method: 'patch',
      url: `http://localhost:8080/api/quiz/patch/addQuestion/${quizId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: ids
    }).then((response) => {
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleAssignAndSave = (event) => {
    handleSaveQuestions(event);
  };

  return (
    <div className="edit-questions-page-container">
      {questions.map((form, index) => (
        <div key={index}>
          <QuestionForm
            index={form.questionId}
            questionId={form.questionId}
            onDataChange={(data) => handleFormDataChange(index, data)}
            questionData={form}
          />
        </div>
      ))}
      <button type="button" className="btn btn-primary" id="add-question-btn" onClick={handleAddQuestion}>Dodaj pytanie</button>
      {forms.map((form, index) => (
        <div key={index}>
          <AddQuestionsForm
            index={index}
            onDataChange={(data) => handleFormDataChange(index, data)}
            onDelete={handleDeleteQuestion}
          />
          <button className="delete-btn" onClick={() => handleDeleteQuestion(index)}><img src={Delete} alt="Delete image" /></button>
        </div>
      ))}
      <button type="button" className="btn btn-success" id="add-question-btn" onClick={handleAssignAndSave}>Zapisz pytania</button>
    </div>
  )
}

export default EditQuestionsPage