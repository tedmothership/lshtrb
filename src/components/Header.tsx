import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search_query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search input after navigation
      setIsMobileMenuOpen(false); // Close mobile menu if open
    }
  };

  // Placeholder for nav links if needed in future - kept empty
  const navLinks: { name: string; href: string }[] = [
    // Example: { name: 'Home', href: '/' },
    // Example: { name: 'Categories', href: '/categories' },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 w-full">
      {/* This div is now full-width. Padding is applied here. */}
      {/* It contains the logo and search, pushing them to the padded edges of the viewport. */}
      <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        
        {/* Logo - Will be on the left, offset by padding */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <img 
              src="https://i.imgur.com/bUxZ7Cj.png" 
              alt="LUSHTURBATE Logo" 
              className="h-8 md:h-10 w-auto" // Updated: h-8 for mobile, md:h-10 for larger screens
            />
          </Link>
        </div>

        {/* Right-side items group - Will be on the right, offset by padding */}
        <div className="flex items-center">
          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative hidden md:flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search models..."
              className="bg-slate-800 text-white placeholder-gray-400 rounded-full py-2 px-4 pl-10 focus:ring-2 focus:ring-pink-500 focus:outline-none text-sm w-64"
            />
            <button type="submit" aria-label="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-400 hover:text-pink-400" />
            </button>
          </form>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Appears below header when open */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu" 
          className="md:hidden absolute top-20 inset-x-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 shadow-xl"
        >
          <div className="p-4 space-y-4"> {/* Inner div for padding and content */}
            {/* Search form for mobile menu */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models..."
                className="w-full bg-slate-800 text-white placeholder-gray-400 rounded-full py-2.5 px-4 pl-10 focus:ring-2 focus:ring-pink-500 focus:outline-none text-sm"
              />
              <button type="submit" aria-label="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400 hover:text-pink-400" />
                </button>
            </form>
            {/* Navigation links for mobile menu */}
            <nav className="space-y-1">
              {navLinks.map(link => ( // This will render nothing if navLinks is empty
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block hover:bg-slate-700 hover:text-pink-400 transition-colors px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
