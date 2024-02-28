import  { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { validateEmail } from '../Utiles';
import { AuthContext } from './AuthProvider';

const PasswordErrorMessage = () => {
  return <p className="FieldError">Password should have at least 8 characters</p>;
};

const EmailNotFoundErrorMessage = () => {
  return <p className="FieldError">Email not found</p>;
};

const PasswordIncorrectErrorMessage = () => {
  return <p className="FieldError">Password incorrect</p>;
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLoginError(''); // Clear login error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4200/api/v1/login', formData);
      const jwtToken = "fake-jwt-token";
      login(jwtToken);

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        login(response.data.token)
        localStorage.setItem('userRole', data.role);
        window.location.href = '/'; // Redirect to home page after successful login
      } else {
        console.error('Failed to login');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setLoginError('Email not found');
      } else if (error.response && error.response.status === 400) {
        setLoginError('Password incorrect');
      } else {
        console.error('Error logging in:', error);
      }
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      window.location.href = '/'; // Redirect to home page if user is logged in
    }
  }, []);

  const getIsFormValid = () => {
    return validateEmail(formData.email) && formData.password.length >= 8;
  };

  return (
    <div className="Login">
      <div className="login-container">
        <h1 className="font-bold">Login Page</h1>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        {loginError && (loginError === 'Email not found' ? (
          <EmailNotFoundErrorMessage />
        ) : (
          <PasswordIncorrectErrorMessage />
        ))}
        <form onSubmit={handleSubmit}>
          <p className="text-start">Email *</p>
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <p className="text-start">Password *</p>
          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
          />
          {formData.password.length < 8 && <PasswordErrorMessage />}
          <button type="submit" disabled={!getIsFormValid()}>Login</button>
        </form>
        <p>Dont have an account? Click <a href="/register">here</a> to register</p>
      </div>
    </div>
  );
};

export default Login;
