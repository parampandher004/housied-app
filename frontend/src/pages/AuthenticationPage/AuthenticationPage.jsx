import React, { useState } from "react";
import { useGlobalState } from "../../hooks/useGlobalState";
import { ACTION_TYPES } from "../../context/ActionTypes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaUserTie, FaHome } from "react-icons/fa";

const AuthenticationPage = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const { state, dispatch } = useGlobalState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    dob: "",
    accountType: "",
  });
  const [errors, setErrors] = useState({});
  const [isLogin, setIsLogin] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountTypeChange = (type) => {
    setFormData((prev) => ({ ...prev, accountType: type }));
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
      if (!formData.dob) newErrors.dob = "This field is required";
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
          `${API_URL}/auth/${isLogin ? "login" : "register"}`,
          formData
        );

        if (response.status === 200) {
          const result = response.data;
          Cookies.set("authToken", result.token, { expires: 7 });
          Cookies.set("userType", result.userType, { expires: 7 });
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
          console.log("User authenticated successfully");
          {
            isLogin ? navigate("/", { replace: true }) : {};
          }
        }
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 dark:bg-black-foreground">
      <div className="max-w-md w-full border border-base-400 dark:border-base-200 bg-white-background dark:bg-black-background p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-black-foreground dark:text-white-foreground">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <div className="mt-3 md:flex md:items-center md:-mx-2">
                  <button
                    type="button"
                    className={`flex justify-center w-full px-6 py-3 mt-4 text-white-foreground border border-base-200 rounded-lg md:mt-0 md:w-auto md:mx-2 dark:border-base-200 dark:text-white-foreground focus:outline-none ${
                      formData.accountType === "tenant"
                        ? "bg-base-200"
                        : "bg-transparent"
                    }`}
                    onClick={() => handleAccountTypeChange("tenant")}
                  >
                    <FaUserTie className="w-6 h-6" />
                    <span className="mx-2">Tenant</span>
                  </button>
                  <button
                    type="button"
                    className={`flex justify-center w-full px-6 py-3 mt-4 text-white-foreground border border-base-200 rounded-lg md:mt-0 md:w-auto md:mx-2 dark:border-base-200 dark:text-white-foreground focus:outline-none ${
                      formData.accountType === "house_owner"
                        ? "bg-base-200"
                        : "bg-transparent"
                    }`}
                    onClick={() => handleAccountTypeChange("house_owner")}
                  >
                    <FaHome className="w-6 h-6" />
                    <span className="mx-2">House Owner</span>
                  </button>
                </div>
                <label
                  htmlFor="firstName"
                  className="block text-black-foreground dark:text-white-foreground"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg text-black-foreground dark:text-white-foreground bg-white-background dark:bg-black-background focus:outline-none focus:border-base-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="middleName"
                  className="block text-black-foreground dark:text-white-foreground"
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  id="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg text-black-foreground dark:text-white-foreground bg-white-background dark:bg-black-background focus:outline-none focus:border-base-200"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-black-foreground dark:text-white-foreground"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg text-black-foreground dark:text-white-foreground bg-white-background dark:bg-black-background focus:outline-none focus:border-base-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-black-foreground dark:text-white-foreground"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg text-black-foreground dark:text-white-foreground bg-white-background dark:bg-black-background focus:outline-none focus:border-base-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="dob"
                  className="block text-black-foreground dark:text-white-foreground"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg text-black-foreground dark:text-white-foreground bg-white-background dark:bg-black-background focus:outline-none focus:border-base-200"
                  required
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-black-foreground dark:text-white-foreground"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg text-black-foreground dark:text-white-foreground bg-white-background dark:bg-black-background focus:outline-none focus:border-base-200"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-black-foreground dark:text-white-foreground"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg text-black-foreground dark:text-white-foreground bg-white-background dark:bg-black-background focus:outline-none focus:border-base-200"
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-black-foreground dark:text-white-foreground"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg text-black-foreground dark:text-white-foreground bg-white-background dark:bg-black-background focus:outline-none focus:border-base-200"
                required
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-base-200 text-white-foreground px-4 py-2 rounded-lg hover:bg-base-300 focus:outline-none"
            >
              {isLogin ? "Login" : "Register"}
            </button>
            <button
              type="button"
              onClick={() => setIsLogin((prev) => !prev)}
              className="text-base-200 hover:underline focus:outline-none"
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
