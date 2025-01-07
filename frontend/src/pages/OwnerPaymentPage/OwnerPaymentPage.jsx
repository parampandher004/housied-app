import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useGlobalState } from "../../hooks/useGlobalState";
import DataTable from "../../components/DataTable/DataTable";

const OwnerPaymentPage = () => {
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
        const response = await axios.get(`${API_URL}/payment/owner/${userID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setAllPayments(response.data.payments);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    if (userID && token) {
      fetchPayments();
    }
  }, [userID, token]);

  const columns = [
    { name: "Payment ID", selector: "id", sortable: true },
    { name: "Amount", selector: "amount", sortable: true },
    { name: "Status", selector: "payment_status", sortable: true },
    { name: "Date", selector: "payment_date", sortable: true },
    { name: "Property ID", selector: "pdid", sortable: true },
    { name: "Tenant ID", selector: "tenant_userID", sortable: true },
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
    <div className="flex flex-col gap-4 bg-base-100 dark:bg-base-400 text-black-foreground dark:text-white-foreground p-4 rounded-lg">
      <h2 className="text-2xl font-bold">All Payments</h2>
      <DataTable columns={columns} data={allPayments} />
    </div>
  );
};

export default OwnerPaymentPage;
