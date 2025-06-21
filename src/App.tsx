import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ModelPage from './pages/ModelPage';
import HeroBanner from './components/HeroBanner'; 

// Placeholder pages for footer links
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="py-10 px-4 text-center container mx-auto">
    <h1 className="text-3xl font-bold mb-4 text-white">{title}</h1>
    <p className="text-gray-300">This is a placeholder page for {title}. Content will be added soon.</p>
    <Link to="/" className="text-pink-400 hover:underline mt-6 inline-block px-6 py-2 border border-pink-400 rounded-md hover:bg-pink-400 hover:text-slate-900 transition-colors">
      Back to Home
    </Link>
  </div>
);

const App: React.FC = () => {
  console.log('[App.tsx] App component rendering.');
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isSearchOrTagPage = location.search.includes('tag=') || location.search.includes('search_query=');

  const showHeroBanner = isHomePage && !isSearchOrTagPage;

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-gray-100 selection:bg-pink-500 selection:text-white">
      <Header />
      
      {showHeroBanner && <HeroBanner />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/model/:username" element={<ModelPage />} />
          <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
          <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
          <Route path="/contact" element={<PlaceholderPage title="Contact Us" />} />
          <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
