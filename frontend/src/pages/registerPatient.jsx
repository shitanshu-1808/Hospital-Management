import React, { useState } from "react";
import axios from "axios";


function RegisterPatient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    refferedDoctorName: "",
    refferedDoctorEmailId: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    address: "",
    medicalHistory: "",
  });

  const [message, setMessage] = useState("");

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("doctorToken"); 

    if (!token) {
      setMessage("You must be logged in as a doctor to register a patient.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4001/api/v1/auth/registerPatient",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error registering patient");
    }
  };

  return (
    <div className="patient-register">
      <h2>🩺 Register New Patient</h2>
      <form onSubmit={handleSubmit} className="patient-form">
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          name="refferedDoctorName"
          placeholder="Referred Doctor Name"
          value={formData.refferedDoctorName}
          onChange={handleChange}
          required
        />
        <input
          name="refferedDoctorEmailId"
          type="email"
          placeholder="Referred Doctor Email"
          value={formData.refferedDoctorEmailId}
          onChange={handleChange}
          required
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          name="bloodGroup"
          placeholder="Blood Group"
          value={formData.bloodGroup}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <textarea
          name="medicalHistory"
          placeholder="Medical History (comma-separated)"
          value={formData.medicalHistory}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Register Patient</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default RegisterPatient;
