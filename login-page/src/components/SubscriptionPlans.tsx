import React, { useState, useEffect } from 'react';
import SubscriptionForm from './SubscriptionForm';
import { get, remove } from '../apiUtils';

interface SubscriptionPlan {
  id: number;
  type: string;
  details: string;
  price: number;
  duration: number;
}

const SubscriptionPlans: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [newPlanId, setNewPlanId] = useState<number | null>(null);
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');

  const handleDeletePlan = async (planId: number) => {
    try {
      const authToken = adminToken ? `Bearer ${adminToken}` : `Bearer ${token}`;
      await remove(`/adminSubscriptions/deletePlan/${planId}`, authToken);
      fetchSubscriptionPlans();
    } catch (error) {
      console.error('Error deleting subscription plan:', error);
    }
  };
  console.log(newPlanId);
  const fetchSubscriptionPlans = () => {
    const authToken = adminToken ? `Bearer ${adminToken}` : `Bearer ${token}`;
    console.log('Fetching plans...');
    get('/subscriptions/plans', authToken)
      .then((response) => {
        console.log('Plans fetched successfully:', response);
        setPlans(response.subscriptions || []);
      })
      .catch((error) => {
        console.error('Error fetching subscription plans:', error);
      });
  };
  

  useEffect(() => {
    const authToken = adminToken ? `Bearer ${adminToken}` : `Bearer ${token}`;
    get('/subscriptions/plans', authToken)
      .then((response) => {
        setPlans(response.data.subscriptions || []);
      })
      .catch((error) => {
        console.error('Error fetching subscription plans:', error);
      });
  }, [adminToken, token]);
  

  return (
    <div className="subscriptionPlans container">
      <h3>Subscription Plans</h3>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id} className="subscription-plan">
            <p className="type">{plan.type}</p>
            <p className="price">${plan.price}</p>
            <p>{plan.details}</p>
            <p>Duration: {plan.duration} days</p>
            {adminToken && (
              <div className="fordelete">
                <button onClick={() => handleDeletePlan(plan.id)}>Delete Plan</button>
                <input
                  type="number"
                  placeholder="New Plan ID"
                  onChange={(e) => setNewPlanId(Number(e.target.value))}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
      <SubscriptionForm />
    </div>
  );
};

export default SubscriptionPlans;

