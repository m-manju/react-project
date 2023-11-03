import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  username: string;
  password: string;
}

interface ErrorValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState<FormValues>({ username: '', password: ''});
  const [errors, setErrors] = useState<ErrorValues>({username: '',password: ''});

  const handleInput = (event: ChangeEvent<HTMLInputElement>) : void => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void  => {
    event.preventDefault();
    if (values.username.trim() === '') {
      setErrors(prevErrors => ({ ...prevErrors, username: 'Username is required' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, username: '' }));
    }

    if (values.password.length < 1) {
      setErrors(prevErrors => ({ ...prevErrors, password: 'Password is required' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, password: '' }));
    }

    if (values.username.trim() !== '' && values.password.length >= 1) {
      axios.post('http://localhost:3001/auth/login', values)
        .then(res => {
          console.log(res);
          if (res.data.success) {
            localStorage.setItem('token', res.data.token);
            navigate('/');
            console.log('stored in local storage', res.data.token)
          } else {
            console.log('Login failed');
          }
        })
        .catch(err => console.log(err));
    }
  };


  return (
    <div className="App">
      <Header showNavigation={false}/>
      <div className='formDiv'>
        <h3>Login here</h3>
        <form className='formClass' action='' onSubmit={handleSubmit}>
          <label htmlFor="name">Username: </label>
          <input type="text" id="name" name="username" onChange={handleInput} />
          {errors.username && <span>{errors.username}</span>}
          <br />
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" onChange={handleInput} />
          {errors.password && <span>{errors.password}</span>}
          <br />
          <button type="submit" className='submitButton'>Login</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
