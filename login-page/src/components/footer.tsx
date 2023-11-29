import React from 'react';
import './../App.css';

const Footer: React.FC = () => {
  return (
    <>
    <footer className="footer">
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Company</p>
        <p>Privacy Policy | Terms of Service</p>
      </div>
    </footer>
    </>
  );
}

export default Footer;
