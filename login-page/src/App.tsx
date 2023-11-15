import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/Home';
import Signup from './components/Signup';
import Books from './components/Books';
import AdminLogin from './components/admin/AdminPanel';
import { Provider } from 'react-redux';
import store from './redux/store';


const App: React.FC = () => {
  
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
};

export default App;
