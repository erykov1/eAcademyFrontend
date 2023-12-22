import React from 'react';
import Logo from './Logo';
import { Link, useNavigate } from "react-router-dom";
import Login from '../assets/images/enter.png';
import Register from '../assets/images/icons8-register-100.png';
import Logout from '../assets/images/logout.png';
import AddQuiz from '../assets/images/quiz.png';
import ResolveQuiz from '../assets/images/learn.jpg';

const Navbar = () => {
  let navigate = useNavigate()
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/')
  }
  
  return (
    <div className='navbar-section'>
      <Logo/>
      <p><Link to='/' id='home-label'>Strona Główna</Link></p>
      <div>
      {!token && (
        <>
          <button className='login-btn' onClick={() => navigate('/signin')}>
            <img src={Login} alt='login button' className='login-img' />
          </button>
          <button className='login-btn' onClick={() => navigate('/signup')}>
            <img src={Register} alt='register button' className='register-img' />
          </button>
        </>
      )}

      {token && (
        <>
          <button className='login-btn' onClick={() => navigate('/add-quiz')}>
            <img src={AddQuiz} alt='add quiz button' className='logout-img' />
          </button>
          <button className='login-btn' onClick={handleLogout}>
            <img src={Logout} alt='logout button' className='logout-img' />
          </button>
        </>
      )}
    </div>
    </div>
  )
}

export default Navbar;