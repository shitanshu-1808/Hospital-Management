import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const doctor = localStorage.getItem("doctorRole");
    if (doctor) setRole("doctor");
    else setRole(null);
  }, []);

  return (
    <>
      {role === "doctor" ? (
        <nav className="site-nav">
          <div className="nav-brand">Navigation</div>
          <div className="nav-links">
            <Link to="/update-medical-history" className="nav-link">Update Patient Details </Link>
            <Link to="/" className="nav-link">PatientDetails</Link>
            <Link to="/register-patient" className="nav-link">RegisterPatient</Link>
           
            <Link to="/register-doctor" className="nav-link">RegisterDoctor</Link>
            <button className="nav-button" onClick={()=>{
              localStorage.removeItem("doctorRole");
              localStorage.removeItem("doctorToken");
              navigate("/")
              window.location.reload();
            }}>Logout</button>
          </div>
        </nav>
      ) : (
        <nav className="site-nav">
          <div className="nav-brand">Navigation</div>
          <div className="nav-links">
            <Link to="/" className="nav-link">PatientLogin</Link>
            <Link to="/login-doctor" className="nav-link">DoctorLogin</Link>

          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
