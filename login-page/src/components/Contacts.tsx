import React, { useEffect } from 'react';
import Header from '../components/header';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Footer from '../components/Footer';


const Contact: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token && !adminToken) {
      navigate('/login');
    }
  }, [navigate, token, adminToken]);

  const handleAllBooks = () => {
    navigate('/books');
  };

  return (
    <>
      <Header showNavigation={true} />
      <div className='blackBox'>
      <div className='container contact'>
        <div className='contact-section'>
          <h2>Contact Us</h2>
          <p>Have questions, feedback, or just want to say hello? We'd love to hear from you! Reach out to us through the contact information below:</p>
          <div className='contact-details'>
            <p><strong>Email:</strong> info@epicentertain.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567 </p>
            <p><strong>Address:</strong> 123 Library Lane, Cityville, State, Zip</p>
          </div>
          <h3>Connect With Us on Social Media</h3>
          <div className='social-media-icons'>
            <a href='link' ><FontAwesomeIcon icon={faTwitter} /></a>
            <a href='link'> <FontAwesomeIcon icon={faFacebook} /> </a>
            <a href='link'> <FontAwesomeIcon icon={faInstagram} /></a>
          </div>
          <p>We're active on social media! Follow us for updates, book recommendations, and community events.</p>
          <p>We look forward to welcoming you! </p>
          <button onClick={handleAllBooks} className='viewAll'>View All Books</button>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default Contact;
