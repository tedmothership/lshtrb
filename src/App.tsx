import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ModelPage from './pages/ModelPage';
import Layout from './components/Layout';
// Static pages - ensure these components exist
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import DMCAPage from './pages/DMCAPage';
import LiveRedirectPage from './pages/LiveRedirectPage';
import ExternalRedirectPage from './pages/ExternalRedirectPage';
// AppProvider is removed from here as it's already in main.tsx

function App() {
  return (
    // AppProvider removed from here
    <Routes>
      {/* Routes with the global Layout (Header/Footer) */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="model/:username" element={<ModelPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="terms-of-service" element={<TermsOfServicePage />} />
        <Route path="dmca" element={<DMCAPage />} />
      </Route>

      {/* Direct redirect route for /live/:username - does not use the global Layout */}
      <Route path="/live/:username" element={<LiveRedirectPage />} />

      {/* Catch-all route for any undefined paths - MUST BE LAST */}
      {/* This route also does not use the global Layout as it's a direct redirect */}
      <Route path="*" element={<ExternalRedirectPage />} />
    </Routes>
    // AppProvider removed from here
  );
}

export default App;
