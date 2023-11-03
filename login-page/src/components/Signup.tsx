import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import Footer from './Footer';

interface SignupPros {
    username: string;
    email : string;
    password: string;
}
interface ErrorValues {
    username: string;
    email : string;
    password: string;
}

const Signup: React.FC = () => {
    const navigate = useNavigate();
  
    const [signupValues, setSignupValues] = useState<SignupPros>({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState<ErrorValues>({username: '',email: '', password: ''});
  
    const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
      setSignupValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };
  
    const handleSignup = (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      if (signupValues.username.trim() === '') {
        setErrors(prevErrors => ({ ...prevErrors, username: 'Username is required' }));
      } else {
        setErrors(prevErrors => ({ ...prevErrors, username: '' }));
      }
      if (signupValues.email.trim() === '') {
        setErrors(prevErrors => ({ ...prevErrors, email: 'Email is required' }));
      } else {
        setErrors(prevErrors => ({ ...prevErrors, email: '' }));
      }
  
      if (signupValues.password.length < 1) {
        setErrors(prevErrors => ({ ...prevErrors, password: 'Password is required' }));
      } else {
        setErrors(prevErrors => ({ ...prevErrors, password: '' }));
      }
  
      if (signupValues.username.trim() !== '' && signupValues.password.length >= 1 && signupValues.email.trim() !== '') {
      axios.post('http://localhost:3001/auth/signup', signupValues)
        .then(res => {
          console.log(res);
          navigate('/login');
          console.log('Succesfull signup ')
        })
        .catch(err => {
          if (err.response && err.response.status === 400) {
            console.log("Username already taken, use any other name");
            setErrors(prevErrors => ({ ...prevErrors, username: 'Username already taken, use any other name' }));
          } else {
            console.log("Error:", err);
          }
        });
    }
    };
  
    return (
      <>
        <div className="formDiv">
            <h3>Signup here!</h3>
            <form className='formClass' action='' onSubmit={handleSignup}>
              <label htmlFor="name">Username: </label>
              <input type="text" id="name" name="username" onChange={handleInput} />
              {errors.username && <span>{errors.username}</span>}
              <br/>
              <label htmlFor="email">Email: </label>
              <input type="text" id="email" name="email" onChange={handleInput} />
              {errors.email && <span>{errors.email}</span>}
              <br />
              <label htmlFor="password">Password: </label>
              <input type="password" id="password" name="password" onChange={handleInput} />
              {errors.password && <span>{errors.password}</span>}
              <br />
              <button type="submit" className='submitButton'>Sign Up</button>
           </form>
           <p>Login to epicEntertain <Link to="/login">Login here</Link></p> 
        </div>
        <Footer/>
      </>
    );
  };
  
  export default Signup;
  