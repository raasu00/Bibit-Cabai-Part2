import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import VarietiesPage from './pages/VarietiesPage';
import ContactPage from './pages/ContactPage';
import Accessibility from './utils/accessibility';
import { animations } from './utils/animation';
import './styles/globals.css';

const App: React.FC = () => {
  useEffect(() => {
    // Initialize accessibility features
    Accessibility.init();
    
    // Initialize animations
    animations.init({
      threshold: 0.1,
      once: true,
    });
    
    // Monitor performance
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`[Performance] ${entry.name}: ${entry.startTime}ms`);
        }
      });
      observer.observe({ entryTypes: ['measure', 'largest-contentful-paint'] });
    }
    
    // Cleanup
    return () => {
      animations.destroy();
    };
  }, []);

  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/varieties" element={<VarietiesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Layout>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
