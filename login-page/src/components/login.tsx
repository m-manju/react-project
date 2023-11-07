import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    setValues({ ...values, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' }); 
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const newErrors: Errors = { username: '', password: '' };

    if (values.username.trim() === '') {
      newErrors.username = 'Username is required';
    }
    if (values.password.length < 1) {
      newErrors.password = 'Password is required';
    }
    setErrors({ ...newErrors });

    if (!newErrors.username && !newErrors.password) {
      axios.post('http://localhost:3001/auth/login', values)
        .then(res => {
          console.log(res);
          if (res.data.success) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
            navigate('/');
            console.log('stored in local storage', res.data.token);
          } else {
            console.log('Login failed');
          }
        })
        .catch(err => {
          if (err.response && err.response.status === 401) {
            setErrors(prevErrors => ({ ...prevErrors, username: 'Please enter a valid Username' }));
          } else if (err.response && err.response.status === 409) {
            setErrors(prevErrors => ({ ...prevErrors, password: 'Incorrect password' }));
          } else {
            console.log('Error:', err);
          }
        });
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="App">
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
        <p>New to EpicEntertain? <button className='signupBtnInLogin' onClick={handleSignUp}>Sign Up now</button></p>
      </div>
    </div>
  );
};

export default Login;
