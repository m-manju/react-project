import React , { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Home: React.FC = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [navigate, token]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log("removed from local storage." ) 
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