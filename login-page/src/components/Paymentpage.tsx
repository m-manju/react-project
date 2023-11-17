import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface UserDetails {
  username: string;
  email: string;
  id: number;
}

interface SubscriptionPlan {
  id: number;
  type: string;
  price: number;
}

const SubscriptionForm: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [activeSubscription, setActiveSubscription] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState<boolean>(false);
  const [allSubscriptionPlans, setAllSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();


  console.log(allSubscriptionPlans,activeSubscription)
  useEffect(() => {
    
  const fetchData = async () => {
    try {
      const userId = userDetails?.id;
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/subscriptions/active/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActiveSubscription(response.data.responseObject);
    } catch (error) {
      console.error('Error fetching active subscription:', error);
    }
  };
    fetchData();

  }, [token, userDetails]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: UserDetails = jwtDecode(token) as UserDetails;
        setUserDetails(decoded);

        axios
          .get(`${process.env.REACT_APP_API_BASE_URL}/subscriptions/plans`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setAllSubscriptionPlans(response.data.subscriptions || []);

            if (response.data.subscriptions && response.data.subscriptions.length > 0) {
              setSelectedPlan(response.data.subscriptions[0]);
            }
          })
          .catch((error) => {
            console.error('Error fetching subscription plans:', error);
          });
      } catch (error) {
        console.error('Error in decoding the token:', error);
      }
    }
  }, [token]);

  const handleSubscription = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/subscriptions/updates`,
        { subscriptionType: selectedPlan?.type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
            <div className='pay'>
              <h4>Complete your payment, and enjoy the plan!</h4>
              <p>selected subscription-type: {selectedPlan.type}</p>
              <div className='fillDetails'>
                <div className='userDetails'>
                  <input type="text" placeholder='Full Name' />
                  <br />
                  <input type="text" placeholder='Email Id' />
                </div>
                <div>
                  <p className='enterDetails'>Enter your payment details</p>
                  <hr />
                  <input type="text" className='cardNo' placeholder='Card number' />
                  <br />
                  <input type="text" placeholder='Month & Year' />
                  <input type="text" placeholder='CVV Code' />
                </div>
              </div>
              <div className='payBtnBox'>
                <p>pay now</p>
                <button className='payBtn' onClick={handleSubscription}>
                  Pay  ${selectedPlan.price}
                </button>
              </div>
            </div>
          )}

          {subscriptionSuccess && (
            <>
              <div className='afterSubscription'>
                <div className="subscription-success-message">
                  Payment completed, and
                  custom Subscription updated successfully! 🎉
                </div>
                <button onClick={() => navigate('/')} className='goHome'>Go to home</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
