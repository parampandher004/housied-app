import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../hooks/useGlobalState";
import axios from "axios";
import { FaCalendar, FaClock } from "react-icons/fa";
import DataTable from "../../components/DataTable/DataTable";
import Cookies from "js-cookie"; // Import js-cookie

const columns = [
  { name: "Booking ID", selector: "booking_id" },
  { name: "Property ID", selector: "property_id" },
  { name: "Start Date", selector: "bstartdate" },
  { name: "End Date", selector: "benddate" },
  { name: "Booking Time", selector: "booking_time" },
  { name: "Tenant ID", selector: "tenant_id" },
  {
    name: "House Owner ID",
    selector: (row) => row.property?.house_owner_userID || "N/A",
  },
];

const AdminBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({
    bookingNumber: "",
    bookingDate: "",
    bookingTime: "",
  });
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    const token = Cookies.get("authToken");
    const fetchBookings = async () => {
      try {
        // Get token from cookies
        const response = await axios.get(`${API_URL}/booking`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        });
        if (response.status === 200) {
          setBookings(response.data.bookings);
          setFilteredBookings(response.data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    const filtered = bookings.filter((booking) => {
      return (
        (name === "bookingNumber"
          ? booking.booking_id.toString().includes(value)
          : true) &&
        (name === "bookingDate" ? booking.bstartdate.includes(value) : true) &&
        (name === "bookingTime" ? booking.booking_time.includes(value) : true)
      );
    });

    setFilteredBookings(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Bookings</h1>
      <div className="flex flex-row justify-between my-4">
        <div className="flex flex-row">
          <div className="mr-2">
            <FaCalendar className="inline-block" />
            <input
              type="text"
              name="bookingDate"
              value={filters.bookingDate}
              onChange={handleFilterChange}
              placeholder="Booking Date"
              className="border px-2 py-1 rounded-lg text-black-foreground dark:text-white-foreground bg-white-background dark:bg-black-background"
            />
          </div>
          <div className="mr-2">
            <FaClock className="inline-block" />
            <input
              type="text"
              name="bookingTime"
              value={filters.bookingTime}
              onChange={handleFilterChange}
              placeholder="Booking Time"
              className="border px-2 py-1 rounded-lg text-black-foreground dark:text-white-foreground bg-white-background dark:bg-black-background"
            />
          </div>
          <div>
            <input
              type="text"
              name="bookingNumber"
              value={filters.bookingNumber}
              onChange={handleFilterChange}
              placeholder="Booking Number"
              className="border px-2 py-1 rounded-lg text-black-foreground dark:text-white-foreground bg-white-background dark:bg-black-background"
            />
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={filteredBookings} />
    </div>
  );
};

export default AdminBookingPage;
