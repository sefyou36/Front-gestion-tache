import { useState } from "react";
import { validateEmail } from "../Utiles";

const PasswordErrorMessage = () => {

    return (
   <p className="FieldError">Password should have at least 8 characters</p>
 );


};


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState({
      value: "",
      isTouched: false,
    });
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
      const handleSubmit = (e) => {
        
        e.preventDefault()
        clearForm();
      };
 return (
    <div className="Login">
      <div className="login-container">
        <h1 className="font-bold">Login Page</h1>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <form onSubmit={handleSubmit}>
          <p className="text-start">Email *</p>  
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" placeholder="Email *" required />
          <p className="text-start">Password *</p>
          <input value={password.value} onBlur={()=>setPassword({...password,isTouched:true})} onChange={(e)=>setPassword({...password,value: e.target.value})} type="password" name="password" placeholder="Password *" />
          {(password.value.length < 8 && password.isTouched) ? (<PasswordErrorMessage/>):null}
          <button type="submit" disabled={!getIsFormValid()}>Login</button>
        </form>
        <p>U dont have a account? click <a href="/register">here</a> to register</p>
      </div>
    </div>
 );
}

export default Login;