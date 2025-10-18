import patient from "../models/patient.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const patiendDetails = async(req,res)=>{
    try {
        const currPatient = patient.findById(req.params.id)
    
        if(!currPatient){
            return res.status(400).json({message:"cant fetch user"})
        }
        const token = jwt.sign({id:currPatient._id,email:currPatient.email,role:currPatient.role},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN})
        currPatientObj = currPatient.toObject();
        const {password:_,...safeUser}=currPatientObj;
        res.status(200).json({safeUser,token})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}