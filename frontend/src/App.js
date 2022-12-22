import React from 'react';
import './App.css';
import './index.css'
import {ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import About from './pages/About';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import NewConcept from './pages/NewConcept';
import Footer from './components/Footer';
import $ from 'jquery';
import loadable from "@loadable/component";
const Loader = loadable(()=>import("./styles/loader"));

function App() {
  return (
    <>
    <Loader/>
      <Router>
        <div>
        <Header/>
          <Routes>
            {/*<Route path='/' element={<PrivateRoute/>}>*/}
              <Route path='/' element={<Home/>}/>
            {/*</Route>*/}
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/about' element={<About/>} />
            
            <Route path='/profile' element={<PrivateRoute/>}>
              <Route path='/profile' element={<Profile/>}/>
            </Route>
            <Route path='/reset' element={<PrivateRoute/>}>
                <Route path='/reset' element={<ResetPassword/>}/>
            </Route>
            <Route path='/new/concept' element={<PrivateRoute/>}>
              <Route path='/new/concept' element={<NewConcept/>}/>
            </Route>
          </Routes>
          <Footer/>
        </div>
      </Router>
      <ToastContainer/>
     
    </>
  );
}

export default App;
