import React from 'react';
import './../App.css';

const Footer: React.FC = () => {
  return (
    <>
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-nav">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Sahya</p>
          <p>Kozhikode, Kerala</p>
          <p>Email: epicentertain@gmail.com</p>
          <p>Phone: +91 999999999</p>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Company</p>
        <p>Privacy Policy | Terms of Service</p>
      </div>
    </footer>
    </>
  );
}

export default Footer;
