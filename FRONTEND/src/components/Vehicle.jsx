import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Vehicle.css";

const Vehicle = () => {
    const [vehicleData, setVehicleData] = useState([]); // State to hold vehicle data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility
    const [newVehicle, setNewVehicle] = useState({
        vehiclename: '',
        numberplate: '',
        seatcount: '',
    });
    const navigate = useNavigate();

    const navtobookings = () => navigate('/adminbookings');

    // Fetch vehicle data from the backend
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('http://localhost:3023/api/vehicles');
                setVehicleData(response.data); // Update the state with the fetched data
                setLoading(false); // Stop the loading spinner
            } catch (error) {
                console.error("Error fetching vehicles data:", error);
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    // Handle form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewVehicle(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Submit the form to add a new vehicle
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Post new vehicle data to the backend
            await axios.post('http://localhost:3023/api/vehicles', newVehicle);
            // Re-fetch the vehicle data after submission
            const response = await axios.get('http://localhost:3023/api/vehicles');
            setVehicleData(response.data);
            // Hide the form
            setShowForm(false);
            // Clear form inputs
            setNewVehicle({
                vehiclename: '',
                numberplate: '',
                seatcount: '',
            });
        } catch (error) {
            console.error("Error adding vehicle:", error);
        }
    };

    return (
        <div className="vehiclepage-container">
            {/* Sidebar */}
            <aside className="vehiclepage-sidebar">
                <h1 className="vehiclepage-logo">BIT TRANSIT</h1>
                <nav className="vehiclepage-menu">
                    <li className="vehiclepage-menu-item" onClick={() => navigate("/adminhome")}>
                        Home
                    </li>
                    <li className="vehiclepage-menu-item" onClick={navtobookings}>Bookings</li>
                    <li className="vehiclepage-menu-item" onClick={() => navigate("/adminavailablestaff")}>
                        Staffs
                    </li>
                    <li className="vehiclepage-menu-item active">Vehicle</li>
                </nav>
                <button className="vehiclepage-logout" onClick={() => navigate("/out")}>
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="vehiclepage-main-content">
                {/* Add Vehicle Button */}
                <button className="vehiclepage-add-vehicle" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancel" : "Add Vehicle"}
                </button>

                {/* Add Vehicle Form */}
                {showForm && (
                    <section className="vehiclepage-add-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Vehicle Name:</label>
                                <input
                                    type="text"
                                    name="vehiclename"
                                    value={newVehicle.vehiclename}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Number Plate:</label>
                                <input
                                    type="text"
                                    name="numberplate"
                                    value={newVehicle.numberplate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Seat Count:</label>
                                <input
                                    type="number"
                                    name="seatcount"
                                    value={newVehicle.seatcount}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="vehiclepage-submit-btn">Submit</button>
                        </form>
                    </section>
                )}

                {/* Vehicle Table */}
                <section className="vehiclepage-table full-page">
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
                    
                </section>
            </main>
        </div>
    );
};

export default Vehicle;
