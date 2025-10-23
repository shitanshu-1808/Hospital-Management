import React, { useState } from "react";
import axios from "axios";

const UpdateMedicalHistory = () => {
  const [email, setEmail] = useState("");
  const [record, setRecord] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("doctorToken");
      if (!token) {
        setMessage("❌ Unauthorized: Please log in as a doctor first.");
        setLoading(false);
        return;
      }

      const res = await axios.put(
        "http://localhost:4001/api/v1/auth/updateMedicalHistory",
        { email, record },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      setMessage(res.data.message || "✅ Medical history updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to update medical history.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="umh-page">
      <div className="umh-card">
        <h2 className="umh-title">Update Medical History</h2>
        <form className="umh-form" onSubmit={handleSubmit}>
          <input
            className="umh-input"
            type="email"
            placeholder="Patient Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            className="umh-textarea"
            placeholder="Enter new record or notes..."
            value={record}
            onChange={(e) => setRecord(e.target.value)}
            required
          />

          <button className="umh-button" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update History"}
          </button>
        </form>

        {message && (
  <p
    className={`umh-message ${
      message.includes("✅") ? "success" :
      message.includes("❌") ? "error" : ""
    }`}
  >
    {message}
  </p>
)}

      </div>
    </div>
  );
};

export default UpdateMedicalHistory;
