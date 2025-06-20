import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-800 text-gray-400 border-t border-slate-700">
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="mb-4">
          <img src="/logo.png" alt="LUSHTURBATE Logo" className="h-10 w-auto mx-auto mb-2" />
          <p className="text-sm">
            &copy; {currentYear} LUSHTURBATE. All rights reserved.
          </p>
        </div>
        <p className="text-xs mt-2 mb-4 max-w-md mx-auto">
          This website contains sexually explicit content. You must be 18 years of age or older to enter. 
          All performers were 18 years of age or older at the time of depiction.
        </p>
        <div className="flex justify-center space-x-4 text-xs">
          <Link to="/terms" className="hover:text-pink-400 transition-colors">Terms of Service</Link>
          <span>|</span>
          <Link to="/privacy" className="hover:text-pink-400 transition-colors">Privacy Policy</Link>
          <span>|</span>
          <Link to="/contact" className="hover:text-pink-400 transition-colors">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
