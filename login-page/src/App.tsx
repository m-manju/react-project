import Login from './components/login'
import Home from './components/Home'
import "./App.css"
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/Home' element={<Home/>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;