import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { VarietiesPage } from './pages/VarietiesPage';
import { ContactPage } from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/varieties" element={<VarietiesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Fallback to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
