import { useState } from "react";
import axios from "axios";
import { validateEmail } from "../Utiles";

const PasswordErrorMessage = () => {
  return <p className="FieldError">Password should have at least 8 characters</p>;
};

const EmailExistsAlert = () => {
  return <p className="FieldError">Email already exists</p>;
};

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [emailExists, setEmailExists] = useState(false);

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword({
      value: "",
      isTouched: false,
    });
    setEmailExists(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password.value,
    };

    axios.post("http://localhost:4200/api/v1/register", formData)
      .then(()=> {
        // Handle success
        alert("Account created!");
        clearForm();
      })
      .catch(error => {
        // Handle error
        if (error.response && error.response.status === 400) {
          setEmailExists(true);
        } else {
          console.error('Error creating account:', error);
        }
      });
  };

  const getIsFormValid = () => {
    return firstName && validateEmail(email) && password.value.length >= 8;
  };

  return (
    <div className="Register">
      <div className="Register-Container">
        <h1 className="font-bold">Register Page</h1>
        {emailExists && <EmailExistsAlert />}
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className="Input-Field">
              <label>First Name *</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                type="text"
                required
              />
            </div>
            <div className="Input-Field">
              <label>Last Name *</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                type="text"
                required
              />
            </div>
            <div className="Input-Field">
              <label>Email *</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                name="email"
                required
              />
            </div>
            <div className="Input-Field">
              <label>Password *</label>
              <input
                value={password.value}
                onBlur={() => setPassword({ ...password, isTouched: true })}
                onChange={(e) =>
                  setPassword({ ...password, value: e.target.value })
                }
                type="password"
                required
              />
              {password.value.length < 8 && password.isTouched ? (
                <PasswordErrorMessage />
              ) : null}
            </div>
            <button type="submit" disabled={!getIsFormValid()}>
              Register
            </button>
          </fieldset>
        </form>
        <p>
          Already have an account? click <a href="/Login">here</a> to login
        </p>
      </div>
    </div>
  );
};

export default Register;
