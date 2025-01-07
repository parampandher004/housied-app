import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useGlobalState } from "../../hooks/useGlobalState";
import DataTable from "../../components/DataTable/DataTable";
import axios from "axios";

const columns = [
  { name: "Booking ID", selector: "booking_id" },
  { name: "Property ID", selector: "property_id" },
  { name: "Start Date", selector: "bstartdate" },
  { name: "End Date", selector: "benddate" },
  { name: "Booking Time", selector: "booking_time" },
];

const TenantBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({
    bookingNumber: "",
    bookingDate: "",
    bookingTime: "",
  });
  const [filteredBookings, setFilteredBookings] = useState([]);
  const { state } = useGlobalState();
  const { auth } = state;
  const { userID } = auth;
  const token = Cookies.get("authToken");

  useEffect(() => {
    const fetchBookings = async () => {
      const API_URL = import.meta.env.BACKEND_URL || "http://localhost:5000";
      try {
        const response = await axios.get(
          `${API_URL}/booking/tenant/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setBookings(response.data.bookings);
          setFilteredBookings(response.data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [token, userID]);

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
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-2">
          <label className="text-xl" htmlFor="bookingNumber">
            Booking Number:
          </label>
          <input
            className="border-2 border-gray-300 p-2"
            type="text"
            name="bookingNumber"
            value={filters.bookingNumber}
            onChange={handleFilterChange}
          />
        </div>
        <div className="flex flex-row space-x-2">
          <label className="text-xl" htmlFor="bookingDate">
            Booking Date:
          </label>
          <input
            className="border-2 border-gray-300 p-2"
            type="text"
            name="bookingDate"
            value={filters.bookingDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="flex flex-row space-x-2">
          <label className="text-xl" htmlFor="bookingTime">
            Booking Time:
          </label>
          <input
            className="border-2 border-gray-300 p-2"
            type="text"
            name="bookingTime"
            value={filters.bookingTime}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <DataTable columns={columns} data={filteredBookings} />
    </div>
  );
};

export default TenantBookingPage;
