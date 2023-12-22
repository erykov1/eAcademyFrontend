import React from "react"; 
import AddQuestionsForm from "../components/AddQuestionsForm";
import { useState } from "react";
import Delete from '../assets/images/delete.png';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const AddQuestionPage = () => {
  const [forms, setForms] = useState([]);
  const [formData, setFormData] = useState([]);
  const [questionsIds, setQuestionsIds] = useState([])
  const token = localStorage.getItem('token');
  const location = useLocation()
  const { quizId, assignedCategory } = location.state;
  const navigate = useNavigate()

  useEffect(() => {
    console.log("Zaktualizowano pytania z id: ", questionsIds);
    handleAssignQuestionsToQuiz();
  }, [questionsIds]);
  
  
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
      setQuestionsIds((prevIds) => [...prevIds, ...ids]);
      handleAssignQuestionsToQuiz(event);
    }).catch((error) => {
      console.log("Nie działa request");
      console.log(error);
    });
  };

  const handleAssignQuestionsToQuiz = () => {
    axios({
      method: 'patch',
      url: `http://localhost:8080/api/quiz/patch/addQuestion/${quizId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: questionsIds
    }).then((response) => {
      console.log("Przypisano pytania do quizu ", response.data)
    }).catch((error) => {
      console.log("Nie działa request przypisania pytan do quizu", questionsIds);
      console.log(error);
    });
  }

  const handleAssignAndSave = (event) => {
    handleSaveQuestions(event);
  };

  return (
    <div>
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
  );
};

export default AddQuestionPage;