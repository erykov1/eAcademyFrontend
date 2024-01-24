import React, {useEffect, useState} from 'react';
import Logo from './Logo';
import { Link, useNavigate } from "react-router-dom";
import Login from '../assets/images/enter.png';
import Register from '../assets/images/icons8-register-100.png';
import Logout from '../assets/images/logout.png';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  let navigate = useNavigate()
  const [role, setRole] = useState("")
  const token = localStorage.getItem("token")
  let decodedToken = token ? jwtDecode(token) : null;
  let userRole = decodedToken ? decodedToken.role : null;

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/')
  }
  
  return (
    <nav className='navbar-section'>
      <Logo />
      <ul className='nav-list'>
        <li className='nav-item'>
          <h2 className='nav-header'>
            <Link to='/' id='home-label' className='nav-link no-decoration'>Strona Główna</Link>
          </h2>
        </li>
        <li className='nav-item'>
          {!token ? (
            <>
              <button className='login-btn' onClick={() => navigate('/signin')}>
                <img src={Login} alt='login button' className='login-img' />
              </button>
              <button className='login-btn' onClick={() => navigate('/signup')}>
                <img src={Register} alt='register button' className='register-img' />
              </button>
            </>
          ) : (
            <>
              <Link to="/categories" className="no-decoration">Kategorie</Link>
              {userRole === 'ADMIN' && (
                <>
                  <Link to="/add-category" className="no-decoration">Dodaj kategorię</Link>
                  <Link to="/add-quiz" className="no-decoration">Dodaj quiz</Link>
                </>
              )}
              <button className='login-btn' onClick={handleLogout}>
                <img src={Logout} alt='logout button' className='logout-img' />
              </button>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
  
}

export default Navbar;