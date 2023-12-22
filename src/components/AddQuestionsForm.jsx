import React from "react"; 
import { useState, useEffect } from "react";
import axios from "axios";

const AddQuestionsForm = ({index, onDataChange}) => {
  const [question, setQuestion] = useState('')
  const [answerA, setAnswerA] = useState('')
  const [answerB, setAnswerB] = useState('')
  const [answerC, setAnswerC] = useState('')
  const [answerD, setAnswerD] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [isCollapsed, setCollapsed] = useState(false)

  const handleCollapse = () => {
    setCollapsed(!isCollapsed)
  }

  useEffect(() => {
    const formData = {
      question,
      answerA,
      answerB,
      answerC,
      answerD,
      correctAnswer,
    };
    onDataChange(formData);
  }, [question, answerA, answerB, answerC, answerD, correctAnswer]);


  return (
    <div className="add-questions-form-container">
      <div className="add-questions-btns">
        <button
          type="button"
          className="btn btn-primary"
          id="toggle-collapse-btn"
          onClick={handleCollapse}
        >
          {isCollapsed ? "Rozwiń" : "Zwiń"}
        </button>
      </div>
  
      {!isCollapsed && (
        <div className={`collapsed-content ${isCollapsed ? "d-none" : ""}`}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Treść pytania" id="form-add-question" onChange={(e) => { setQuestion(e.target.value); }}/>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Odpowiedź A" id="form-add-question" onChange={(e) => { setAnswerA(e.target.value); }}/>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Odpowiedź B" id="form-add-question" onChange={(e) => { setAnswerB(e.target.value); }}/>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Odpowiedź C" id="form-add-question" onChange={(e) => { setAnswerC(e.target.value); }}/>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Odpowiedź D" id="form-add-question" onChange={(e) => { setAnswerD(e.target.value); }}/>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Poprawna odpowiedź" id="form-add-question" onChange={(e) => { setCorrectAnswer(e.target.value); }}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddQuestionsForm;