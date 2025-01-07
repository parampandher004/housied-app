import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DataTable from "../../components/DataTable/DataTable";

const AdminPaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [filters, setFilters] = useState({
    paymentId: "",
    paymentDate: "",
    paymentStatus: "",
    propertyId: "",
    tenantId: "",
    houseOwnerId: "",
  });
  const [filteredPayments, setFilteredPayments] = useState([]);
  const token = Cookies.get("authToken");

  useEffect(() => {
    const API_URL = import.meta.env.BACKEND_URL || "http://localhost:5000";
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${API_URL}/payment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setPayments(response.data.payments);
          setFilteredPayments(response.data.payments);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    if (token) {
      fetchPayments();
    }
  }, [token]);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });

    const filtered = payments.filter((payment) => {
      return (
        (name === "paymentId"
          ? payment.payid.toString().includes(value)
          : true) &&
        (name === "paymentDate" ? payment.paydate.includes(value) : true) &&
        (name === "paymentStatus"
          ? payment.pay_complete.toLowerCase().includes(value.toLowerCase())
          : true) &&
        (name === "propertyId"
          ? payment.pdid.toString().includes(value)
          : true) &&
        (name === "tenantId"
          ? payment.tenant_userID.toString().includes(value)
          : true) &&
        (name === "houseOwnerId"
          ? payment.property?.house_owner_userID.toString().includes(value)
          : true)
      );
    });

    setFilteredPayments(filtered);
  };

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
    <div className="min-h-screen bg-white-background dark:bg-black-background text-black-foreground dark:text-white-foreground p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Payment Page</h1>
      {/* Filters */}
      <div className="bg-base-100 dark:bg-base-400 p-4 rounded-lg shadow mb-6">
        <h4 className="text-lg font-semibold mb-4">Filters</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="paymentId"
            placeholder="Filter by Payment ID"
            value={filters.paymentId}
            onChange={(e) => handleFilterChange("paymentId", e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white-background dark:bg-black-background text-black-foreground dark:text-white-foreground"
          />
          <input
            type="text"
            name="paymentDate"
            placeholder="Filter by Payment Date"
            value={filters.paymentDate}
            onChange={(e) => handleFilterChange("paymentDate", e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white-background dark:bg-black-background text-black-foreground dark:text-white-foreground"
          />
          <input
            type="text"
            name="paymentStatus"
            placeholder="Filter by Payment Status"
            value={filters.paymentStatus}
            onChange={(e) =>
              handleFilterChange("paymentStatus", e.target.value)
            }
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white-background dark:bg-black-background text-black-foreground dark:text-white-foreground"
          />
          <input
            type="text"
            name="propertyId"
            placeholder="Filter by Property ID"
            value={filters.propertyId}
            onChange={(e) => handleFilterChange("propertyId", e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white-background dark:bg-black-background text-black-foreground dark:text-white-foreground"
          />
          <input
            type="text"
            name="tenantId"
            placeholder="Filter by Tenant ID"
            value={filters.tenantId}
            onChange={(e) => handleFilterChange("tenantId", e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white-background dark:bg-black-background text-black-foreground dark:text-white-foreground"
          />
          <input
            type="text"
            name="houseOwnerId"
            placeholder="Filter by House Owner ID"
            value={filters.houseOwnerId}
            onChange={(e) => handleFilterChange("houseOwnerId", e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white-background dark:bg-black-background text-black-foreground dark:text-white-foreground"
          />
        </div>
      </div>
      {/* Data Table */}
      <div className="bg-white-background dark:bg-black-background p-4 rounded-lg shadow">
        <DataTable columns={columns} data={filteredPayments} />
      </div>
    </div>
  );
};

export default AdminPaymentPage;
