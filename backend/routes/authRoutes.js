import express from "express";
import { upload } from "../middlewares/cloudinary.middleware.js";
import { loginDoctor, registerDoctor, registerPatient, updateMedicalHistory } from "../controllers/doctorController.js";
import { patiendDetails } from "../controllers/patientController.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const router = express.Router()

router.post("/registerDoctor",upload.single("profileImage"),registerDoctor);
router.post("/loginDoctor",loginDoctor);
router.post("/registerPatient",upload.single("profileImage"),registerPatient);
router.put("/updateMedicalHistory/:id",verifyToken,updateMedicalHistory);


router.get("/patientId/:id",patiendDetails);

export default router;

