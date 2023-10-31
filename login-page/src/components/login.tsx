import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import validation from '../LoginValidation';
import axios from 'axios'
import {Link} from 'react-router-dom'


interface FormValues {
  Username: string;
  className: string;
  password: string;
}

interface ErrorValues {
  Username: string;
  password: string;
}

const Login: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    Username: '',
    className: '',
    password: ''
  });
  const [errors, setErrors] = useState<ErrorValues>({ Username: '', password: '' });

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);
    if(errors.Username ==="" && errors.password === ""){
      axios.post('http://localhost:3001/auth/login', values)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    } 
  };

  return (
    <div className="App">
      <Header />
      <div className='formDiv'>
        <h3>Login here</h3>
        <form className='formClass' action='' onSubmit={handleSubmit}>
          <label id="name">Username: </label>
          <input type="text" id="name" name="Username" onChange={handleInput}/>
          {errors.Username && <span>{errors.Username}</span>}
          <br/>
          <label id="password">Password : </label>
          <input type="password" id="password" name="password" onChange={handleInput}/>
          {errors.password && <span>{errors.password}</span>}
          <br/>
          <Link to="/Home" type="submit" className='submitButton'>Login</Link>
        </form>
      </div>
      <Footer />
    </div>
  );
}


export default Login;
