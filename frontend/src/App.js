import React from 'react';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getCategories} from './features/categories/categorySlice';
import {getConceptsNames} from './features/concepts/conceptSlice';
import './App.css';
import './index.css';
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import About from './pages/About';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
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
<<<<<<< HEAD
// const Loader = loadable(()=>import("./scripts/loader"));
=======
import { GamesProvider } from './hooks/gamesContext';
const Loader = loadable(()=>import("./scripts/loader"));
>>>>>>> 07e21754ca5392e0e72d2d4fe593cc9d9c473242

function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getConceptsNames())
    dispatch(getCategories())
    
},[])
  return (
    <>
<<<<<<< HEAD
    
=======
   <GamesProvider>
    <Loader/>
>>>>>>> 07e21754ca5392e0e72d2d4fe593cc9d9c473242
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
            <Route path='/reset' element={<PrivateRoute/>}>
                <Route path='/reset' element={<ResetPassword/>}/>
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
              <Route path='/games/gesstheterm' element={<GuessTheTerm/>}/>
            </Route>
           
            <Route path='*' element={<ErrorPage404/>}/>

          </Routes>

          <Footer/>
        </div>
      </Router>
 
      </GamesProvider>
      <ToastContainer />
     
    </>
  );
}

export default App;
