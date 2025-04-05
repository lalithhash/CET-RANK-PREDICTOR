import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchOverlay from "./searchoverlay";


const SearchBar = ({ placeholder = "Search..." }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Open the overlay when the search bar is clicked or focused
  const handleOpenOverlay = () => {
    setIsOverlayOpen(true);
  };

  // Close the overlay
  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  useEffect(() => {
    const rootElement = document.getElementById("root");

    // Add or remove the blur class based on isOverlayOpen
    if (isOverlayOpen) {
      rootElement.classList.add("blur-effect");
    } else {
      rootElement.classList.remove("blur-effect");
    }

    return () => {
      rootElement.classList.remove("blur-effect"); // Clean up on unmount
    };
  }, [isOverlayOpen]);

  return (
    <div>
      {/* Small Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          onClick={handleOpenOverlay}
          onFocus={handleOpenOverlay}
          className="w-full bg-gray-700 text-white rounded-md pl-10 pr-4 py-2 cursor-pointer focus:outline-none focus:bg-gray-700"
          readOnly
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>

      {/* Search Overlay */}
      {isOverlayOpen && (
        <SearchOverlay
          isOpen={isOverlayOpen}
          handleCloseOverlay={handleCloseOverlay}
        />
      )}
    </div>
  );
};

export default SearchBar;
