import React, { useState } from 'react';
import { Routes, Route } from "react-router"
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Blogs from '../pages/Blogs';
import BlogDetail from '../pages/BlogDetail';
import CreateBlog from '../pages/CreateBlog';
import UserDashboard from '../pages/UserDashboard';
import EditBlog from '../pages/EditBlog';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/blogs' element={<Blogs/>} />
        <Route path='/blogDetail/:id' element={<BlogDetail/>} />
        <Route path='/edit/:id' element={<EditBlog/>} />
        <Route path='/create' element={<CreateBlog/>} />
        <Route path='/userDashboard' element={<UserDashboard/>} />
      </Routes>
    </div>
  )
}

export default App
