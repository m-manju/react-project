import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import './../App.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cart';

interface Book {
  id: number;
  bookName: string;
  name: string;
  author: string;
  description: string;
  isbn: number;
  author_id: number;
  publication_year: number;
}

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');

  const fetchBooks = async () => {
    try {
      const headers = adminToken ? { Authorization: `Bearer ${adminToken}` }: { Authorization: `Bearer ${token}` };

      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/books`, {
        headers,
      });

      setBooks(response.data?.books || []);
      console.log('fetching books');
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddToCart = (book: Book, quantity: number) => {
    dispatch(addToCart({ id: book.id, bookName: book.bookName, quantity }));
    console.log(`Book with ID ${book.id}, ${book.bookName} added to the cart.`);
  };

  const openEditModal = (book: Book) => {
    console.log('Editing book:', book);
    setEditBook(book);
    setEditModalOpen(true);
  };
  
  const closeEditModal = () => {
    setEditBook(null);
    setEditModalOpen(false);
  };

  const handleDelete = async (bookId: number) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/adminBooks/delete/${bookId}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      if (response.data.success) {
        console.log('Book deleted successfully');
        fetchBooks();
      } else {
        console.error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleFileOpen = async (bookId: number) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/adminBooks/getBook/${bookId}`);

      if (response.data.success) {
        setFileUrl(response.data.fileUrl);
      } else {
        console.error('Failed to get book file URL');
      }
    } catch (error) {
      console.error('Error getting book file:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setEditBook((prevEditBook) => ({
      ...prevEditBook!,
      [name]: name === 'publicationYear'? parseInt(value, 10) : value,
    }));
  };  
  
  const handleEditSubmit = async () => {
    try {
      console.log('Editing book ID:', editBook!.id);
  
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/adminBooks/edit/${editBook!.id}`,
        { ...editBook },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      ).then(response => {
        console.log(adminToken);
      })
      .catch(error => {
        console.error('Error  editing book:', error);
      })
  
      console.log('Edit response:', response);
      console.log(adminToken);
      closeEditModal();
      fetchBooks();
    } catch (error: any) {
      console.error('Error editing book:', error);
      console.error('Full error object:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };
  

  useEffect(() => {
    if (!token && !adminToken) {
      navigate('/login');
    } else {
      fetchBooks(); 
    }
  }, [navigate, token,adminToken]);

  return (
    <div>
      <Header showNavigation={true} />
      <div className="container allBooks">
        <h2>Books</h2>
        {books.map((book: Book) => (
          <div key={book.id} className="bookBox">
            <div>
              <p>Book: {book.bookName}</p>
              <p>Description: {book.description}</p>
              <p>isbn: {book.isbn}</p>
            </div>
            <button className="addToCartBtn" onClick={() => handleAddToCart(book, 0)}>
              Add to Room
            </button>
            <button className="addToCartBtn" onClick={() => openEditModal(book)}>
              Edit
            </button>
            <button className="addToCartBtn" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="addToCartBtn" onClick={() => handleFileOpen(book.id)}>
              Open File
            </button>
          </div>
        ))}
        <Sidebar />
      </div>

      {editModalOpen && (
        <div className="edit-modal">
          <h3>Edit Book</h3>
          <form>
            <label>Book Name:</label>
            <input type="text" name="bookName" value={editBook?.bookName} onChange={handleInputChange}/>
            <br />
            <label>Description:</label>
            <input type="text" name="description" value={editBook?.description} onChange={handleInputChange} />
            <br />
            <label>Publication Year:</label>
            <input type="number" name="publicationYear"value={editBook?.publication_year} onChange={handleInputChange}/>
            <br />
            <button type="button" onClick={handleEditSubmit}>
              Save Changes
            </button>
            <button type="button" onClick={closeEditModal}>
              Cancel
            </button>
          </form>
        </div>
      )}
      {fileUrl && (
        <div className="file-viewer">
          <h3>File Viewer</h3>
          <iframe title="file-viewer" src={fileUrl} width="100%" height="500px" />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Books;
