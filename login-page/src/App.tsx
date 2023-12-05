import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import Admin from './components/admin/AdminPage';

const App: React.FC = () => {
  const isLoggedIn = () => {
    const userToken = window.localStorage.getItem('token');
    return !!userToken;
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/"
            element={isLoggedIn() ? <Home /> : <Navigate to="/login" />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/books" 
            element={isLoggedIn() ? <Books /> : <Navigate to="/login" />}/>
          <Route path="/about"
            element={isLoggedIn() ? <About /> : <Navigate to="/login" />}/>
          <Route path="/contacts"
            element={isLoggedIn() ? <Contacts /> : <Navigate to="/login" />}/>
          <Route path="/payment/:quantity/:type/:total" 
            element={isLoggedIn() ? <Payment /> : <Navigate to="/login" />}/>
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/admin" 
            element={isLoggedIn() ? <Admin /> : <Navigate to="/login" />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
