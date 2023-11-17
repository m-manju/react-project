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
  const [subscriptionType, setSubscriptionType] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [activeSubscription, setActiveSubscription] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null); 
  const [allSubscriptionPlans, setAllSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [subscriptionTypeSelected, setSubscriptionTypeSelected] = useState<boolean>(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();


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
    const intervalId = setInterval(fetchData, 1* 1000);
    return () => clearInterval(intervalId);
  }, [token, userDetails]);

  const handlePayment = () => {
    if (subscriptionType === '') {
      setSubscriptionTypeSelected(false);
    } else if (allSubscriptionPlans.length > 0) {
      const selectedPlan = allSubscriptionPlans[0];
      setSelectedPlan(selectedPlan);
      setSubscriptionTypeSelected(true);
      navigate('/payment');
    }
  };

  const handleSubscription = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/subscriptions/updates`,
        { subscriptionType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubscriptionSuccess(true);
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

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
            console.log('Fetched plans:', response.data.subscriptions); 
          })
          .catch((error) => {
            console.error('Error fetching subscription plans:', error);
          });

      } catch (error) {
        console.error('Error in decoding the token:', error);
      }
    }
  }, [token]);

  return (
    <div className="createForm container">
      <div className="subscribeNow">
        <h3>Subscribe Now!</h3>
        <p>Welcome to our premium subscription service! Explore a variety of subscription plans tailored to fit your needs, 
          whether it's a weekly, monthly, or yearly commitment. Enjoy exclusive benefits and flexibility in managing your 
          subscriptions. Plus, don't forget, you can take advantage of our custom subscription option for a personalized 
          experience! Subscribe today and elevate your journey with us.</p>
      </div>
      <div className="subscribBox">
       <div className="subscriptionBox">
        <div >
          <label className='choose'>Choose Subscription Type</label>
          <br /><br />
         <div  className="subscription-controls">
          <select
          id="subscriptionType"
          value={subscriptionType}
          onChange={(e) => {
            setSubscriptionType(e.target.value);
            setSubscriptionTypeSelected(true);
          }} > 
            <option value="" disabled>
              Select a plan </option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>

          <label className='labelQuantity'>Quantity :</label>
          <input type="number" id="quantity" value={quantity} 
          onChange={(e) => setQuantity(parseInt(e.target.value))}/>
          </div>
          {!subscriptionTypeSelected && (
        <div className="subscription-error-message">
        Please select a subscription type before proceeding.
        </div>
      )}

          <br />
          <button onClick={handlePayment}>Pay now</button>
          {selectedPlan && (
            <div className='payment'>
              <h4>Selected Plan</h4>
              <p>Type: {selectedPlan.type}</p>
              <p>Price: ${selectedPlan.price}</p>
              <button className='cnfrmSubscription' onClick={handleSubscription}>Confirm Subscription</button>
            </div>
          )}

          {subscriptionSuccess && (
            <>
           <div className="subscription-success-message">
              Custom Subscription updated successfully! 🎉
            </div>
            </>
          )}
        </div>
        {activeSubscription && (
          <div className="activeSubscription">
            <h4>Active Subscription Information</h4>
            <p>Your subscription ends on {activeSubscription.subscriptions_end}</p>
            <p>Remaining Days - {activeSubscription.remaining_days}</p>
            {activeSubscription.has_expired && <p>Subscription has expired. Renew now!</p>}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default SubscriptionForm
