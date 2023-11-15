import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface UserDetails {
  username: string;
  email: string;
  id: number;
}

const SubscriptionForm: React.FC = () => {
  const [subscriptionType, setSubscriptionType] = useState<string>('Weekly');
  const [subscriptionSuccess, setSubscriptionSuccess] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [activeSubscription, setActiveSubscription] = useState<any>(null); 
  
  const token = localStorage.getItem('token');
  console.log(userDetails);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: UserDetails = jwtDecode(token) as UserDetails;
        setUserDetails(decoded);

        const userId = decoded.id;
        axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/subscriptions/active/${userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(response => {
            setActiveSubscription(response.data.responseObject);
          })
          .catch(error => {
            console.error('Error fetching active subscription:', error);
          });

      } catch (error) {
        console.error('Error in decoding the token:', error);
      }
    }
  }, []);

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
  return (
    <div className="createForm container">
      <h3>Subscribe Now!</h3>
      <label>Choose Subscription Type:</label>
      <select
        id="subscriptionType"
        value={subscriptionType}
        onChange={(e) => setSubscriptionType(e.target.value)}
      >
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
      <button onClick={handleSubscription}>Subscribe</button>

      {subscriptionSuccess && (
        <div className="subscription-success-message">
          Subscription updated successfully! 🎉
        </div>
      )}

       {activeSubscription && (
        <div className="activeSubscription">
          <h4>Active Subscription Information</h4>
          <p>Start Date: {activeSubscription.subscriptions_start}</p>
          <p>End Date: {activeSubscription.subscriptions_end}</p>
          <p>Remaining Days: {activeSubscription.remaining_days}</p>
          {activeSubscription.has_expired && (
            <p>Subscription has expired. Renew now!</p>
          )}
        </div>
      )}
    </div>
  );
};
 

export default SubscriptionForm;

