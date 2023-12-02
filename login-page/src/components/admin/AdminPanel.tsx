import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import { post } from '../../apiUtils';

const AdminPanel: React.FC = () => {
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [loginData, setLoginData] = useState({ full_name: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setAdminToken(token);
  }, []);
  console.log(adminToken);

  const handleLoginAdmin = async () => {
    try {
      const response = await post('/admin/loginAdmin', loginData);
      const { token } = response.data;
      localStorage.setItem('adminToken', token);
      navigate('/');
    } catch (error) {
      console.error('Error logging in admin:', error);
    }
  };


  return (
        
    <div className="App">
      <Header showNavigation={false} />
        <div className='formDiv'>
          <h3>Admin Login</h3>
          <form className='formClass'>
            <label> Full Name:
             <input type="text" value={loginData.full_name}onChange={(e) => setLoginData({ ...loginData, full_name: e.target.value })} required/>
            </label>
            <br />
            <label> Password:
              <input type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required/>
            </label>
            <br />
            <button type="button" onClick={handleLoginAdmin}>Login</button>
          </form>
        </div>
    </div>
  );
};

export default AdminPanel;
