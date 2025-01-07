import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useGlobalState } from "../../hooks/useGlobalState";
import DataTable from "../../components/DataTable/DataTable";
import { body } from "framer-motion/client";

const TenantPaymentPage = () => {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [allPayments, setAllPayments] = useState([]);
  const { state } = useGlobalState();
  const { auth } = state;
  const { userID } = auth;
  const token = Cookies.get("authToken");

  useEffect(() => {
    const fetchPayments = async () => {
      const API_URL =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      try {
        const response = await axios.get(
          `${API_URL}/payment/tenant/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setAllPayments(response.data.payments);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    const fetchPendingPayments = async () => {
      const API_URL = import.meta.env.BACKEND_URL || "http://localhost:5000";
      try {
        const response = await axios.get(
          `${API_URL}/payment/tenant/${userID}/pending`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setPendingPayments(response.data.payments);
        }
      } catch (error) {
        console.error("Error fetching pending payments:", error);
      }
    };

    if (userID && token) {
      fetchPayments();
      fetchPendingPayments();
    }
  }, [userID, token]);

  const handlePayment = async (paymentId) => {
    const API_URL = import.meta.env.BACKEND_URL || "http://localhost:5000";
    try {
      const response = await axios.put(
        `${API_URL}/payment/tenant/${userID}/pay`,
        { paymentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Update the payment status in the state
        setPendingPayments((prev) =>
          prev.filter((payment) => payment.id !== paymentId)
        );
        setAllPayments((prev) =>
          prev.map((payment) =>
            payment.id === paymentId
              ? { ...payment, payment_status: "Completed" }
              : payment
          )
        );
      }
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  const columns = [
    { name: "Payment ID", selector: "id", sortable: true },
    { name: "Amount", selector: "amount", sortable: true },
    { name: "Status", selector: "payment_status", sortable: true },
    { name: "Date", selector: "payment_date", sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handlePayment(row.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Pay
        </button>
      ),
    },
  ];

  const pendingColumns = columns
    .filter((column) => column.name !== "Actions")
    .concat({
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handlePayment(row.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Pay
        </button>
      ),
    });

  return (
    <div className="flex flex-col gap-4 bg-base-100 dark:bg-base-900 text-black dark:text-white">
      <h2 className="text-2xl font-bold">Pending Payments</h2>
      <DataTable columns={pendingColumns} data={pendingPayments} />
      <h2 className="text-2xl font-bold">All Payments</h2>
      <DataTable columns={columns} data={allPayments} />
    </div>
  );
};

export default TenantPaymentPage;
