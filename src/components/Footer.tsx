import React from 'react';
import { getGenderSpecificLink } from '../utils/affiliateLinks';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* Removed max-w-7xl, kept mx-auto and padding for content alignment */}
      <div className="mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <div className="mb-4">
          <a 
            href={getGenderSpecificLink('', false)} // Main site link or a general affiliate link
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors mx-2"
          >
            Home
          </a>
          <a 
            href={getGenderSpecificLink('female', false)} // Example category link
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors mx-2"
          >
            Female Cams
          </a>
          <a 
            href={getGenderSpecificLink('male', false)} // Example category link
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition-colors mx-2"
          >
            Male Cams
          </a>
          {/* Add more links as needed */}
        </div>
        <p className="text-sm">
          &copy; {currentYear} lushturbate.com. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          This website contains sexually explicit content. You must be 18 years or older to enter.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
