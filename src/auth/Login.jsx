import { useState } from 'react';
import axios from 'axios';
import { validateEmail } from '../Utiles';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4200/api/v1/login', formData);

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userRole', data.role);
        window.location.href = '/'; // Redirection vers la page d'accueil après la connexion
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
        <p>Don't have an account? Click <a href="/register">here</a> to register</p>
      </div>
    </div>
  );
};

export default Login;
