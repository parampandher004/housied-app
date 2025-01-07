import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../hooks/useGlobalState";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const API_URL = import.meta.env.BACKEND_URL || "http://localhost:5000";
  const { state, dispatch } = useGlobalState();
  const { auth, user } = state;

  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = Cookies.get("authToken");

      if (token) {
        try {
          const response = await axios.get(`${API_URL}/user/info`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            dispatch({
              type: "UPDATE_USER_DETAILS",
              payload: { userDetails: response.data.userInfo },
            });
            setEditedDetails(response.data.userInfo);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, [dispatch]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setEditedDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.put(`${API_URL}/user/info`, editedDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        dispatch({
          type: "UPDATE_USER_DETAILS",
          payload: { userDetails: editedDetails },
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="sticky top-0 z-0 h-full w-full flex items-center justify-center bg-white-background dark:bg-black-background text-black-foreground dark:text-white-foreground">
      <div className="container mx-auto py-5">
        <div className="flex flex-col items-center mb-8">
          <FaUserCircle className="rounded-full mb-4 w-36 h-36" />
          <h2 className="text-2xl font-bold">{user.firstName}</h2>
        </div>

        <div className="bg-white-background dark:bg-black-background rounded-lg shadow p-6">
          {[
            { label: "First Name", field: "firstName" },
            { label: "Middle Name", field: "middleName" },
            { label: "Last Name", field: "lastName" },
            { label: "Date of Birth", field: "dob" },
            { label: "Email", field: "email" },
            { label: "Phone Number", field: "phoneNumber" },
            { label: "Address", field: "address" },
          ].map((item, index) => (
            <div key={index} className="mb-4 flex items-center">
              <p className="text-gray-700 dark:text-gray-300 font-medium w-1/3">
                {item.label}
              </p>
              <div className="flex-grow">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedDetails[item.field] || ""}
                    onChange={(e) =>
                      handleInputChange(item.field, e.target.value)
                    }
                    className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full bg-white-border dark:bg-black-border text-black-foreground dark:text-white-foreground"
                  />
                ) : (
                  <p className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full bg-white-background dark:bg-black-background text-black-foreground dark:text-white-foreground">
                    {user[item.field]}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white bg-base-100 dark:bg-base-300 rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEditToggle}
                className="px-4 py-2 text-white bg-base-200 dark:bg-base-400 rounded"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
