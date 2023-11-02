import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';

const Home: React.FC = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log("removed from local storage.") 
    navigate('/login'); 
  };

  return (
    <>
      <Header />
      <h2>Home</h2>
      <br/>
      <button  className='LogoutButton' onClick={handleLogout}>Log Out</button>
    </>
  );
}

export default Home;