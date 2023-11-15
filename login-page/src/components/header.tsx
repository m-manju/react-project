import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface HeaderProps {
  showNavigation?: boolean;
}

interface UserDetails {
  username: string;
  email: string;
  id: number;
}

const Header: React.FC<HeaderProps> = ({ showNavigation = true }) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: UserDetails = jwtDecode(token) as UserDetails;
        setUserDetails(decoded);
      } catch (error) {
        console.error('Error in decoding the token:', error);
      }
    } 
  }, [navigate]);

  const handleLogout = () => {
    setUserDetails(null);
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <>
      <header>
      <div className="main-header">
        <div className="top-section container">
          <div className="left-section ">
            <div className="logo-section">
              <div className="logo">EpicEntertain</div>
              <p className="caption">Empowering Knowledge, One Page at a Time!!</p>
            </div>
          </div>
            {userDetails && (
              <div className="user-details">
                <h2>Welcome {userDetails.username}!</h2>
                <p>Email: {userDetails.email}</p>
              </div>
            )}
        </div>

          {showNavigation && (
            <div className="bottom-section container">
              <nav>
                <ul className="nav-list">
                  <li onClick={() => navigate('/')}>Home</li>
                  <li onClick={() => navigate('/about')}>About</li>
                  <li onClick={() => navigate('/books')}>Books</li>
                  <li onClick={() => navigate('/contacts')}>Contacts</li>
                </ul>
                <button className='LogoutButton' onClick={handleLogout}>Log Out</button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
