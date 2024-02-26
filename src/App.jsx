
import Navbar from './components/Navbar'
import Login from './auth/Login'
import Register from './auth/Register'
import AddTask from './components/gestionTask/AddTask'
import Home from './components/Home'
import Contact from './components/Contact'
import Dashboard from './components/admin/admin'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() { 

  return (
<>

<Navbar/>



<Routes>
<Route path='/Login' element={<Login/>}></Route>
<Route path='/Register' element={<Register/>}></Route> 
<Route path='/' element={<Home/>}></Route>
<Route path='/Dashboard' element={<Dashboard />} />
<Route path='/addTask' element={<AddTask/>}></Route>
<Route path='/Contact' element={<Contact/>}></Route>
</Routes>
</>

  )
}

export default App
