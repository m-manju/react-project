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
  image_url?: string; 
}

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');

  const handleAddToCart = (book: Book, quantity: number) => {
    dispatch(addToCart({ id: book.id, bookName: book.bookName, quantity }));
    console.log(`Book with ID ${book.id}, ${book.bookName} added to the cart.`);
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

  useEffect(() => {
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
      <div>
        <h2>Books</h2>
        <div  className='BookSide1'>
        {books.map((book: Book) => (
          <div key={book.id} className="bookBox">
            <div className='bookDetails'>
              <div>
              <p className='bookName'>Book: {book.bookName}</p>
              <p>Description: {book.description}</p>
              <p>isbn: {book.isbn}</p>
              <button className="addToCartBtn" onClick={() => handleAddToCart(book, 0)}> Add to Room</button>
              </div>
              {book.image_url && <img src={book.image_url} alt={`Cover of ${book.bookName}`}  className='bookImage' />}
            </div>
            {adminToken && (
              <button className="addToCartBtn" onClick={() => handleDelete(book.id)}>Delete</button>
            )}
          </div>
        ))}</div>
        </div>
        <Sidebar />
      </div>

      <Footer />
    </div>
  );
};

export default Books;