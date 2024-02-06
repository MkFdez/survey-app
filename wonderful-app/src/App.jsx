import { useState, useEffect } from 'react'
import Home from './Home'
import Survey from './Survey'
import { Route, Routes, Navigate } from 'react-router-dom'
import CreateSurvey from './CreateSurvey'
import Register from './Register'
import Login from './Login'
import SurveyInfo from './SurveyInfo'
import UserSurvey from './UserSurveys'
import PrivateRoute from './components/PrivateRoute'
import LoadingHamster from './components/LoadingHamster'
import isAuthenticated from '../utils/isAuthenticated'


function App() {
  const [authenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const checkAuth = async () => {
    try {
      // Perform your asynchronous authentication check
      const isAuth = await isAuthenticated();
      setIsAuthenticated(isAuth);
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    

    checkAuth();
  }, []);

  if (isLoading) {
    return <div><LoadingHamster /></div>; // Show a loading indicator or skeleton screen
  }
 
  return (
    <Routes >
      <Route path='/' element={<Home />}/>
      <Route path='/survey/:id' element={authenticated ? <Survey /> : <Navigate to={'/user/login'}/>}/>
      <Route path='/survey/create' element={authenticated ? <CreateSurvey/> : <Navigate to={'/user/login'}/>} />
      <Route path='/user/register' element={<Register check={checkAuth}/>}/>
      <Route path='/user/login' element={<Login check={checkAuth}/>}/>
      <Route path='/survey/info/:id' element={authenticated ? <SurveyInfo/> : <Navigate to={'/user/login'}/>} />
      <Route path='/user/surveys' element={authenticated ? <UserSurvey />: <Navigate to={'/user/login'}/>} />
    </Routes>
    
  )
}

export default App
