import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import './../App.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cart';

interface Book {
  id: number;
  bookName: string;
  name: string;
  author: string;
  description: string;
  isbn: number;
}

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const dispatch = useDispatch();

  const handleAddToCart = (book: Book) => {
    dispatch(addToCart({ id: book.id, bookName: book.bookName, quantity: 1 })); 
    console.log(`Book with ID ${book.id}, ${book.bookName} added to the cart.`);
  };

  useEffect(() => {
    axios.get('http://localhost:3001/books/books')
      .then(response => {
        setBooks(response.data?.books || []);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  return (
    <div>
      <Header showNavigation={true}/>
      <div className='container allBooks'>
        <Sidebar/>
        <h2>Books</h2>
        {books.map((book: Book) => (
          <div key={book.id} className='bookBox'>
            <div>
              <p>Book: {book.bookName}</p>
              <p>Description: {book.description}</p>
              <p>isbn: {book.isbn}</p>
            </div>
            <button className='addToCartBtn' onClick={() => handleAddToCart(book)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Books;
