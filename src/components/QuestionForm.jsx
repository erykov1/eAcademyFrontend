import React, {useState, useEffect} from "react";
import axios from "axios";

const QuestionForm = ({questionId, onDataChange, questionData, onDelete}) => {
  const [question, setQuestion] = useState(questionData ? questionData.content : '');
  const [answerA, setAnswerA] = useState(questionData ? questionData.answerA : '');
  const [answerB, setAnswerB] = useState(questionData ? questionData.answerB : '');
  const [answerC, setAnswerC] = useState(questionData ? questionData.answerC : '');
  const [answerD, setAnswerD] = useState(questionData ? questionData.answerD : '');
  const [correctAnswer, setCorrectAnswer] = useState(questionData ? questionData.correctAnswer : '');
  const [isCollapsed, setCollapsed] = useState(false);
  const token = localStorage.getItem("token")

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

  const editQuestion = () => {
    console.log("Id pytania edytowanego: ", questionId)
    axios({
      method: 'patch',
      url: `http://localhost:8080/api/question/edit/${questionId}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        content: question,
        answerA: answerA,
        answerB: answerB,
        answerC: answerC,
        answerD: answerD,
        correctAnswer: correctAnswer
      }
    }).then((response) => {
      
    }).catch((error) =>{
      console.log(error)
    })
  }

  const handleCollapse = () => {
    setCollapsed(!isCollapsed);
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
            <input type="text" className="form-control" placeholder="Treść pytania" id="form-add-question" value={question} onChange={(e) => { setQuestion(e.target.value); }} />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Odpowiedź A" id="form-add-question" value={answerA} onChange={(e) => { setAnswerA(e.target.value); }} />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Odpowiedź B" id="form-add-question" value={answerB} onChange={(e) => { setAnswerB(e.target.value); }} />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Odpowiedź C" id="form-add-question" value={answerC} onChange={(e) => { setAnswerC(e.target.value); }} />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Odpowiedź D" id="form-add-question" value={answerD} onChange={(e) => { setAnswerD(e.target.value); }} />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Poprawna odpowiedź" id="form-add-question" value={correctAnswer} onChange={(e) => { setCorrectAnswer(e.target.value); }} />
          </div>
          <button type="button" class="btn btn-primary" onClick={editQuestion}>Zapisz zmiany</button>
        </div>
      )}
    </div>
  );
}

export default QuestionForm