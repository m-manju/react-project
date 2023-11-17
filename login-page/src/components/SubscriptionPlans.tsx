import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubscriptionForm from './SubscriptionForm';

interface SubscriptionPlan {
  id: number;
  type: string;
  details: string;
  price: number;
  duration:number;
}

const token = localStorage.getItem('token');
const adminToken = localStorage.getItem('adminToken');

const SubscriptionPlans: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [newPlanId, setNewPlanId] = useState<number | null>(null);

  const handleDeletePlan = async (planId: number) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/adminSubscriptions/deletePlan/${planId}`,
        { headers: { Authorization: `Bearer ${adminToken}`  }, data: { newPlanId: newPlanId } }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error('Error deleting subscription plan:', error);
    }
  };

  useEffect(() => {
    const authToken = adminToken ? `Bearer ${adminToken}` : `Bearer ${token}`;

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/subscriptions/plans`, 
    { headers: { Authorization: authToken } })
      .then(response => {
        setPlans(response.data.subscriptions || []);
        console.log(authToken);
      })
      .catch(error => {
        console.error('Error fetching subscription plans:', error);
      });
  }, []);


  return (
    <div className="subscriptionPlans container">
      <h3>Subscription Plans</h3>
      <ul>
        {plans.map(plan => (
          <li key={plan.id} className="subscription-plan">
            <p>{plan.type}</p>
            <p>{plan.details}</p>
            <p>Price: ${plan.price}</p>
            <p>Duration: {plan.duration}days</p> 
             {adminToken && (
              <div className='fordelete'>
                <button onClick={() => handleDeletePlan(plan.id)}>Delete Plan</button>
                <input type="number" placeholder="New Plan ID" onChange={(e) => setNewPlanId(Number(e.target.value))}/>
              </div>
            )}
          </li>
        ))}
      </ul>
      <SubscriptionForm/>
    </div>
  );
};

export default SubscriptionPlans;

