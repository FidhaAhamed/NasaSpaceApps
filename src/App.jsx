import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/Pages/Home/home';
import Asia from '../src/Pages/Regions/asia'; 
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/asia" element={<Asia />} /> {/* Asia page */}
        {/* Add more routes here for other regions */}
      </Routes>
    </Router>
  );
}

export default App;
