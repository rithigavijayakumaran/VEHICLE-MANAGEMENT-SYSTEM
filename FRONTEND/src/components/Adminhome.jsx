import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Adminhome.css";

const AdminHome = () => {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get("http://localhost:3023/api/book");
        const bookings = response.data;

        // Calculate counts based on booking status
        const total = bookings.length;
        const approved = bookings.filter((booking) => booking.status === "Approved").length;
        const pending = bookings.filter((booking) => booking.status === "Pending").length;
        const rejected = bookings.filter((booking) => booking.status === "Rejected").length;

        setCounts({ total, approved, pending, rejected });
      } catch (error) {
        console.error("Error fetching booking counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="vehiclepage-container">
      {/* Sidebar */}
      <aside className="vehiclepage-sidebar">
        <h1 className="vehiclepage-logo">BIT TRANSIT</h1>
        <nav className="vehiclepage-menu">
          <li className="vehiclepage-menu-item active">Home</li>
          <li className="vehiclepage-menu-item" onClick={() => navigate("/adminbookings")}>
            Bookings
          </li>
          <li className="vehiclepage-menu-item" onClick={() => navigate("/adminavailablestaff")}>
            Staffs
          </li>
          <li className="vehiclepage-menu-item" onClick={() => navigate("/Vehicle")}>
            Vehicle
          </li>
        </nav>
        <button className="vehiclepage-logout" onClick={() => navigate("/out")}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="vehiclepage-main-content">
        <header className="admin-home__header">
          <h3 className="admin-home__welcome-text">Welcome Back, Admin!</h3>
          <div className="admin-home__profile-pic-container">
            {/* Display "A" instead of image */}
            <div className="admin-home__profile-pic">
              A
            </div>
          </div>
        </header>
        <div className="admin-home__content">
          <div className="admin-home__cards">
            <div className="admin-home__card admin-home__card--total-requests">
              <p>TOTAL REQUESTS</p>
              <button className="admin-home__button">{counts.total}</button>
            </div>
            <div className="admin-home__card admin-home__card--approved">
              <p>TOTAL REQUESTS APPROVED</p>
              <button className="admin-home__button">{counts.approved}</button>
            </div>
            <div className="admin-home__card admin-home__card--under-initiation">
              <p>REQUESTS UNDER INITIATION</p>
              <button className="admin-home__button">{counts.pending}</button>
            </div>
            <div className="admin-home__card admin-home__card--rejected">
              <p> TOTAL REQUESTS REJECTED</p>
              <button className="admin-home__button">{counts.rejected}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
