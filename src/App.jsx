import React from "react";
import Home from "./Pages/Home.jsx";          
import MapPage from "./Pages/Map.jsx";         
import PostRequest from "./Pages/PostRequest.jsx";
import VolunteerDashboard from "./Pages/VolunteerDashboard.jsx";
import NGODashboard from "./Pages/NGODashboard.jsx";
import About from "./Pages/About.jsx";



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/post-request" element={<PostRequest />} />
        <Route path="/volunteer" element={<VolunteerDashboard />} />
        <Route path="/ngo" element={<NGODashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
