import React from 'react'
import Login from './components/login'
import Home from './components/Home'
import "./App.css"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const App: React.FC = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/' element={<Home/>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

