import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UsersListingPage = () => {
  const token = Cookies.get("authToken");
  const API_URL = import.meta.env.BACKEND_URL || "http://localhost:5000";
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    role: "",
    id: "",
  });
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/user/all`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            setUsers(response.data.users);
            setFilteredUsers(response.data.users);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchUsers();
  }, [token, API_URL]);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUsers(users.filter((user) => user.id !== userId));
        setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    const filtered = users.filter((user) => {
      return (
        (name === "name"
          ? `${user.firstName} ${user.middleName} ${user.lastName}`
              .toLowerCase()
              .includes(value.toLowerCase())
          : true) &&
        (name === "email"
          ? user.email.toLowerCase().includes(value.toLowerCase())
          : true) &&
        (name === "role"
          ? user.accountType.toLowerCase().includes(value.toLowerCase())
          : true) &&
        (name === "id" ? user.userID.toString().includes(value) : true)
      );
    });

    setFilteredUsers(filtered);
  };

  const totalUsers = users?.length || 0;
  const totalHouseOwners =
    users?.filter((user) => user.accountType === "house_owner").length || 0;
  const totalTenants =
    users?.filter((user) => user.accountType === "tenant").length || 0;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-bold">Total Users</h3>
          <p className="text-3xl">{totalUsers}</p>
        </div>
        <div className="bg-green-500 text-white rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-bold">House Owners</h3>
          <p className="text-3xl">{totalHouseOwners}</p>
        </div>
        <div className="bg-purple-500 text-white rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-bold">Tenants</h3>
          <p className="text-3xl">{totalTenants}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h4 className="text-lg font-semibold mb-4">Filters</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Filter by Name"
            value={filters.name}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="email"
            placeholder="Filter by Email"
            value={filters.email}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="role"
            placeholder="Filter by Role"
            value={filters.role}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="id"
            placeholder="Filter by UserID"
            value={filters.id}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">UserID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user) => (
              <tr key={user.userID} className="hover:bg-gray-100">
                <td className="p-3 border">{user.userID}</td>
                <td className="p-3 border">
                  {user.firstName} {user.middleName} {user.lastName}
                </td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.accountType}</td>
                <td className="p-3 border">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleDeleteUser(user.userID)}
                  >
                    Delete
                  </button>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersListingPage;
