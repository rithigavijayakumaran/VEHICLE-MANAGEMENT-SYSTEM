import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Adminavailablestaff.css";

const Adminavailablestaff = () => {
    const [staffData, setStaffData] = useState([]); // State to hold driver data
    const [loading, setLoading] = useState(true); // State to handle loading
    const navigate = useNavigate();

    const navigateToHomePage = () => navigate('/home');
    const navtobookings = () => navigate('/bookings');
    

    // Fetch driver data from the backend
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get('http://localhost:3023/api/driver');
                setStaffData(response.data); // Update the state with the fetched data
                setLoading(false); // Stop the loading spinner
            } catch (error) {
                console.error("Error fetching driver data:", error);
                setLoading(false);
            }
        };

        fetchDrivers();
    }, []);

    return (
        <div className="adminavailablestaff-container">
            {/* Sidebar */}
            <aside className="admin-bookings-sidebar">
        <h1 className="admin-bookings-logo">BIT TRANSIT</h1>
        <nav className="admin-bookings-menu">
          <li className="admin-bookings-menu-item" onClick={navigateToHomePage}>
            Dashboard
          </li>
          <li className="admin-bookings-menu-item" onClick={navtobookings}>Bookings</li>
          <li className="admin-bookings-menu-item active">
            Phonebook
          </li>
        </nav>
        <button className="admin-bookings-logout" onClick={() => navigate("/out")}>
          Logout
        </button>
      </aside>

            {/* Main Content */}
            <main className="adminavailablestaff-main-content">
                

                <section className="adminavailablestaff-table full-page">
                    <table>
                        <thead>
                            <tr>
                                <th>Staff ID</th>
                                <th>Staff Name</th>
                                <th>Age</th>
                                <th>Contact Number</th>
                            </tr>
                        </thead>
                        <tbody>
                                {staffData.map((staff, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{staff.staffname}</td>
                                        <td>{staff.age}</td>
                                        <td>{staff.contact}</td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                    
                </section>
            </main>
        </div>
    );
};

export default Adminavailablestaff;
