import React, { useEffect }  from 'react';
import Header from '../components/header';
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
      <div className='container homeTop'>
        <div className='image-section'>
          <img src={process.env.PUBLIC_URL + '/images/onlineLib.jpg'} alt='Online Library' />
        </div>
        <div className='cntnt-section'>
          <h2>Welcome to Our Library</h2>
          <p>Explore our collection of books and resources. 
            Get started with a wide range of categories and topics.</p>
          <button onClick={handleAllBooks}>View All Books</button>
        </div>
      </div>
    </>
  );
}

export default Home;

