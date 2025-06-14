import React from 'react';
import { Search, Filter, Users, Crown, Sparkles } from 'lucide-react';
import { getGenderSpecificLink } from '../utils/affiliateLinks';

interface HeaderProps {
  onlineCount: number;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFilterToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onlineCount, 
  searchTerm, 
  onSearchChange, 
  onFilterToggle 
}) => {
  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a 
            href={getGenderSpecificLink('', false)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <Crown className="h-8 w-8 text-purple-500" />
              <Sparkles className="h-4 w-4 text-pink-400 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">lushturbate</h1>
              <p className="text-xs text-gray-400">Premium Adult Entertainment</p>
            </div>
          </a>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search performers, tags..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 
                         text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 
                         focus:ring-purple-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Stats &amp; Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex items-center space-x-1 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <Users className="h-4 w-4" />
                <span className="font-semibold">{onlineCount.toLocaleString()}</span>
              </div>
              <span className="text-gray-400">online</span>
            </div>
            
            <button
              onClick={onFilterToggle}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 
                       text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
