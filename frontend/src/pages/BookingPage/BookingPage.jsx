import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { useGlobalState } from '../../hooks/useGlobalState';

const BookingPage = () => {
  const location = useLocation();
  const { property_id } = location.state || {};
  const [formData, setFormData] = useState({
    bstartdate: "",
    benddate: "",
  });
  const token = Cookies.get("authToken");
  const { state } = useGlobalState();
  const { userID } = state.auth;

  const API_URL = import.meta.env.BACKEND_URL || "http://localhost:5000";

  const handleBooking = async () => {
    const { bstartdate, benddate } = formData;
    const data = {
      bstartdate,
      benddate,
      property_id,
      tenant_id: userID,
    };

    if (token && userID && property_id) {
      try {
        const response = await axios.post(`${API_URL}/booking/${userID}/${property_id}`, {bstartdate, benddate}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Missing required data for booking");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!property_id) {
      console.error("Property ID is missing");
    }
  }, [property_id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-md w-full">
      {property_id ? (
        <>
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Booking for Property ID: {property_id}</h1>
          <div className="mb-4">
            <label htmlFor="bstartdate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
            <input
              type="date"
              name="bstartdate"
              id="bstartdate"
              value={formData.bstartdate}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 text-black-foreground border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="benddate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
            <input
              type="date"
              name="benddate"
              id="benddate"
              value={formData.benddate}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border text-black-foreground border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            onClick={handleBooking}
            className="w-full bg-indigo-600 text-white-foreground py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Book
          </button>
        </>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">Loading...</p>
      )}
    </div>
  </div>
  );
};

export default BookingPage;