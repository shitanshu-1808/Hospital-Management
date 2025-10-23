import mongoose from "mongoose";


const patientSchema = new mongoose.Schema({
   name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    password:{
        type:String,
        required:true,
       
    },
    role:{
        type:String,
        enum:["doctor","patient"],
        default:"patient"
    },
    profileImage:{
        type:String
    },
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
