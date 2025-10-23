import React, { useState } from "react";
import axios from "axios";

const PatientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    setPatientInfo(null);

    try {
      const res = await axios.post("http://localhost:4001/api/v1/auth/patientLogin", {
        email,
        password,
      });

      const user = res.data.safeUser;
      setPatientInfo(user);
      setMessage("✅ Login successful! Welcome, " + user.name);
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "❌ Login failed. Please try again.";
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Patient Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        {patientInfo && (
          <div
            className="patient-info translucent-box"
            style={{
              marginTop: "20px",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "left",
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
              Patient Details
            </h3>
            <p><strong>Name:</strong> {patientInfo.name}</p>
            <p><strong>Email:</strong> {patientInfo.email}</p>
            <p><strong>Role:</strong> {patientInfo.role}</p>
            <p><strong>Referred Doctor Name:</strong> {patientInfo.refferedDoctorName}</p>
            <p><strong>Referred Doctor Email:</strong> {patientInfo.refferedDoctorEmailId}</p>
            <p><strong>Age:</strong> {patientInfo.age}</p>
            <p><strong>Gender:</strong> {patientInfo.gender}</p>
            <p><strong>Blood Group:</strong> {patientInfo.bloodGroup}</p>
            <p><strong>Phone:</strong> {patientInfo.phone}</p>
            <p><strong>Address:</strong> {patientInfo.address}</p>
            <p><strong>Medical History:</strong> {patientInfo.medicalHistory}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientLogin;
