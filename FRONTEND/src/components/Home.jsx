import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [vehicleData, setVehicleData] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch the logged-in user's facultyid and email
    const loggedInFacultyId = localStorage.getItem("facultyid");
    const loggedInEmail = localStorage.getItem("userEmail");

    // Extract the first letter of the user's email
    const firstLetter = loggedInEmail ? loggedInEmail.charAt(0).toUpperCase() : '';

    // Navigation functions
    const navToBookings = () => navigate("/bookings");
    const navToBook1 = () => navigate("/book");
    const logout = () => navigate("/out");

    // Fetch vehicle data
    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await axios.get("http://localhost:3023/api/vehicles");
                setVehicleData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching vehicles data:", error);
                setLoading(false);
            }
        };
        fetchVehicle();
    }, []);

    // Fetch bookings data and calculate counts
    useEffect(() => {
        if (loggedInFacultyId) {
            const fetchBookings = async () => {
                try {
                    const response = await axios.get("http://localhost:3023/api/book", {
                        params: { facultyid: loggedInFacultyId },  // Send facultyid to filter bookings for logged-in user
                    });
                    setBookings(response.data);
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                }
            };
            fetchBookings();
        } else {
            alert("User is not logged in.");
            navigate("/login"); // Redirect to login page if not logged in
        }
    }, [loggedInFacultyId, navigate]);

    // Calculate counts dynamically
    const counts = {
        approved: bookings.filter(booking => booking.status === "Approved").length,
        pending: bookings.filter(booking => booking.status === "Pending").length,
        rejected: bookings.filter(booking => booking.status === "Rejected").length,
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <h1 className="dashboard-logo">BIT TRANSIT</h1>
                <nav className="dashboard-menu">
                    <li className="dashboard-menu-item active">Dashboard</li>
                    <li className="dashboard-menu-item" onClick={navToBookings}>
                        Bookings
                    </li>
                    <li
                        className="dashboard-menu-item"
                        onClick={() => navigate("/profile")}
                    >
                        Phonebook
                    </li>
                </nav>
                <button className="dashboard-logout" onClick={logout}>
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main-content">
                <header className="dashboard-header">
                    <h3>Welcome Back! {loggedInFacultyId}</h3> {/* Display the logged-in faculty ID */}
                    <div className="dashboard-profile">
                        {/* Display the first letter of the email as the profile icon */}
                        <div className="profile-icon">
                            {firstLetter}
                        </div>
                    </div>
                </header>

                {/* Cards Section */}
                <section className="dashboard-cards">
                    <div className="home__cards">
                        <div className="home__card home__card--approved">
                            <p>TOTAL REQUESTS APPROVED</p>
                            <button className="home__button">{counts.approved}</button>
                        </div>
                        <div className="home__card home__card--under-initiation">
                            <p>REQUESTS UNDER INITIATION</p>
                            <button className="home__button">{counts.pending}</button>
                        </div>
                        <div className="home__card home__card--rejected">
                            <p>TOTAL REQUESTS REJECTED</p>
                            <button className="home__button">{counts.rejected}</button>
                        </div>
                    </div>
                </section>

                <section className="dashboard-table">
                    {loading ? (
                        <p>Loading vehicle data...</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Vehicle ID</th>
                                    <th>Vehicle Name</th>
                                    <th>Number Plate</th>
                                    <th>Seat Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicleData.map((vehicle, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{vehicle.vehiclename}</td>
                                        <td>{vehicle.numberplate}</td>
                                        <td>{vehicle.seatcount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <div className="dashboard-pagination">
                        <span>Previous</span>
                        <span>Next</span>
                    </div>

                    <div className="book-now-container">
                        <button className="book-now-btn" onClick={navToBook1}>
                            Book Now
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
