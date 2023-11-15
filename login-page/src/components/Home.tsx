import React, { useEffect }  from 'react';
import Header from '../components/header';
import { useNavigate } from 'react-router-dom';
import SubscriptionPlans from '../components/SubscriptionPlans';
import CreateSubscriptionPlan from '../components/admin/SubscriptionPlans'; 
import AddBookForm from '../components/admin/AddBook';
import AddBookFormWithFile from './admin/AddBookFormWithFile'; 

const Home: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token && !adminToken) {
      navigate('/login');
    }
  }, [navigate, token, adminToken]);

  const handleAllBooks =() => {
    navigate('/books');
  }

  return (
    <>
        <Header showNavigation={true} />
      <div className='container homeTop'>
        <div className='image-section'>
          <img
            className='background-image'
            src={process.env.PUBLIC_URL + '/images/bgImage.jpg'}
            alt='Online Library'
          />
          <div className='content-overlay'>
            <div className='text-section'>
              <div>
              <h2>Welcome to Our Library</h2>
              <p>
                Explore our collection of books and resources. Get started with a wide range of
                categories and topics.</p>
              <button onClick={handleAllBooks}>View All Books</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {adminToken && <CreateSubscriptionPlan />}
      <SubscriptionPlans />
      {adminToken && <AddBookFormWithFile />}
      {adminToken && <AddBookForm />}
    </>
  );


}

export default Home;
