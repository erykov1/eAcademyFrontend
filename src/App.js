import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import AddQuestionPage from './pages/AddQuestionPage';
import CategoryPage from './pages/CategoryPage';
import QuizPage from './pages/QuizPage';
import { isExpired } from 'react-jwt';
import EndQuizPage from './pages/EndQuizPage';
import { Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import AddQuizPage from './pages/AddQuizPage'
import AddCategoryPage from './pages/AddCategoryPage'
import QuizDetailsPage from './pages/QuizDetailsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signin' element={<LoginPage/>} />
          <Route path='/signup' element={<RegisterPage/>}/>
          <Route path='/add-quiz' element={<AddQuizPage/>}/>
          <Route path='/add-category' element={<AddCategoryPage/>}/>
          <Route path="/quiz/details/:quizId" element={
            isExpired(localStorage.getItem("token") ?? "") ? (
              <Navigate replace to='/' />
            ) : (<QuizDetailsPage />)
          }/>
          <Route path='/quiz/game/:quizId' element={
            isExpired(localStorage.getItem("token") ?? "") ? (
              <Navigate replace to='/' />
            ) : (<QuizPage />)
          }/>
          <Route path='/quiz/end-quiz' element={
            isExpired(localStorage.getItem("token") ?? "") ? (
              <Navigate replace to='/' />
            ) : (<EndQuizPage />)
          }/>
          <Route path='/add-question' element={
            isExpired(localStorage.getItem("token") ?? "") ? (
              <Navigate replace to='/' />
            ) : (<AddQuestionPage/>)
          } />
          <Route path='/categories' element={
            isExpired(localStorage.getItem("token") ?? "") ? (
              <Navigate replace to='/' />
            ) : (<CategoryPage />)
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
