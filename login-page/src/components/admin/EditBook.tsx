import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface EditBookFormProps {
  bookId: number;
  onEditSuccess: () => void;
}

const EditBookForm: React.FC<EditBookFormProps> = ({ bookId, onEditSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    author_id: '',
    isbn: '',
    publication_year: '',
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/books/${bookId}`);
        const bookDetails = response.data;
        setFormData(bookDetails);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditBook = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/adminBooks/edit/${bookId}`, formData);
      console.log('Book edited successfully');
      onEditSuccess();
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };

  return (
    <div className="editBook container">
      <h3>Edit Book</h3>
      <form onSubmit={handleEditBook} className="editBookForm">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />

        <label>Author:</label>
        <input type="text" name="author_id" value={formData.author_id} onChange={handleInputChange} required />

        <label>ISBN:</label>
        <input type="number" name="isbn" value={formData.isbn} onChange={handleInputChange} required />

        <label>Publication year:</label>
        <input type="text" name="publication_year" value={formData.publication_year} onChange={handleInputChange} required />

        <button type="submit" className="submitButton">
          Edit Book
        </button>
      </form>
    </div>
  );
};

export default EditBookForm;
