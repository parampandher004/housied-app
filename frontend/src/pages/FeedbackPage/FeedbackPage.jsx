import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const token = Cookies.get("authToken");
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/feedback`,
        { feedback },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage("Failed to submit feedback.");
    }
  };

  return (
    <div>
      <h1>Feedback Page</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback"
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FeedbackPage;
