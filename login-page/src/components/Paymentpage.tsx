import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate,useParams } from 'react-router-dom';

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
  const { quantity , type, total } = useParams();
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token && !adminToken) {
      navigate('/login');
    }
  }, [navigate, token, adminToken]);

  console.log(allSubscriptionPlans, activeSubscription);
  console.log(type, total);

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
              setSelectedPlan(response.data.subscriptions);
            }
          })
          .catch((error) => {
            console.error('Error fetching subscription plans:', error);
            console.error('Error updating subscription:', error.response);
          });
      } catch (error) {
        console.error('Error in decoding the token:', error);
      }
    }
  }, [token]);

  const handleSubscription = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/subscriptions/custom`,
        { subscriptionType: type, quantity},
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
            <div className="pay">
              <h4>Complete your payment, and enjoy the plan!</h4>
              <p>selected subscription-type: {type}</p>
              <p>Selected quantity: {quantity}</p>
              <div className="fillDetails">
                <div className="userDetails">
                  <input type="text" placeholder="Full Name" />
                  <br />
                  <input type="text" placeholder="Email Id" />
                </div>
                <div>
                  <p className="enterDetails">Enter your payment details</p>
                  <hr />
                  <input type="text" className="cardNo" placeholder="Card number" />
                  <br />
                  <input type="text" placeholder="Month & Year" />
                  <input type="text" placeholder="CVV Code" />
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
