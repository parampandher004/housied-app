import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../hooks/useGlobalState";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const { state, dispatch } = useGlobalState();
  const { auth, user } = state;

  const [isEditing, setIsEditing] = useState({});
  const [editedDetails, setEditedDetails] = useState(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = Cookies.get("authToken");

      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/user/info", {
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

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (field, value) => {
    setEditedDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (field) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.put(
        "http://localhost:5000/user/info",
        { [field]: editedDetails[field] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch({
          type: "UPDATE_USER_DETAILS",
          payload: { userDetails: { ...user, [field]: editedDetails[field] } },
        });
        setIsEditing((prev) => ({ ...prev, [field]: false }));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="sticky top-0 z-0 h-full w-full flex items-center justify-center bg-base-100">
      <div className="container mx-auto py-5">
        <div className="flex flex-wrap mx-4">
          <div className="w-full lg:w-1/3 px-4">
            <div className="bg-white rounded-lg shadow mb-4">
              <div className="p-6 text-center">
                <h2>User Profile</h2>
                <FaUserCircle className="rounded-full mx-auto mb-4 w-36 h-36" />
                <h5 className="text-xl font-semibold mb-2">{user.firstName}</h5>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3 px-4">
            <div className="bg-white rounded-lg shadow mb-4 p-6">
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
                  <p className="text-gray-700 font-medium w-1/3">
                    {item.label}
                  </p>
                  {isEditing[item.field] ? (
                    <div className="flex-grow">
                      <input
                        type="text"
                        value={editedDetails[item.field] || ""}
                        onChange={(e) =>
                          handleInputChange(item.field, e.target.value)
                        }
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                      <button
                        onClick={() => handleSave(item.field)}
                        className="ml-2 px-3 py-1 text-white bg-green-500 rounded"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500 flex-grow">
                      {user[item.field]}
                    </p>
                  )}
                  <FiEdit
                    className="text-gray-400 cursor-pointer"
                    onClick={() => handleEditToggle(item.field)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
