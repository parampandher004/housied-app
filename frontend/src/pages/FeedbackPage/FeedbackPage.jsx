import React, { useState } from "react";
import axios from "axios";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/feedback", { feedback });
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
