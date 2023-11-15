import React, { useState } from 'react';
import axios from 'axios';

const AddBookFormWithFile: React.FC = () => {
  const [bookAdded, setBookAdded] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    author_id: '',
    isbn: '',
    publication_year: '',
    bookFile: null as File | null,
  });

  const adminToken = localStorage.getItem('adminToken');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, bookFile: e.target.files[0] as File });
    }
  };

  const handleAddBookWithFile = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, author_id, isbn, publication_year, bookFile } = formData;

    const formDataForApi = new FormData();
    formDataForApi.append('name', name);
    formDataForApi.append('description', description);
    formDataForApi.append('author_id', author_id);
    formDataForApi.append('isbn', isbn);
    formDataForApi.append('publication_year', publication_year);
    if (bookFile) {
      formDataForApi.append('bookFile', bookFile);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/adminBooks/addBookWithFile`,
        formDataForApi,
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      setBookAdded(true);
      console.log(response.data);
    } catch (error) {
      console.error('Error adding book with file:', error);
    }
  };

  return (
    <div className="createForm container">
      <h3>Add Book with File</h3>
      <form onSubmit={handleAddBookWithFile} className="subscriptionForm">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        <br />
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
        <br />
        <label>Author ID:</label>
        <input type="text" name="author_id" value={formData.author_id} onChange={handleInputChange} required />
        <br />
        <label>ISBN:</label>
        <input type="number" name="isbn" value={formData.isbn} onChange={handleInputChange} required />
        <br />
        <label>Publication Year:</label>
        <input type="text" name="publication_year" value={formData.publication_year} onChange={handleInputChange} required />
        <br />
        <label>Book File:</label>
        <input
          type="file"
          name="bookFile"
          onChange={handleBookFileChange}
          required
        />
        <br />
        <button type="submit" className='submitButton'>Add Book with File</button>
      </form>
      {bookAdded && (
        <div className="book-added-message">
          Book added successfully with file! 🎉
        </div>
      )}
    </div>
  );
};

export default AddBookFormWithFile;
