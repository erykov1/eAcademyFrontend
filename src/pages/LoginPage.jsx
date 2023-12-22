import React from "react";
import LoginForm from "../components/LoginForm"

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <p id="login-text">Zaloguj się aby móc korzystać z platformy i zdobywać wiedzę</p>
      <LoginForm/>
    </div>
  )
}

export default LoginPage;