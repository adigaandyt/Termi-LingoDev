//saleh
import React, { useState } from 'react';
import { useEffect ,useLayoutEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getCategories} from './features/categories/categorySlice';
import {getConceptsNames} from './features/concepts/conceptSlice';
import './App.css';
import './index.css';
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Register from './pages/usersManagement/Register';
import Login from './pages/usersManagement/Login';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import VerifyPrivateRoute from './components/PrivateRoutes/VerifyPrivateRoute';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import About from './pages/About';
import Profile from './pages/usersManagement/Profile';
import ResetPassword from './pages/usersManagement/ResetPassword';
import Validation from './pages/usersManagement/Validation';
import NewConcept from './pages/NewConcept';
import Footer from './components/Footer';
import ErrorPage404 from './pages/ErrorPage404';
import TestComponent from './pages/TestComponent';
import Settings from './pages/Setting';
import Game from './pages/games/game1'
import $ from 'jquery';
import loadable from "@loadable/component";
import GamesPage from './pages/games/GamesPage';
import GuessTheTerm from './pages/games/game1';
import { GamesProvider } from './hooks/gamesContext';
import TransMe from './pages/games/game2';
import { checkme } from './features/auth/authSlice';
import Spinner from './components/Spinner';
import Spinner3 from './components/Spinners/Spinner3';
import UserCard from './components/UserCard';
import UserList from './components/UserList';

function App() {
  const {user,isLoading}=useSelector(state=>state.auth)
  const [loggedin,setLoggedIn]=useState(false)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getConceptsNames())
    dispatch(getCategories())
    dispatch(checkme())
},[])


  return (
    <>

   <GamesProvider>
    
      <Router>
        <div className='mb-150'>
        <Header/>
          <Routes>
            <Route path='/' element={<PrivateRoute/>}>
              <Route path='/' element={<Home/>}/>
            </Route>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/about' element={<About/>} />
            
            <Route path='/profile' element={<PrivateRoute/>}>
              <Route path='/profile' element={<Profile/>}/>
            </Route>
            <Route path='/forgotpassword/verified' element={<VerifyPrivateRoute/>}>
                <Route path='/forgotpassword/verified' element={<ResetPassword/>}/>
            </Route>
            <Route path='/test' element={<TestComponent/>}/>

            <Route path='/new/concept' element={<PrivateRoute/>}>
              <Route path='/new/concept' element={<NewConcept/>}/>
            </Route>
            <Route path='/settings' element={<PrivateRoute/>}>
              <Route path='/settings' element={<Settings/>}/>
            </Route>
            <Route path='/games' element={<PrivateRoute/>}>
              <Route path='/games' element={<GamesPage/>}/>
            </Route>
            <Route path='/games/gesstheterm' element={<PrivateRoute/>}>
              <Route path='/games/gesstheterm' element={<GuessTheTerm page="home"/>}/>
            </Route>
            <Route path='/games/gesstheterm/top5' element={<PrivateRoute/>}>
              <Route path='/games/gesstheterm/top5' element={<GuessTheTerm page="top5"/>}/>
            </Route>
            <Route path='/games/gesstheterm/settings' element={<PrivateRoute/>}>
              <Route path='/games/gesstheterm/settings' element={<GuessTheTerm page="settings"/>}/>
            </Route>
            <Route path='/games/transme' element={<PrivateRoute/>}>
              <Route path='/games/transme' element={<TransMe path='home'/>}/>
            </Route>
            <Route path='/games/transme/top5' element={<PrivateRoute/>}>
              <Route path='/games/transme/top5' element={<TransMe path='top5'/>}/>
            </Route>
            <Route path='/games/transme/settings' element={<PrivateRoute/>}>
              <Route path='/games/transme/settings' element={<TransMe path='settings'/>}/>
            </Route>
            <Route path='/validation' element={<Validation/>}/>
            {/* <Route path='/forgotpassword/verified' element={<ResetPassword/>}/> */}
            <Route path='*' element={<ErrorPage404/>}/>

          </Routes>

          <Footer/>
        </div>
      </Router>
 
      </GamesProvider>
      <ToastContainer dir='ltr' />
     
    </>
  );
}

export default App;
