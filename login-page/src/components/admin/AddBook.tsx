import React, { useState } from 'react';
import axios from 'axios';

const AddBookForm: React.FC = () => {
    const [subscriptionSuccess, setSubscriptionSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    author_id: '',
    isbn: '',
    publication_year: '',
    image: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const adminToken = localStorage.getItem('adminToken');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] as File });
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
    <div className="createForm container">
    <h3>Add New Books!!</h3>
    <form onSubmit={handleAddBook} className="subscriptionForm">
      <label>Name:
      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
      </label>
      <label>Description:
      <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
      </label>
      <label>Author:
      <input type="text" name="author_id" value={formData.author_id} onChange={handleInputChange} required />
      </label>
      <label>ISBN:
      <input type="number" name="isbn" value={formData.isbn} onChange={handleInputChange} required />
      </label>
      <label>Publication year:
      <input type="text" name="publication_year" value={formData.publication_year} onChange={handleInputChange} required />
      </label>
      <label>Image:
      <input type="file" name="image" onChange={handleImageChange} />
      </label>
      <button type="submit"  className='submitButton'>Add Book</button>
    </form>
    {subscriptionSuccess && (
        <div className="subscription-success-message">
          Book added successfully! 🎉
        </div>
      )}
    </div>
  );
};

export default AddBookForm;