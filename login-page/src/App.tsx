import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/Home';
import Signup from './components/Signup';
import Books from './components/Books';
import About from './components/About';
import Contacts from './components/Contacts';
import AdminLogin from './components/admin/AdminPanel';
import { Provider } from 'react-redux';
import store from './redux/store';
import Payment from './components/Paymentpage';


const App: React.FC = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/adminLogin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
};

export default App;
