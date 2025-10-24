import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Bookings.css";

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loggedInEmail, setLoggedInEmail] = useState("");

  useEffect(() => {
    const facultyid = localStorage.getItem("facultyid"); // Get facultyid from localStorage

    if (!facultyid) {
      alert("User is not logged in.");
      navigate("/login"); // Redirect to login if facultyid is not found
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/book", {
          params: { facultyid }, // Send facultyid as a query parameter
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        alert("Failed to fetch bookings.");
      }
    };

    // Get logged in email and set it in state
    const email = localStorage.getItem("email"); // Assuming email is stored in localStorage
    setLoggedInEmail(email);

    fetchBookings();
  }, [navigate]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "approved";
      case "Pending":
        return "pending";
      case "Rejected":
        return "rejected";
      default:
        return "";
    }
  };

  // Get first letter of email
  const getFirstLetter = (email) => {
    return email ? email.charAt(0).toUpperCase() : "";
  };

  return (
    <div className="bookings-container">
      <aside className="bookings-sidebar">
        <h1 className="bookings-logo">BIT TRANSIT</h1>
        <nav className="bookings-menu">
          <li className="bookings-menu-item" onClick={() => navigate("/home")}>
            Dashboard
          </li>
          <li className="bookings-menu-item active">Bookings</li>
          <li className="bookings-menu-item" onClick={() => navigate("/profile")}>
            Phonebook
          </li>
        </nav>
        <button className="bookings-logout" onClick={() => navigate("/out")}>
          Logout
        </button>
      </aside>

      <main className="bookings-main-content">

        <section className="bookings-table full-page">
          
          <table className="table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>From</th>
                <th>To</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Purpose</th>
                <th>Vehicle</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Allotted Driver</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{booking.from}</td>
                  <td>{booking.to}</td>
                  <td>{booking.from_date}</td>
                  <td>{booking.to_date}</td>
                  <td>{booking.purpose}</td>
                  <td>{booking.vehicle_variant}</td>
                  <td className={getStatusClass(booking.status)}>
                    {booking.status}
                  </td>
                  <td>{booking.remarks}</td>
                  <td>{booking.driveralloted || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Bookings;
