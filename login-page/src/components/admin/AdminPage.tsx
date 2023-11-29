import React, { useEffect }  from 'react';
import Header from '../header';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import AddBookForm from '../admin/AddBook';
import AddPlans from '../admin/SubscriptionPlans';

const Admin: React.FC = () => {
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
      <div className='blackBox'>
        <div className='adminActivity container'>
          {adminToken && <AddBookForm />}
          
          {adminToken && <AddPlans />}
        </div>
      </div>
      <Footer/>
    </>
  );

}

export default Admin;
