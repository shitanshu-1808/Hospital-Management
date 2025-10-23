import { useState } from "react";
import axios from "axios";

function DoctorRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
    specialization: "",
    experience: "",
    phone: "",
    availability: "",
    departName: "",
    description: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4001/api/v1/auth/registerDoctor",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error registering doctor");
    }
  };

  return (
    <div className="doctor-register-container">
      <h2 className="doctor-register-title">Doctor Registration</h2>
      <form className="doctor-register-form" onSubmit={handleSubmit}>
        <input className="doctor-input" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input className="doctor-input" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input className="doctor-input" name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input className="doctor-input" name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} />
        <input className="doctor-input" name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} />
        <input className="doctor-input" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input className="doctor-input" name="availability" placeholder="Availability" value={formData.availability} onChange={handleChange} />
        <input className="doctor-input" name="departName" placeholder="Department Name" value={formData.departName} onChange={handleChange} />
        <input className="doctor-input" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <button className="doctor-submit-btn" type="submit">Register</button>
      </form>
      {message && <p className="doctor-message">{message}</p>}
    </div>
  );
}

export default DoctorRegister;