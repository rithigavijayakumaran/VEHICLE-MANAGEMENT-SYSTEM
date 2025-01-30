import React from 'react';
import './App.css'; // Global CSS
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login'; // Login Component
import Home from './components/Home'; // Home Component
import Book from './components/Book1';
import Profile from './components/Profile';
import Bookings from './components/Bookings';
import Response from './components/Response';
import Adminhome from './components/Adminhome';
import AdminBookings from './components/Adminbookings';
import Adminavailablestaff from './components/Adminavailablestaff';
import Vehicle from './components/Vehicle';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/book" element={<Book />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/out" element={<Login />} />
          <Route path="/response" element={<Response />} />
          <Route path="/adminhome" element={<Adminhome />} />
          <Route path="/adminbookings" element={<AdminBookings />} />
          <Route path="/adminavailablestaff" element={<Adminavailablestaff />}/>
          <Route path="/vehicle" element={<Vehicle/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
