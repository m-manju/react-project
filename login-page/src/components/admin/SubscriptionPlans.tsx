import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


interface SubscriptionPlan {
    id: number;
    type: string;
    price: number;
  }
  
const CreateSubscriptionPlan: React.FC = () => {
  const [subscriptionSuccess, setSubscriptionSuccess] = useState<boolean>(false);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const navigate = useNavigate();

  const [planData, setPlanData] = useState({
    type: '',
    details: '',
    price: '',
    duration: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPlanData({ ...planData, [name]: value });
  };

  const adminToken = localStorage.getItem('adminToken');
  console.log(plans);

  const handleCreatePlan = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/adminSubscriptions/createPlan`,
        planData,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
        setSubscriptionSuccess(true);
        console.log('Subscription plan created successfully');
        fetchSubscriptionPlans();
        console.log(response.data.success);
    } catch (error) {
      console.error('Error creating subscription plan:', error);
    }
  };
  

  const fetchSubscriptionPlans = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/subscriptions/plans`, {
        headers: { Authorization: adminToken },
      })
      .then((response) => {
        setPlans(response.data.subscriptions || []);
      })
      .catch((error) => {
        console.error('Error fetching subscription plans:', error);
      });
  };
  
  return (
    <div className="createAll container">
      <h3>Create New Subscription Plan</h3>
      <form className="subscriptionCreate">
        
      <div className="label-group">
        <label> Type:</label>
          <input type="text" name="type" value={planData.type} onChange={handleInputChange} required/>
        </div>
        <div className="label-group">
        <label>Details:</label>
          <input type="text" name="details" value={planData.details} onChange={handleInputChange} required/>
        
        </div>
        <div className="label-group">
        <label> Price: </label>
          <input type="number" name="price" value={planData.price} onChange={handleInputChange} required/>
       
        </div>
        <div className="label-group">
        <label> Duration:</label>
          <input type="number" name="duration" value={planData.duration} onChange={handleInputChange} required/>
        </div>
        <button type="button" className='submitButton' onClick={handleCreatePlan}>Create Plan</button>
      </form>
    {subscriptionSuccess && (
        <div className='viewPlan'>
        <div className="subscription-success-message">
          Plan added successfully! 🎉
        </div>
        <button onClick={() => navigate('/')} id='viewPlanBtn'>View all plan</button>
        </div>
      )}
    </div>
  );
};

export default CreateSubscriptionPlan;
