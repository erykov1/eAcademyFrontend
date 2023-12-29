import React from "react"; 
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/auth/token',
      headers: {
        
      },
      data: {
        username: username,
        password: password,
      }
    }).then((response) => {
      localStorage.setItem('token', response.data)
      navigate('/')
    }).catch((error) =>{
      console.log(error)
    })
  }

  return (
    <div className="login-form">
      <form>
        <div className="form-group">
          <label htmlFor="loginInput">Nazwa użytkownika</label>
          <input type="text" className="form-control" id="loginInput" aria-describedby="emailHelp" placeholder="Podaj nazwę użytkownika" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Hasło</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Podaj hasło" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary" id="btn-signin" onClick={handleLogin}>Zaloguj się</button>
      </form>
    </div>
  )
}

export default LoginForm