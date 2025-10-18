import axios from "axios";

const BACKEND_URL = axios.create({
    baseURL:"/api/v1/auth/authRoutes/"
})

export default BACKEND_URL