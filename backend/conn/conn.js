import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const conn = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDb connected successfully")
    } catch (error) {
        console.log("Connection to MongoDb Failed",error)
    }
}

export default conn;