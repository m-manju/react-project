import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';
import Footer from './Footer';
import './../App.css';

interface Book {
  id: number;
  bookName: string;
  name: string;
  author: string;
  description: string;
  isbn:number;
}
const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
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
      <h2>Books</h2>
      {books.map((book: Book) => (
        <div key={book.id} className='bookBox'>
          <p>Book:{book.bookName}</p>
          <p>Description: {book.description}</p>
          <p>isbn: {book.isbn}</p>
          <hr />
      </div>
      ))}
      <Footer />
    </div>
  );
};

export default Books;
