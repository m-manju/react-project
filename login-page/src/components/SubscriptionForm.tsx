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
  const [subscriptionSuccess, setSubscriptionSuccess] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [activeSubscription, setActiveSubscription] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null); // Track the selected plan
  const [allSubscriptionPlans, setAllSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: UserDetails = jwtDecode(token) as UserDetails;
        setUserDetails(decoded);

        const userId = decoded.id;
        axios
          .get(`${process.env.REACT_APP_API_BASE_URL}/subscriptions/active/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setActiveSubscription(response.data.responseObject);
          })
          .catch((error) => {
            console.error('Error fetching active subscription:', error);
          });

        axios
          .get(`${process.env.REACT_APP_API_BASE_URL}/subscriptions/plans`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setAllSubscriptionPlans(response.data.subscriptions || []);
            console.log('Fetched plans:', response.data.subscriptions); // Log fetched plans
          })
          .catch((error) => {
            console.error('Error fetching subscription plans:', error);
          });
      } catch (error) {
        console.error('Error in decoding the token:', error);
      }
    }
  }, []);

  const handlePayment = () => {
    const selectedPlan = allSubscriptionPlans[0];
    setSelectedPlan(selectedPlan);
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

  return (
    <div className="createForm container">
      <div className="subscribeNow">
        <h3>Subscribe Now!</h3>
      </div>
      <div className="subscribBox">
        <div>
          <label>Choose Subscription Type</label>
          <br />
          <select
            id="subscriptionType"
            value={subscriptionType}
            onChange={(e) => setSubscriptionType(e.target.value)}
          >
            <option value="" disabled>
              Select a plan
            </option>
            {allSubscriptionPlans.map((plan) => (
              <option key={plan.id} value={plan.type}>
                {plan.type}
              </option>
            ))}
          </select>
          <br />
          <button onClick={handlePayment}>Payment</button>

          {selectedPlan && (
            <div>
              <h4>Selected Plan</h4>
              <p>Type: {selectedPlan.type}</p>
              <p>Price: ${selectedPlan.price}</p>
              <button onClick={handleSubscription}>Confirm Subscription</button>
            </div>
          )}

          {subscriptionSuccess && (
            <div className="subscription-success-message">
              Subscription updated successfully! 🎉
            </div>
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
  );
};

export default SubscriptionForm;
