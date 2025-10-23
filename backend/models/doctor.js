import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
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
    specialization: {
         type: String, 
         required: true 
    },
    department: { 
        type: mongoose.Schema.Types.ObjectId, ref: "Department" 
    },
    experience: { 
        type: Number, 
        required: true 
    },
    phone: {
        type:Number,
        required:true
    },
    availability:{
      type:String,
      required:true

    }
  ,
},{timestamps:true})

export default mongoose.model("Doctor",doctorSchema);