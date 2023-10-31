import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <h2>Home</h2>
      <br/>
      <Link to="/Login" className='LogoutButton'>Log Out</Link>
    </>
  );
}

export default Home;
