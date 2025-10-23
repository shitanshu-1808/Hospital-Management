import patient from "../models/patient.js";
import bcrypt from "bcrypt"; 

export const patientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;


    const currPatient = await patient.findOne({ email });
    if (!currPatient) {
      return res.status(400).json({ message: "User not found" });
    }
    if(currPatient.role!=="patient"){
        return res.status(400).json({ message: "Patient login only" });
    }

    
    const isMatch = await bcrypt.compare(password, currPatient.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const currPatientObj = currPatient.toObject();
    const { password: _, ...safeUser } = currPatientObj; // remove password

    return res.status(200).json({ safeUser });
  } catch (error) {
    console.error("Error logging in:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
