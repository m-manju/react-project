import React , { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface HeaderProps {
  showNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showNavigation = true }) => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username'); 
  
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
      <header>
        <div className="header">
          <div >
            <div className="logo">EpicEntertain</div>
            <p className="caption">Empowering Knowledge, One Page at a Time!!</p>
          </div>
          
          {showNavigation && (
            <>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">About</Link></li>
                <li><Link to="/">Features</Link></li>
                <li><Link to="/">Contacts</Link></li>
              </ul>
              <button  className='LogoutButton' onClick={handleLogout}>Log Out</button>
            </nav>
            <div>
              {username && <h2 className='welcome'>Welcome, {username}!!</h2>} 
            </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
