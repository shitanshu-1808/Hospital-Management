import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4001/api/v1/auth/loginDoctor",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      
      const { token, safeUser } = res.data;
      localStorage.setItem("doctorToken", token); 
      localStorage.setItem("doctorRole", JSON.stringify(safeUser.role));
      
      setMessage(`Welcome Dr. ${safeUser.name}!`);
      setTimeout(() => {
        navigate("/register-patient")
        window.location.reload();
      }, 2000); 
     

    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="doctor-login-container">
      <h2 className="doctor-login-title">Doctor Login</h2>
      <form className="doctor-login-form" onSubmit={handleSubmit}>
        <input
          className="doctor-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="doctor-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="doctor-submit-btn" type="submit">
          Login
        </button>
      </form>
      {message && <p className="doctor-message">{message}</p>}
    </div>
  );
}

export default DoctorLogin;
