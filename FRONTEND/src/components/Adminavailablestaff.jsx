import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Adminavailablestaff.css";

const Adminavailablestaff = () => {
    const [staffData, setStaffData] = useState([]); // State to hold driver data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility
    const [newStaff, setNewStaff] = useState({ staffname: "", age: "", contact: "" }); // State to hold new staff data
    const navigate = useNavigate();

    const navigateToHomePage = () => navigate('/adminhome');
    const logout = () => navigate('/login');
    const navtobookings = () => navigate('/adminbookings');

    // Fetch driver data from the backend
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/driver');
                setStaffData(response.data); // Update the state with the fetched data
                setLoading(false); // Stop the loading spinner
            } catch (error) {
                console.error("Error fetching driver data:", error);
                setLoading(false);
            }
        };

        fetchDrivers();
    }, []);

    const handleFormChange = (e) => {
        setNewStaff({
            ...newStaff,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3023/api/driver', newStaff);
            setStaffData([...staffData, response.data]); // Add the new staff to the current list
            setShowForm(false); // Hide the form after submission
        } catch (error) {
            console.error("Error adding staff:", error);
        }
    };

    return (
        <div className="adminavailablestaff-container">
            {/* Sidebar */}
            <aside className="admin-bookings-sidebar">
                <h1 className="admin-bookings-logo">BIT TRANSIT</h1>
                <nav className="admin-bookings-menu">
                    <li className="admin-bookings-menu-item" onClick={() => navigate("/adminhome")}>
                        Home
                    </li>
                    <li className="admin-bookings-menu-item" onClick={navtobookings}>Bookings</li>
                    <li className="admin-bookings-menu-item active" onClick={() => navigate("/adminavailablestaff")}>
                        Staffs
                    </li>
                    <li className="admin-bookings-menu-item" onClick={() => navigate("/vehicle")}>Vehicle</li>
                </nav>
                <button className="admin-bookings-logout" onClick={() => navigate("/out")}>
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="adminavailablestaff-main-content">
                <section className="adminavailablestaff-table full-page">
                    {/* Add Staff Button */}
                    <button 
                        className="adminavailablestaff-add-btn" 
                        onClick={() => setShowForm(!showForm)}>
                        Add Staff
                    </button>

                    {/* Show Form if showForm is true */}
                    {showForm && (
                        <form className="adminavailablestaff-form" onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label>
                                    Staff Name:
                                    <input 
                                        type="text" 
                                        name="staffname" 
                                        value={newStaff.staffname} 
                                        onChange={handleFormChange} 
                                        required 
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Age:
                                    <input 
                                        type="number" 
                                        name="age" 
                                        value={newStaff.age} 
                                        onChange={handleFormChange} 
                                        required 
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Contact Number:
                                    <input 
                                        type="text" 
                                        name="contact" 
                                        value={newStaff.contact} 
                                        onChange={handleFormChange} 
                                        required 
                                    />
                                </label>
                            </div>
                            <button type="submit" className="adminavailablestaff-submit-btn">Submit</button>
                        </form>
                    )}

                    {/* Staff Table */}
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
