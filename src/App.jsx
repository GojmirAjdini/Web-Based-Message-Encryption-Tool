import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AESPage from "./Pages/AESPage";
import DESPage from "./Pages/DESPage";
import RSAPage from "./Pages/RSAPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Importo Footer-in
import "./App.css";

function App() {
  return (
    <Router>
      {/* Navbar jashtë që të jetë 100% width */}
      <Navbar /> 
      
      {/* Vetëm Routes brenda container-it që të qëndrojnë në mes */}
      <div className="app-container" style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aes" element={<AESPage />} />
          <Route path="/des" element={<DESPage />} />
          <Route path="/rsa" element={<RSAPage />} />
        </Routes>
      </div>

      {/* Footer jashtë që të jetë 100% width në fund */}
      <Footer />
    </Router>
  );
}

export default App;