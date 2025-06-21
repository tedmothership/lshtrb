import React from 'react';
import { Zap, ShieldCheck, Film, Users } from 'lucide-react';
import { getGenderSpecificLink } from '../utils/affiliateLinks';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-purple-700 via-pink-600 to-red-500 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div> {/* Subtle overlay */}
      {/* Reduced vertical padding: py-10 (mobile) and md:py-14 (desktop) */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          <span className="block">Live Adult</span>
          <span className="block text-purple-300">Entertainment</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-purple-100 md:mt-5 mb-6">
          Discover thousands of live webcam models streaming now. Interactive shows, private chats, and endless possibilities.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-md text-xs sm:text-sm font-medium rounded-full hover:bg-white/30 transition-colors">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-purple-300" /> Thousands Online
          </span>
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-md text-xs sm:text-sm font-medium rounded-full hover:bg-white/30 transition-colors">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-purple-300" /> Top Rated Models
          </span>
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-md text-xs sm:text-sm font-medium rounded-full hover:bg-white/30 transition-colors">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-purple-300" /> Safe &amp; Secure
          </span>
          <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-md text-xs sm:text-sm font-medium rounded-full hover:bg-white/30 transition-colors">
            <Film className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-purple-300" /> HD Streaming
          </span>
        </div>
        <div className="mt-8">
          <a
            href={getGenderSpecificLink('default_cam_page', true)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-500 hover:bg-purple-400 text-white font-semibold px-8 py-3 sm:px-10 sm:py-4 rounded-lg shadow-lg text-base sm:text-lg transition-transform transform hover:scale-105"
          >
            Take Control Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
