import React, { useState } from "react";
import { useGlobalState } from "../../hooks/useGlobalState";
import { ACTION_TYPES } from "../../context/ActionTypes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthenticationPage = () => {
  const { state, dispatch } = useGlobalState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLogin, setIsLogin] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin) {
      if (!formData.firstName) newErrors.firstName = "This field is required";
      if (!formData.lastName) newErrors.lastName = "This field is required";
      if (!formData.phoneNumber)
        newErrors.phoneNumber = "This field is required";
      if (!formData.email) {
        newErrors.email = "This field is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.password) newErrors.password = "This field is required";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      if (!formData.accountType)
        newErrors.accountType = "Please select an account type";
    } else {
      if (!formData.email) newErrors.email = "This field is required";
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.password) newErrors.password = "This field is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          `http://localhost:5000/auth/${isLogin ? "login" : "register"}`,
          formData
        );

        if (response.status === 200) {
          const result = response.data;
          Cookies.set("authToken", result.token, { expires: 7 });
          Cookies.set("userType", result.userType, { expires: 7 });
          Cookies.set("userID", result.userDetails.userID, { expires: 7 });
          Cookies.set("userDetails", JSON.stringify(result.userDetails), {
            expires: 7,
          });
          dispatch({
            type: isLogin ? ACTION_TYPES.LOGIN : ACTION_TYPES.REGISTER,
            payload: {
              token: result.token,
              userType: result.userType,
              userID: result.userDetails.userID,
              userName: result.userDetails.userName,
              email: result.userDetails.email,
              firstName: result.userDetails.firstName,
              middleName: result.userDetails.middleName,
              lastName: result.userDetails.lastName,
              phoneNumber: result.userDetails.phoneNumber,
              address: result.userDetails.address,
              dob: result.userDetails.dob,
              profilePicture: result.userDetails.profilePicture,
            },
          });
          navigate("/layout/profile");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 dark:text-gray-300"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 dark:text-gray-300"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-gray-700 dark:text-gray-300"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-gray-700 dark:text-gray-300"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="dob"
                  className="block text-gray-700 dark:text-gray-300"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              {isLogin ? "Login" : "Register"}
            </button>
            <button
              type="button"
              onClick={() => setIsLogin((prev) => !prev)}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              {isLogin ? "Create an account" : "Already have an account?"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthenticationPage;
