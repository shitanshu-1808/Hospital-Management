import DoctorRegister from "./pages/registerDoctor"
import DoctorLogin from "./pages/loginDoctor"
import { Route ,Routes} from "react-router-dom"
import RegisterPatient from "./pages/registerPatient"
import PatientLogin from "./pages/loginPatient"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import UpdateMedicalHistory from "./pages/medicalHistory"

function App() {
  

  return (
    <>
    <Navbar></Navbar>
    <main>
      <Routes>
        <Route path="/update-medical-history" element={<UpdateMedicalHistory/>} />
        <Route path="/register-doctor" element={<DoctorRegister />} />
        <Route path="/login-doctor" element={<DoctorLogin />} />
        <Route path="/register-patient" element={<RegisterPatient />} />
        <Route path="/" element={<PatientLogin/>} />
      </Routes>
    </main>
    <Footer></Footer>

    </>
  )
}

export default App
