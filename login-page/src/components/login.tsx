import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import { post } from '../apiUtils';

interface FormValues {
  username: string;
  password: string;
}

interface Errors {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState<FormValues>({ username: '', password: '' });
  const [errors, setErrors] = useState<Errors>({ username: '', password: '' });

  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const newErrors: Errors = { username: '', password: '' };

    if (!values.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (values.password.length < 1) {
      newErrors.password = 'Password is required';
    }

    setErrors({ ...newErrors });

    if (!newErrors.username && !newErrors.password) {
      try {
        const response = await post('/auth/login', values);

        if (response.success) {
          localStorage.setItem('token', response.token);
          navigate('/');
          console.log('Stored in local storage', response.token);
        } else {
          console.log('Login failed');
        }
      } catch (error: any) {
        handleLoginError(error);
      }
    }
  };

  const handleLoginError = (error: any): void => {
    if (error.response && error.response.status === 401) {
      setErrors(prevErrors => ({ ...prevErrors, username: 'Please enter a valid Username' }));
    } else if (error.response && error.response.status === 409) {
      setErrors(prevErrors => ({ ...prevErrors, password: 'Incorrect password' }));
    } else {
      console.error('Error:', error);
    }
  };


  return (
    <div className="App">
      <Header showNavigation={false} />
      <div className='formDiv'>
        <h3>Login here!</h3>
        <form className='formClass' onSubmit={handleSubmit}>
          <label>Username: </label>
          <input type="text" id="name" name="username" onChange={handleInput} />
          {errors.username && <span>{errors.username}</span>}
          <br />
          <label>Password: </label>
          <input type="password" id="password" name="password" onChange={handleInput} />
          {errors.password && <span>{errors.password}</span>}
          <br />
          <button type="submit" className='submitButton'>Login</button>
        </form>
        <p>New to EpicEntertain? <button className='btnLink' onClick={() => navigate('/signup')}>Sign Up now</button></p>
        <p>ADMIN Login <button className='btnLink' onClick={() => navigate('/adminLogin')}>login</button></p>
      </div>
    </div>
  );
};

export default Login;
