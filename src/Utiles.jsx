export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  export const PasswordErrorMessage = () => {
    return <p className="FieldError">Password should have at least 8 characters</p>;
  };
  
  export const EmailNotFoundErrorMessage = () => {
    return <p className="FieldError">Email not found</p>;
  };
  
 export  const PasswordIncorrectErrorMessage = () => {
    return <p className="FieldError">Password incorrect</p>;
  };
  