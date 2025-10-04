import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Book1.css';

function Book1() {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    facultyname: '',
    facultyid: '',
    from: '',
    to: '',
    from_date: '',
    to_date: '',
    purpose: '',
    vehicle_variant: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3023/api/book', formDetails);
      alert('Booking successful!');
      navigate('/response'); // Navigate to a confirmation page or home
    } catch (error) {
      alert('Failed to submit booking. Please try again.');
      console.error('Error in booking:', error);
    }
  };

  return (
    <div className="book-container">
      <div className="book-main">
        <h3 className="book-title">GRAB YOUR VEHICLE</h3>
        <div className="book-booking-form">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="book-form-group">
              <label className="book-label">Name</label>
              <input
                type="text"
                name="facultyname"
                value={formDetails.facultyname}
                onChange={handleChange}
                placeholder="Enter your name"
                className="book-input-field"
                required
              />
            </div>
            {/* Faculty ID */}
            <div className="book-form-group">
              <label className="book-label">Faculty ID</label>
              <input
                type="text"
                name="facultyid"
                value={formDetails.facultyid}
                onChange={handleChange}
                placeholder="Enter your faculty ID"
                className="book-input-field"
                required
              />
            </div>
            {/* From */}
            <div className="book-form-group">
              <label className="book-label">From</label>
              <input
                type="text"
                name="from"
                value={formDetails.from}
                onChange={handleChange}
                placeholder="Enter city"
                className="book-input-field"
                required
              />
            </div>
            {/* To */}
            <div className="book-form-group">
              <label className="book-label">To</label>
              <input
                type="text"
                name="to"
                value={formDetails.to}
                onChange={handleChange}
                placeholder="Enter city"
                className="book-input-field"
                required
              />
            </div>
            {/* Dates */}
            <div className="book-form-group row">
              <div className="book-half-input">
                <label className="book-label">From Date</label>
                <input
                  type="date"
                  name="from_date"
                  value={formDetails.from_date}
                  onChange={handleChange}
                  className="book-input-field"
                  required
                />
              </div>
              <div className="book-half-input">
                <label className="book-label">To Date</label>
                <input
                  type="date"
                  name="to_date"
                  value={formDetails.to_date}
                  onChange={handleChange}
                  className="book-input-field"
                  required
                />
              </div>
            </div>
            {/* Purpose */}
            <div className="book-form-group">
              <label className="book-label">Purpose</label>
              <input
                type="text"
                name="purpose"
                value={formDetails.purpose}
                onChange={handleChange}
                placeholder="Enter purpose"
                className="book-input-field"
                required
              />
            </div>
            {/* Vehicle Variant */}
            <div className="book-form-group">
              <label className="book-label">Vehicle Variant</label>
              <input
                type="text"
                name="vehicle_variant"
                value={formDetails.vehicle_variant}
                onChange={handleChange}
                placeholder="Vehicle Name (Number Plate Number)"
                className="book-input-field"
                required
              />
            </div>
            {/* Submit */}
            <button type="submit" className="book-book-button">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Book1;
