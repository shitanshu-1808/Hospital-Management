import mongoose from "mongoose";

const departmentModel = new mongoose.Schema({
    departName: { type: String, 
           required: true },
    description:{
        type: String,
        required:true
    }
},{timestamp:true})

export default mongoose.model("Department",departmentModel)