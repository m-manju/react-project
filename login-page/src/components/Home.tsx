import React  from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

  return (
    <>
      <Header showNavigation={true} /> 
      <h2>Home</h2>
      <Link to="/books">View All Books</Link>
      <br/>
    </>
  );
}

export default Home;

