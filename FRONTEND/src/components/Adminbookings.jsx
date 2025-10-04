import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Adminbookings.css";

const AdminBookings = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusOptions = ["Pending", "Approved", "Rejected"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await axios.get("http://localhost:3023/api/book");
        setBookings(bookingsResponse.data);

        const driversResponse = await axios.get("http://localhost:3023/api/driver");
        setDrivers(driversResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateBooking = async (bookingId, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/book/${bookingId}`, updatedData);
      console.log("Booking updated successfully");
    } catch (error) {
      console.error("Error updating booking:", error);
      setError("Failed to update booking. Please try again.");
    }
  };

  const handleRemarksChange = (index, value) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].remarks = value;
    setBookings(updatedBookings);

    // Trigger the update API call
    updateBooking(updatedBookings[index]._id, { remarks: value });
  };

  const handleDriverChange = async (index, value) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].driveralloted = value || null;
    setBookings(updatedBookings);

    // Persist to local storage
    localStorage.setItem(`driver-${updatedBookings[index]._id}`, value);

    // Trigger the update API call
    try {
      await axios.put(`http://localhost:5000/api/book/${updatedBookings[index]._id}`, { driveralloted: value });
      console.log("Booking updated successfully");
    } catch (error) {
      console.error("Error updating booking:", error);
      setError("Failed to update booking. Please try again.");
    }
  };

  const handleStatusChange = (index, value) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = value;
    setBookings(updatedBookings);

    // Trigger the update API call
    updateBooking(updatedBookings[index]._id, { status: value });
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-bookings-container">
      <aside className="admin-bookings-sidebar">
        <h1 className="admin-bookings-logo">BIT TRANSIT</h1>
        <nav className="admin-bookings-menu">
          <li className="admin-bookings-menu-item" onClick={() => navigate("/adminhome")}>
            Home
          </li>
          <li className="admin-bookings-menu-item active">Bookings</li>
          <li className="admin-bookings-menu-item" onClick={() => navigate("/adminavailablestaff")}>
            Staffs
          </li>
          <li className="admin-bookings-menu-item">Vehicle</li>
        </nav>
        <button className="admin-bookings-logout" onClick={() => navigate("/out")}>
          Logout
        </button>
      </aside>

      <main className="admin-bookings-main-content">
        

        <section className="admin-bookings-table full-page">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Faculty Name</th>
                <th>Faculty ID</th>
                <th>Vehicle</th>
                <th>Purpose</th>
                <th>Destination</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Driver Allotted</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.facultyname}</td>
                  <td>{booking.facultyid}</td>
                  <td>{booking.vehicle_variant}</td>
                  <td>{booking.purpose}</td>
                  <td>{booking.to}</td>
                  <td>{booking.from_date}</td>
                  <td>{booking.to_date}</td>
                  <td>
                    <select
                      className="admin-bookings-status-dropdown"
                      value={booking.status}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                    >
                      {statusOptions.map((status, statusIndex) => (
                        <option key={statusIndex} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter remarks"
                      className="admin-bookings-remarks-input"
                      value={booking.remarks || ""}
                      onChange={(e) => handleRemarksChange(index, e.target.value)}
                    />
                  </td>
                  <td>
                    <select
                      className="admin-bookings-driver-dropdown"
                      value={booking.driveralloted || ""}
                      onChange={(e) => handleDriverChange(index, e.target.value)}
                    >
                      <option value="">Select Driver</option>
                      {drivers.map((driver) => (
                        <option key={driver._id} value={driver.staffname}>
                          {driver.staffname}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </section>
      </main>
    </div>
  );
};

export default AdminBookings;
