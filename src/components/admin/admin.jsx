import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthProvider';
import { validateEmail } from '../../Utiles';
import axios from 'axios';

const EmailExistsAlert = () => {
  return <p className="FieldError">Email already exists</p>;
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    password: {
      value: '',
      isTouched: false,
    },
  });
  const [emailExists, setEmailExists] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

  const clearForm = () => {
    setFormData({
      lastName: '',
      firstName: '',
      email: '',
      password: {
        value: '',
        isTouched: false,
      },
    });
    setEmailExists(false);
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:4200/api/v1/user');
      const data = await response.json();
      setUsers(data.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      password: {
        ...formData.password,
        value: e.target.value,
        isTouched: true,
      },
    });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();

    const formDataObj = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password.value,
    };

    axios.post("http://localhost:4200/api/v1/register", formDataObj)
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
    return formData.firstName && validateEmail(formData.email) && formData.password.value.length >= 8;
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleOpenUpdatePopup = (userId) => {
    const userToUpdate = users.find(user => user._id === userId);
    setFormData({
      lastName: userToUpdate.lastName,
      firstName: userToUpdate.firstName,
      email: userToUpdate.email,
      password: '',
    });
    setSelectedUserId(userId);
    setIsUpdatePopupOpen(true);
  };

  const handleCloseUpdatePopup = () => {
    setIsUpdatePopupOpen(false);
    setSelectedUserId(null);
    setFormData({
      lastName: '',
      firstName: '',
      email: '',
      password: '',
    });
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`http://localhost:4200/api/v1/user/${selectedUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/``` json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchAllUsers();
        handleCloseUpdatePopup();
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:4200/api/v1/user/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchAllUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Create New User</h3>
        {emailExists && <EmailExistsAlert />}
        <div className="flex flex-col md:flex-row gap-4">
          <input type="text" name="lastName" placeholder="Last Name" className="border p-2 rounded-md" onChange={handleChange} value={formData.lastName} />
          <input type="text" name="firstName" placeholder="First Name" className="border p-2 rounded-md" onChange={handleChange} value={formData.firstName} />
          <input type="email" name="email" placeholder="Email" className="border p-2 rounded-md" onChange={handleChange} value={formData.email} />
          <input type="password" name="password" placeholder="Password" className="border p-2 rounded-md" onChange={handlePasswordChange} value={formData.password.value} />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleCreateUser} disabled={!getIsFormValid()}>Create User</button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Users List</h3>
        <ul className="space-y-2">
          {users.map(user => (
            <li key={user._id} className="border p-4 rounded-md flex justify-between items-center">
              <div>
                <span className="font-semibold">{user.lastName} {user.firstName}</span>
                <span className="text-gray-500 ml-2">{user.email}</span>
              </div>
              <div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2" onClick={() => handleOpenUpdatePopup(user._id)}>Update</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600" onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isUpdatePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Update User</h2>
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="border p-2 rounded-md mb-2" />
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="border p-2 rounded-md mb-2" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded``` md mb-2" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2" onClick={handleUpdateUser}>Update</button>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400" onClick={handleCloseUpdatePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;