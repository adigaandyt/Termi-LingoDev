import React from 'react';
import './App.css';
import './index.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Header from './components/Header';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <div>
        <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />

          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App;
