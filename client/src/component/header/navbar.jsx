import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import SearchBar from './search/searchbar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 fixed w-full z-10 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-2">
        {/* Top Bar: Logo and Mobile Menu Button */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <p className="text-white mr-0 md:mr-10 text-lg md:text-base">
            Logo
          </p>
          <div className="flex-shrink-0 text-white text-2xl font-bold">
            <Link to="/">MyWebsite</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white border-white rounded-lg p-2"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? 'true' : 'false'}
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 mx-10">
            <SearchBar placeholder="Search..." />
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/signin"
              className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-md"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-md"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar: Visible below the Top Bar */}
        <div className="md:hidden mt-2">
          <div className="relative pb-3">
            <SearchBar placeholder="Search..." />
          </div>
        </div>
      </div>

      {/* Mobile Menu: Buttons */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 sm:px-3 flex justify-end space-x-4">
            <Link
              to="/signin"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 text-gray-300 hover:text-white text-base font-medium rounded-md"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 text-gray-300 hover:text-white text-base font-medium rounded-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
