import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DataTable from "../../components/DataTable/DataTable";

const AdminPaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const token = Cookies.get("authToken");

  useEffect(() => {
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${API_URL}/payment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setPayments(response.data.payments);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    if (token) {
      fetchPayments();
    }
  }, [token]);

  const columns = [
    { name: "Payment ID", selector: "payid" },
    { name: "Payment Date", selector: "paydate" },
    { name: "Payment Status", selector: "pay_complete" },
    { name: "Property ID", selector: "pdid" },
    { name: "Tenant ID", selector: "tenant_userID" },
    {
      name: "House Owner ID",
      selector: (row) => row.property?.house_owner_userID || "N/A",
    },
    {
      name: "Rent",
      selector: (row) => row.property?.rent || "N/A",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Payment Page</h1>
      <DataTable columns={columns} data={payments} />
    </div>
  );
};

export default AdminPaymentPage;
