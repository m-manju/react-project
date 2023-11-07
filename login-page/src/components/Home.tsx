import React, { useEffect }  from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [navigate, token]);


  const handleAllBooks =() => {
    navigate('/books');
  }

  return (
    <>
      <Header showNavigation={true} /> 
      <h2>Home</h2>
      <button onClick={handleAllBooks}>View All Books</button>
      <br/>
    </>
  );
}

export default Home;

