"use client";
import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Here you would typically handle the search functionality
  };

  return (
    <nav className="bg-gradient-to-r from-purple-900 to-blue-900 py-4 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h2 className="font-extrabold text-2xl text-white">xoloti</h2>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">the game ?</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>

          {/* Search and Menu Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <Search size={24} />
              </button>
              {isSearchOpen && (
                <form 
                  onSubmit={handleSearch}
                  className="absolute right-0 top-10 bg-white rounded-lg shadow-lg p-2 w-64 flex"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-2 py-1 text-gray-800 focus:outline-none"
                  />
                  <button type="submit" className="text-gray-600 hover:text-gray-800">
                    <Search size={20} />
                  </button>
                </form>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-300 transition-colors md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">Home</a>
            <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">About</a>
            <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">Services</a>
            <a href="#" className="block text-gray-300 hover:text-white transition-colors py-2">Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;