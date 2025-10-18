import Footer from "./components/footer.jsx"
import Navbar from "./components/navbar.jsx"
import PatientLogin from './pages/patientLogin.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  

  return (
    <>
      <Navbar></Navbar>
      <main>
        <Routes>
        <Route path="/" element={<PatientLogin />} />
        
      </Routes>
      </main>
      <Footer></Footer>
    </>
  )
}

export default App
