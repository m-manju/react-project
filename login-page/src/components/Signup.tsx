// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Footer from './Footer';

// interface SignupPros {
//   username: string;
//   email: string;
//   password: string;
// }

// interface ErrorValues {
//   username: string;
//   email: string;
//   password: string;
// }

// const Signup: React.FC = () => {
//   const navigate = useNavigate();
//   const [signupValues, setSignupValues] = useState<SignupPros>({ username: '', email: '', password: '' });
//   const [errors, setErrors] = useState<ErrorValues>({ username: '', email: '', password: '' });

//   const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
//     setSignupValues(value => ({ ...value, [event.target.name]: event.target.value }));
//     setErrors({ ...errors, [event.target.name]: '' }); 
//   };

//   const handleSignup = (event: FormEvent<HTMLFormElement>): void => {
//     event.preventDefault();
//     const newErrors: ErrorValues = { username: '', email: '', password: '' };
//     if (signupValues.username.trim() === '') {
//       newErrors.username = 'Username is required';
//     }
//     if (signupValues.email.trim() === '') {
//       newErrors.email = 'Email is required';
//     }
//     if (signupValues.password.length < 1) {
//       newErrors.password = 'Password is required';
//     }
//     setErrors({ ...newErrors });

//     if (!newErrors.username && !newErrors.email && !newErrors.password) {
//       axios.post('http://localhost:3001/auth/signup', signupValues)
//         .then(res => {
//           console.log(res);
//           localStorage.setItem('token', res.data.token);
//           navigate('/');
//           console.log('Successful signup');
//         })
//         .catch(err => {
//           if (err.response && err.response.status === 400) {
//             console.log("Username already taken, use any other name");
//             setErrors(prevErrors => ({ ...prevErrors, username: 'Username already taken, use any other name' }));
//           } else {
//             console.log("Error:", err);
//           }
//         });
//     }
//   };

//   return (
//     <>
//       <div className="formDiv">
//         <h3>Signup here!</h3>
//         <form className='formClass' action='' onSubmit={handleSignup}>
//           <label>Username: </label>
//           <input type="text" id="name" name="username" onChange={handleInput} />
//           {errors.username && <span>{errors.username}</span>}
//           <br />
//           <label>Email: </label>
//           <input type="text" id="email" name="email" onChange={handleInput} />
//           {errors.email && <span>{errors.email}</span>}
//           <br />
//           <label>Password: </label>
//           <input type="password" id="password" name="password" onChange={handleInput} />
//           {errors.password && <span>{errors.password}</span>}
//           <br />
//           <button type="submit" className='submitButton'>Sign Up</button>
//         </form>
//         <p>Already signed up? Login to EpicEntertain <button onClick={() => navigate('/login')}>Login here</button></p>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Signup;
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

interface SignupPros {
  username: string;
  email: string;
  password: string;
}

interface ErrorValues {
  username: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [signupValues, setSignupValues] = useState<SignupPros>({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState<ErrorValues>({ username: '', email: '', password: '' });

  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setSignupValues(value => ({ ...value, [event.target.name]: event.target.value }));
    setErrors({ ...errors, [event.target.name]: '' });
  };

  const handleSignup = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const newErrors: ErrorValues = { username: '', email: '', password: '' };
    if (signupValues.username.trim() === '') {
      newErrors.username = 'Username is required';
    }
    if (signupValues.email.trim() === '') {
      newErrors.email = 'Email is required';
    }
    if (signupValues.password.length < 1) {
      newErrors.password = 'Password is required';
    }
    setErrors({ ...newErrors });

    if (!newErrors.username && !newErrors.email && !newErrors.password) {
      axios.post('http://localhost:3001/auth/signup', signupValues)
        .then(res => {
          console.log(res);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('username', signupValues.username);
          console.log('username', signupValues.username);
          navigate('/'); // Redirect to home page after successful signup
          console.log('Successful signup');
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
           <label>Username: </label>
           <input type="text" id="name" name="username" onChange={handleInput} />
           {errors.username && <span>{errors.username}</span>}
           <br />
           <label>Email: </label>
           <input type="text" id="email" name="email" onChange={handleInput} />
           {errors.email && <span>{errors.email}</span>}
           <br />
           <label>Password: </label>
           <input type="password" id="password" name="password" onChange={handleInput} />
           {errors.password && <span>{errors.password}</span>}
           <br />
           <button type="submit" className='submitButton'>Sign Up</button>
         </form>
        <p>Already signed up? Login to EpicEntertain <button onClick={() => navigate('/login')}>Login here</button></p>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
