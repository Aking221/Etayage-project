import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Buses from "./components/BusInfo";
import Parking from "./components/ParkingInfo";
import Trip from "./components/Trip";
import './styles.scss';


const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buses" element={<Buses />} />
          <Route path="/parking" element={<Parking />} />
          <Route path="/trip" element={<Trip />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
