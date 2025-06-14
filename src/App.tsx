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
import LiveRedirectPage from './pages/LiveRedirectPage'; // Import the new redirect page


function App() {
  return (
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

      {/* Direct redirect route - does not use the global Layout */}
      <Route path="/live/:username" element={<LiveRedirectPage />} />
    </Routes>
  );
}

export default App;
