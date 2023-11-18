import React, { useEffect } from 'react';
import Header from '../components/header';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const About: React.FC = () => {
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token && !adminToken) {
      navigate('/login');
    }
  }, [navigate, token, adminToken]);

  return (
    <>
      <Header showNavigation={true} />
      <div className='container about'>
        <img className='abotImg' src={process.env.PUBLIC_URL + '/images/Stay.jpg'} alt='Online Library'/>
        <div className='about-section'>
          <h2>About Our Library</h2>
          <p> Welcome to EpicEntertain a haven for book lovers and knowledge seekers.
            EpicEntertainis more than just a repository of books; it's a community-driven
            space dedicated to the joy of reading and intellectual exploration.</p>
          <h3>Our Mission</h3>
          <p>At EpicEntertain, our mission is to connect people with the power of knowledge.
            We strive to provide a diverse and extensive collection of books, catering to the varied
            interests and passions of our readers. We believe in fostering a love for reading and
            promoting intellectual growth.</p>
          <div className='aboutUl'>
            <h3>What Sets Us Apart</h3>
            <ul>
              <li>
                <strong>Extensive Collection:</strong> Explore our vast collection of books spanning
                various genres, including fiction, non-fiction, academic, and more.
              </li>
              <li>
                <strong>Digital Innovation:</strong> Embrace the digital age with our online platform,
                allowing you to access our library anytime, anywhere.
              </li>
              <li>
                <strong>User-Friendly Interface:</strong> Navigate our library effortlessly with our
                user-friendly interface.
              </li>
            </ul>
          </div>
          
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default About;
