interface FormValues {
    Username: string;
    className: string;
    password: string;
  }
  
interface ErrorValues {
  Username: string;
  password: string;
}

const validation = (values: FormValues): ErrorValues => {
  const errors: ErrorValues = { Username: '', password: '' };

  if (!values.Username.trim()) {
    errors.Username = 'Username is required';
  }
  if (values.password.length < 6) {
    errors.password = 'Password should be at least 6 characters long';
  }
  return errors;
};

export default validation;
