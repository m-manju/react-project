import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import { get ,post} from '../apiUtils';

interface UserDetails {
  username: string;
  email: string;
  id: number;
}

interface SubscriptionPlan {
  id: number;
  type: string;
  price: number;
  quantity: number;
}

const PaymentPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [activeSubscription, setActiveSubscription] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState<boolean>(false);
  const [allSubscriptionPlans, setAllSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const navigate = useNavigate();
  const { quantity, type, total } = useParams();
  const token = localStorage.getItem('token')?? '';
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token && !adminToken) {
      navigate('/login');
    }
  }, [navigate, token, adminToken]);

  console.log(allSubscriptionPlans, activeSubscription);
  console.log(quantity, type, total);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = userDetails?.id;
        if (userId) {
          const response = await get(`/subscriptions/active/${userId}`, token); 
          setActiveSubscription(response?.responseObject || null);
        }
      } catch (error) {
        console.error('Error fetching active subscription:', error);
      }
    };

    fetchData();
  }, [token, userDetails]);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const decodedToken: UserDetails = jwtDecode(token);
        setUserDetails(decodedToken);
  
        const response = await get('/subscriptions/plans', token);
  
        setAllSubscriptionPlans(response.subscriptions || []);
  
        if (response.subscriptions && response.subscriptions.length > 0) {
          setSelectedPlan(response.subscriptions[0]);
        }
      } catch (error) {
        console.error('Error in decoding the token:', error);
      }
    };
  
    if (token) {
      fetchSubscriptionData();
    }
  }, [token]);
  


  const handleSubscription = async () => {
    try {
      await post('/subscriptions/custom', { subscriptionType: type, quantity }, token);
      setSubscriptionSuccess(true);
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  return (
    <div className="payment container">
      <div className="payBox">
        <div className="paymentnBox">
          {selectedPlan && (
            <div className="pay">
              <h4>Complete your payment, and enjoy the plan!</h4>
              <p>selected subscription-type: {type}</p>
              <p>Selected quantity: {quantity}</p>
              <div className="fillDetails">
                <div className="userDetails">
                  <input type="text" placeholder="Full Name" required />
                  <br />
                  <input type="text" placeholder="Email Id" required />
                </div>
                <div>
                  <p className="enterDetails">Enter your payment details</p>
                  <hr />
                  <input type="text" className="cardNo" placeholder="Card number" required />
                  <br />
                  <input type="text" placeholder="Month & Year" required />
                  <input type="text" placeholder="CVV Code" required />
                </div>
              </div>
              <div className="payBtnBox">
                <p>pay now</p>
                <button className="payBtn" onClick={handleSubscription}>
                  Pay ${total}
                </button>
              </div>
            </div>
          )}

          {subscriptionSuccess && (
            <>
              <div className="afterSubscription">
                <div className="subscription-success-message">
                  Payment completed, and custom Subscription updated successfully! 🎉
                </div>
                <button onClick={() => navigate('/')} className="goHome">
                  Go to home
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
