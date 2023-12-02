import Header from '../components/header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import SubscriptionPlans from '../components/SubscriptionPlans';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleAllBooks =() => {
    navigate('/books');
  }

  return (
    <>
      <Header showNavigation={true} />
      <div className='blackBox'>
        <div className='container homeTop'>
          <div className='image-section'>
            <img className='background-image' src={process.env.PUBLIC_URL + '/images/blue.png'} alt='Online Library'/>
            <div className='content-overlay'>
              <div className='text-section'>
                 <h2>Welcome to Our Library</h2>
                 <p> Explore our collection of books and resources. Get started with a wide range ofcategories and topics.</p>
                 <button onClick={handleAllBooks} className="custom-btn btn-8"><span>View All Books</span></button>
              </div>
            </div>
          </div>
        </div>
        <SubscriptionPlans />
      </div>
      <Footer/>
    </>
  );

}

export default Home;
