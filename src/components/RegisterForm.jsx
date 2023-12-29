import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  let navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const handleSignup = (event) => {
    event.preventDefault()
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/auth/user/register',
      data: {
        email: email,
        username: username,
        password: password,
      }
    }).then((response) => {
      navigate('/signin')
    }).catch((error) =>{
      console.log(error)
    })
  }

  const processSignup = (event) => {
    if(rePassword === password) {
      handleSignup(event)
    } else {
      console.log("Hasla nie sa takie same")
    }
  }

  return (
    <div>
      <form className='form-content'>
        <div className="form-group">
          <label for="login-content">Login : </label>
          <input type="text" class="form-control" id="login-content" placeholder="Wpisz nazwę użytkownika" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="form-group">
          <label for="email-content">Email : </label>
          <input type="text" class="form-control" id="email-content" placeholder="Wpisz email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label for="password-content">Hasło : </label>
          <input type="password" class="form-control" id="password-content" placeholder="Wpisz hasło" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="form-group">
          <label for="password-content">Powtórz hasło : </label>
          <input type="password" class="form-control" id="password-content" placeholder="Wpisz hasło ponownie" onChange={(e) => setRePassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary" id="btn-signin" onClick={processSignup}>Załóż konto</button>
        <div className="signin-section">
          <p id="label-signin">Posiadasz już konto? Zaloguj się</p>
          <button type="submit" className="btn btn-primary" id="btn-redirect" onClick={() => navigate('/signin')}>Zaloguj się</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm