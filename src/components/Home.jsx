import { Link } from 'react-router-dom';
import ShowTask from './gestionTask/ShowTask';
import {  AuthContext } from '../auth/AuthProvider';
import { useContext, useEffect } from 'react';


const Home = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  // Utilisation de useEffect pour vérifier si l'authentification est réussie
  useEffect(() => {
    if (isLoggedIn) {
      console.log('Authentication successful!');
    } else {
      console.log('Authentication failed.');
    }
  }, [isLoggedIn,logout]); // Exécute le bloc de code à chaque fois que la valeur de isLoggedIn change

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome to the Home Page</h1>
          <ShowTask />
          <Link className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2" to="/addTask">Add a Task</Link>
          <button className="bg-red-500" onClick={logout}></button>
        </div>
      ) : (
        <p>Please login to access more features.</p>
      )}
    </div>
  );
};

export default Home;
