import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Response.css';

const Response = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/bookings'); // Redirect to the bookings page
  };

  return (
    <div className="response-container">
      <div className="response-message">
        <h3>Successfully Booked!</h3>
        <p>Your booking has been confirmed.</p>
      </div>
      <button className="back-button" onClick={handleGoBack}>
        Go Back to Bookings
      </button>
    </div>
  );
};

export default Response;
