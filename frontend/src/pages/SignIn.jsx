import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // For navigation
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function SignIn() {
  const [showpasswd, setShowPasswd] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  const { email, password } = formData;

  const navigate = useNavigate(); // react-router navigation hook

  function onChang(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  function passwordEye() {
    setShowPasswd((prevState) => !prevState);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Redirect user to Dashboard or another page after successful login
      navigate("/dashboard"); // Replace with your actual route
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign in</h1>
      <div className="flex justify-center mt-6 flex-wrap items-center px-4">
        <div className="md:w-[57%] lg:w-[40%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
            alt="sign"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={handleSubmit}>
            <input
              className="w-full mb-6 px-4 py-2 text-xl text-gray-700 transition ease-in-out border-gray-300 rounded bg-white"
              type="email"
              id="email"
              value={email}
              onChange={onChang}
              placeholder="Email Address"
            />

            <div className="relative mb-6">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 transition ease-in-out border-gray-300 rounded bg-white"
                type={showpasswd ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChang}
                placeholder="Password"
              />
              {showpasswd ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={passwordEye}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={passwordEye}
                />
              )}
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full text-sm font-medium uppercase rounded shadow-md bg-blue-600 hover:bg-blue-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 py-3 px-7 text-white mt-6"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
