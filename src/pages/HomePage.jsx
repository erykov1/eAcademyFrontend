import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  let navigate = useNavigate()

  return (
    <div className="home-page-container">
      <div className="home-page-header">
        <p id="home-page-header-text">Świat wiedzy czeka na Ciebie! <br/>
        Rozpocznij swoją podróż nauki dzięki interaktywnym kursom w formie quizów</p>
      </div>
      <div className="home-page-section">
        <p id="home-page-section-text">
        Rozpocznij swoją podróż dziś i odkryj, jak nasze kursy w formie quizów mogą zmienić Twoje podejście do nauki. <br/>
        Gotowy na wyzwanie?<br/>
        Dołącz do naszej społeczności uczących się i zacznij zdobywać wiedzę w sposób interaktywny i ekscytujący!
        </p>
        <button type="button" class="btn btn-success" id="btn-home-page" onClick={() => navigate('/signup')}>Załóż konto</button>
      </div>
    </div>
  )
}

export default HomePage;