import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokken, setTokken] = useState(null);

  const login = (jwtToken) => {
    setIsLoggedIn(true);
    setTokken(jwtToken);
    localStorage.setItem('jwtToken', jwtToken); // Store the JWT token in local storage
  };

  const logout = () => {
    setIsLoggedIn(false);
    setTokken(null);
    localStorage.removeItem('jwtToken'); // Remove the JWT token from local storage
  };

  // Load the JWT token from local storage on component mount
  useEffect(() => {
    const storedJwtToken = localStorage.getItem('jwtToken');
    if (storedJwtToken) {
      login(storedJwtToken);
    }
  }, []);

  const value = {
    isLoggedIn,
    tokken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value} {...props} />;
};

export { AuthContext, AuthProvider };