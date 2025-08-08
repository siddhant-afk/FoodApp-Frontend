import "./App.css";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./components/auth/RegistrationPage";
function App() {
  return (
    <>
      <Navbar />

      <div className="content">
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
