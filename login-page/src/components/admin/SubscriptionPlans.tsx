import React, { useState } from 'react';
import axios from 'axios';

const CreateSubscriptionPlan: React.FC = () => {
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

  const handleCreatePlan = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/adminSubscriptions/createPlan`,planData,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      if (response.data.success) {
        console.log('Subscription plan created successfully');
      }
    } catch (error) {
      console.error('Error creating subscription plan:', error);
    }
  };

  return (
    <div className="createForm container">
      <h3>Create New Subscription Plan</h3>
      <form className="subscriptionForm">
        <label> Type:
          <input type="text" name="type" value={planData.type} onChange={handleInputChange} />
        </label>
        <label>Details:
          <input type="text" name="details" value={planData.details} onChange={handleInputChange} />
        </label>
        <label> Price:
          <input type="number" name="price" value={planData.price} onChange={handleInputChange} />
        </label>
        <label> Duration:
          <input type="number" name="duration" value={planData.duration} onChange={handleInputChange} />
        </label>
        <button type="button" className='submitButton' onClick={handleCreatePlan}>Create Plan</button>
      </form>
    </div>
  );
};

export default CreateSubscriptionPlan;
