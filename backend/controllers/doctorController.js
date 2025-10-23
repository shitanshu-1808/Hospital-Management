import doctor from "../models/doctor.js";

import department from "../models/department.js";
import patient from "../models/patient.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

//registering a doctor

export const registerDoctor = async (req, res) => {
    try {
        const { name, email, password, role, specialization, experience, phone, availability,departName,description } = req.body;
        const existingUser = await doctor.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const Department = await department.create({
            departName,
            description
        })
        await doctor.create({
            name,
            email,
            password: hashedPassword,
            role,
           
            department:Department._id,
            specialization,
            experience,
            phone,
            availability

        })

        res.status(200).json({
            message: "Doctor registered successfully", name, email
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//doctor login

export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await doctor.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "User doesnot exist" })
        }
        if(existingUser.role!=="doctor"){
            return res.status(400).json({ message: "Only Doctors Can login on this page" })
        }

        const pass = await bcrypt.compare(password, existingUser.password)
        if (!pass) {
            return res.status(400).json({ message: "Wrong password" })
        }
        const token = jwt.sign({id:existingUser._id,email:existingUser.email,role:existingUser.role},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN})
        const existingUserObj = existingUser.toObject()
        const {password:_,...safeUser}=existingUserObj;

       res.status(200).json({safeUser,token});
    } catch (error) {
        res.status(500).json({ message: error.message

         })
    }
}


//register patient

export const registerPatient = async (req, res) => {
    try {
        const { name, email, password, role,refferedDoctorName,refferedDoctorEmailId,age,gender, bloodGroup,phone,address,medicalHistory } = req.body;
        const existingPatient = await patient.findOne({ email });

        if (existingPatient) {
            return res.status(400).json({ message: "User already exists" })
        }

        const doctorReffered = await doctor.findOne({email:refferedDoctorEmailId}) ;

        if(!doctorReffered||doctorReffered.role!=="doctor"){
            return res.status(400).json({ message: "Doctor does not exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const imageUrl = req.file ? req.file.path : null

       
        const patientdet = await patient.create({
            name,
            email,
            password: hashedPassword,
            role,
            
            refferedDoctorName,
            refferedDoctorEmailId,
            age,
            gender,
            bloodGroup,
            phone,
            address,
            medicalHistory,
        })
        if(!patientdet){
            return req.status(400).json({message:"Patient cant be registered"})
        }

        res.status(200).json({
            message: "Patient registered successfully", name, email
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//update patient medical records

export const updateMedicalHistory = async (req, res) => {
  try {
    const { email, record } = req.body;

    if (!email || !record) {
      return res.status(400).json({ message: "Email and record are required." });
    }
    const formattedRecord = ` ${record.trim()} | ${new Date().toLocaleString()} |`;

    const updatedPatient = await patient.findOneAndUpdate(
      { email },
      { $push: { medicalHistory: formattedRecord } },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Cannot find a patient." });
    }

    res.status(200).json({ message: "Medical history updated successfully" });
  } catch (error) {
    console.error("Error updating medical history:", error);
    res.status(500).json({ message: error.message });
  }
};
