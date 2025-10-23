import express from "express";
import { upload } from "../middlewares/cloudinary.middleware.js";
import { loginDoctor, registerDoctor, registerPatient, updateMedicalHistory } from "../controllers/doctorController.js";
import { patientLogin} from "../controllers/patientController.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const router = express.Router()

router.post("/registerDoctor",registerDoctor);
router.post("/loginDoctor",loginDoctor);
router.post("/registerPatient",verifyToken,registerPatient);
router.put("/updateMedicalHistory",verifyToken,updateMedicalHistory);


router.post("/patientLogin",patientLogin);

export default router;

