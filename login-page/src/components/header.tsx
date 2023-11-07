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
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    setUserDetails(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <header>
      <div className="header">
          <div>
            <div className="logo">EpicEntertain</div>
            <p className="caption">Empowering Knowledge, One Page at a Time!!</p>
          </div>
          {userDetails && (
              <div>
                <h2>Welcome, {userDetails.username}!</h2>
                <p>Email: {userDetails.email}</p>
                <p>ID: {userDetails.id}</p>
              </div>
          )}

          {showNavigation && (
            <>
              <nav>
                <ul>
                  <li onClick={() => navigate('/')}>Home</li>
                  <li onClick={() => navigate('/')}>About</li>
                  <li onClick={() => navigate('/')}>Features</li>
                  <li onClick={() => navigate('/')}>Contacts</li>
                </ul>
                <button className='LogoutButton' onClick={handleLogout}>Log Out</button>
              </nav>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
