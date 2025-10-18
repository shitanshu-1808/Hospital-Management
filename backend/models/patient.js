import mongoose from "mongoose";


const patientSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true },
    age: Number,
    refferedDoctorName:{
      type:String,
      required:true,
    },
    refferedDoctorEmailId:{
      type:String,
      required:true
    },
  gender: { 
    type: String,
    enum: ["male", "female", "other"] },
  bloodGroup: String,
  phone: String,
  address: String,
  medicalHistory: [String]
}, { timestamps: true });

export default mongoose.model("Patient", patientSchema);
