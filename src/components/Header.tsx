import React, { useState, useEffect } from 'react';
import { Crown, Sparkles, Menu, Search, UserPlus, X } from 'lucide-react';
import { getGenderSpecificLink } from '../utils/affiliateLinks';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If search is open and user navigates away (e.g. clicking a link), close search
    if (isSearchOpen) {
      const params = new URLSearchParams(location.search);
      if (!params.has('search_query')) { // if navigation is not due to a search action itself
         // setIsSearchOpen(false); // This might be too aggressive, consider user experience
      }
    }
  }, [location, isSearchOpen]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) { // If closing search, clear query
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      // Optionally remove search_query from URL if submitting empty search
      const params = new URLSearchParams(location.search);
      params.delete('search_query');
      navigate(`${location.pathname}?${params.toString()}`);
    } else {
      navigate(`/?search_query=${encodeURIComponent(searchQuery.trim())}&page=1`);
    }
    // setSearchQuery(''); // Clear input after navigation
    setIsSearchOpen(false); // Close search bar UI
  };

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Group: Hamburger Menu and Logo (conditionally shown) */}
          <div className={`flex items-center space-x-4 ${isSearchOpen ? 'hidden sm:flex flex-shrink-0' : 'flex'}`}> {/* Hide on small screens when search is open */}
            <button 
              aria-label="Open menu" 
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            {!isSearchOpen && (
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
            )}
          </div>

          {/* Search Bar (conditionally shown) */}
          {isSearchOpen && (
            <form 
              onSubmit={handleSearchSubmit} 
              // Make form take available space but not excessively, and center it if space allows
              className="flex-grow flex items-center justify-center min-w-0 px-2 sm:px-0" 
            >
              <div className="flex w-full max-w-sm sm:max-w-md"> {/* Max width for the input group */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search models, tags..."
                  className="bg-gray-800 text-white placeholder-gray-500 w-full px-3 py-2 text-sm rounded-l-md focus:ring-pink-500 focus:border-pink-500 focus:outline-none min-w-[100px]" // min-w to prevent collapse
                  autoFocus
                />
                <button 
                  type="submit" 
                  aria-label="Submit search"
                  className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
          )}

          {/* Right Group: Search Icon/Close Icon and Join Button (conditionally shown) */}
          <div className={`flex items-center space-x-3 sm:space-x-4 ${isSearchOpen ? 'flex-shrink-0' : ''}`}>
            <button 
              aria-label={isSearchOpen ? "Close search" : "Open search"} 
              onClick={toggleSearch} 
              className="text-gray-400 hover:text-white focus:outline-none p-1"
            >
              {isSearchOpen ? <X className="h-6 w-6" /> : <Search className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
            {!isSearchOpen && (
              <a
                href={getGenderSpecificLink('', false)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm px-3 sm:px-4 py-2 rounded-full transition-colors flex items-center space-x-1 sm:space-x-1.5"
              >
                <UserPlus className="h-4 w-4" />
                <span className="block sm:hidden">JOIN</span>
                <span className="hidden sm:block">JOIN FREE</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
