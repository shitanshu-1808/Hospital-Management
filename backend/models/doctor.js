import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    userId:{
       type: mongoose.Schema.Types.ObjectId,ref:"User",
       required:true
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
    availability:[{
      day: String, 
      startTime: String,
      endTime: String
    }
  ],
},{timestamps:true})

export default mongoose.model("Doctor",doctorSchema);