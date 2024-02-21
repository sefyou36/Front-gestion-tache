import { useState } from "react";
import axios from "axios";
import { validateEmail } from "../Utiles";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [loginError, setLoginError] = useState("");

  const getIsFormValid = () => { 
    return ( 
      validateEmail(email) && 
      password.value.length >= 8
    ); 
  }; 

  const clearForm = () => { 
    setEmail(""); 
    setPassword({ 
      value: "", 
      isTouched: false, 
    }); 
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4200/api/v1/login", {
        email,
        password: password.value,
      });
      
      // Clear form on successful login
      clearForm();
      // Handle successful login (e.g., set user session, redirect)
      console.log("Login successful:", response.data);
    } catch (error) {
      // Handle login error
      if (error.response && error.response.status === 404) {
        setLoginError("Email not found");
      } else if (error.response && error.response.status === 400) {
        setLoginError("Password incorrect");
      } else {
        console.error("Error logging in:", error);
      }
    }
  };

  return (
    <div className="Login">
      <div className="login-container">
        <h1 className="font-bold">Login Page</h1>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        {loginError && (loginError === "Email not found" ? (
          <EmailNotFoundErrorMessage />
        ) : (
          <PasswordIncorrectErrorMessage />
        ))}
        <form onSubmit={handleSubmit}>
          <p className="text-start">Email *</p>  
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" placeholder="Email *" required />
          <p className="text-start">Password *</p>
          <input value={password.value} onBlur={()=>setPassword({...password,isTouched:true})} onChange={(e)=>setPassword({...password,value: e.target.value})} type="password" name="password" placeholder="Password *" />
          {(password.value.length < 8 && password.isTouched) ? (<PasswordErrorMessage/>):null}
          <button type="submit" disabled={!getIsFormValid()}>Login</button>
        </form>
        <p>Don't have an account? Click <a href="/register">here</a> to register</p>
      </div>
    </div>
  );
};

export default Login;
