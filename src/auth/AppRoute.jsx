import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "../components/admin/admin";
import Home from "../components/Home";
import AddTask from "../components/gestionTask/AddTask";
import Contact from "../components/Contact";
const AppRoute = () => {

    return (
        <Routes>
          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />     
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/contact" element={<Contact />} />
          
        </Routes>
      );

}

export default AppRoute