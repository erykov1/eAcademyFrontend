import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  let navigate = useNavigate()

  return (
    <div className="home-page-container">
      <div className="home-page-header">
        <p id="home-page-header-text">Świat wiedzy czeka na Ciebie! <br/>
        Podnieś swoje kwalifikacje dzięki interaktywnym kursom w formie quizów</p>
      </div>
      <div className="home-page-section">
        <p id="home-page-section-text">
        Dołącz do naszej społeczności zacznij zdobywać wiedzę!
        </p>
        <button type="button" class="btn btn-success" id="btn-home-page" onClick={() => navigate('/signup')}>Załóż konto</button>
      </div>
    </div>
  )
}

export default HomePage;