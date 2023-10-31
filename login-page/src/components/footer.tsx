import React from 'react';
import './../App.css';

const Footer: React.FC = () => {
  return (
    <>
    <footer>
        <div className="container footercls">
          <div className="footer-text">
            <h3>EpicEntertain</h3>
            <h5>Empowering Knowledge, One Page at a Time 
                Empowering Knowledge, One Page at a Time 
                Empowering Knowledge, One Page at a Time!!</h5>
          </div>
          <div className="footerul">
            <h4 className="footer-h4">About</h4>
            <ul className="ul">
                <li><a href="#">About us</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Contact us</a></li>
            </ul>
          </div>
          <div className="footerul">
            <h4 className="footer-h4">Company</h4>
            <ul className="ul">
                <li><a href="#">Our office</a></li>
                <li><a href="#">Touch with us</a></li>
            </ul>
          </div>
          <div className="footerul">
            <h4 className="footer-h4">Support</h4>
            <ul className="ul">
                <li><a href="#">About</a></li>
                <li><a href="#">Support carrier</a></li>
                <li><a href="#">Contact us</a></li>
            </ul>
          </div>
          <div className="footerul">
            <h4 className="footer-h4">Get in touch</h4>
            <ul className="ul">
                <li><a href="#">About us About us</a></li>
                <li><a href="#">Features About us about</a></li>
            </ul>
            <div className="footerIcons">
              <a href="#" className="fab fa-instagram"></a>
              <a href="#" className="fab fa-facebook"></a>
              <a href="#" className="fab fa-twitter"></a>
            </div>
          </div>
        </div>
    </footer>
    </>
  );
}

export default Footer;
