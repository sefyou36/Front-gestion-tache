import { useState } from "react";
import { validateEmail } from "../Utiles";

const PasswordErrorMessage = () => {

    return (
   <p className="FieldError">Password should have at least 8 characters</p>
 );


};

const  Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState({
      value: "",
      isTouched: false,
    });
    const getIsFormValid = () => { 
        return ( 
          firstName && 
          validateEmail(email) && 
          password.value.length >= 8
        ); 
      }; 
      const clearForm = () => { 
        setFirstName(""); 
        setLastName(""); 
        setEmail(""); 
        setPassword({ 
          value: "", 
          isTouched: false, 
        }); 
  
      }; 
      const handleSubmit = (e) => {
        
        e.preventDefault()
        alert("Account created!");
        clearForm();
        
      };

 return (
    <div className="Register">
      <div className="Register-Container">
        <h1 className="font-bold">Register Page</h1>
        <form onSubmit={handleSubmit}>
            <fieldset>
          <div className="Input-Field">
            <label >First Name *</label>
            <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="First Name" type="text" required />
          </div>
          <div className="Input-Field">
            <label>Last Name *</label>
            <input  value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Last Name" type="text" required />
          </div>
          <div className="Input-Field">
            <label>Email *</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" name="email" required />
          </div>
          <div className="Input-Field">
            <label>Password *</label>
            <input value={password.value} onBlur={()=>setPassword({...password,isTouched:true})} onChange={(e)=>setPassword({...password,value: e.target.value})} type="password" required />
            {(password.value.length < 8 && password.isTouched) ? (<PasswordErrorMessage/>):null}
          </div>
          <button type="submit" disabled={!getIsFormValid()}>Register</button>
          </fieldset>
        </form>
        <p>Already have a account? click <a href="/Login">here</a> to login</p>
      </div>
    </div>
 );
}

export default Register;