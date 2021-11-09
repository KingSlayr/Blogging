import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Blog from './components/Blog'
import User from './components/User'
import Login from "./components/Login";
import Register from "./components/Register";
import CreateBlog from "./components/CreateBlog";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState({})

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user)
    } else {
      // console.log('user not found');
    }
  });
  // console.log(currentUser);


  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/blog/:id" element={<Blog/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/user/:id" element={<User/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/createblog" element={<CreateBlog/>} />
      </Routes>
    </Router>
  );
}

export default App;