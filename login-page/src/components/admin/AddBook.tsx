import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  description: string;
  author_id: string;
  isbn: string;
  publication_year: string;
  image: File | null;
}

const AddBookForm: React.FC = () => {
  const [subscriptionSuccess, setSubscriptionSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    author_id: '',
    isbn: '',
    publication_year: '',
    image: null,
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const adminToken = localStorage.getItem('adminToken');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, author_id, isbn, publication_year, image } = formData;

    const formDataForApi = new FormData();
    formDataForApi.append('name', name);
    formDataForApi.append('description', description);
    formDataForApi.append('author_id', author_id);
    formDataForApi.append('isbn', isbn);
    formDataForApi.append('publication_year', publication_year);
    if (image) {
      formDataForApi.append('image', image);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/adminBooks/addBook`,
        formDataForApi,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      setSubscriptionSuccess(true);
      console.log(response.data);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="createAll container">
      <h3>Add New Books!!</h3>
      <form onSubmit={handleAddBook} className="subscriptionCreate">
        <div className="label-group">
          <label>Name: </label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="label-group">
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
        </div>
        <div className="label-group">
          <label>Author:</label>
          <input type="text" name="author_id" value={formData.author_id} onChange={handleInputChange} required />
        </div>
        <div className="label-group">
          <label>ISBN:</label>
          <input type="number" name="isbn" value={formData.isbn} onChange={handleInputChange} required />
        </div>
        <div className="label-group">
          <label>Publication year: </label>
          <input type="text" name="publication_year" value={formData.publication_year} onChange={handleInputChange} required />
        </div>
        <div className="label-group">
          <label>Image:
            <input className='imageInput' type="file" name="image" onChange={handleImageChange} />
          </label>
        </div>
        <button type="submit" className='submitButton'>Add Book</button>
      </form>
      {subscriptionSuccess && (
        <div className='viewPlan'>
          <div className="subscription-success-message">
            Book added successfully! 🎉
          </div>
          <button id='viewPlanBtn' onClick={() => navigate('/books')}> View all Books</button>
        </div>
      )}
    </div>
  );
};

export default AddBookForm;
