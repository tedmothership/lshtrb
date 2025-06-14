import React from 'react';
import { Link } from 'react-router-dom';
import { getGenderSpecificLink } from '../utils/affiliateLinks'; // Assuming this utility exists

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Lushturbate</h3>
            <p className="text-gray-400 text-sm">
              Your premium destination for interactive adult entertainment. Explore thousands of live performers.
            </p>
            <a 
              href={getGenderSpecificLink('', false)} // General affiliate link
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-block text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
            >
              Join Now &amp; Get Free Tokens &rarr;
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
              <li>
                <a 
                  href="https://www.chaturbate.com/affiliates/signup/?campaign=OnFvA" // Direct affiliate signup
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Affiliate Program
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
              <li><Link to="/dmca" className="text-gray-400 hover:text-white text-sm transition-colors">DMCA</Link></li>
              <li><p className="text-gray-500 text-sm">18+ Only. Adults Only.</p></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Lushturbate. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            All models appearing on this website are 18 years or older. Lushturbate is an affiliate partner and does not own or operate the live cam platform.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
