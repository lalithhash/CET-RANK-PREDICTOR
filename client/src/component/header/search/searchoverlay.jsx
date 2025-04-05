// src/components/SearchOverlay.jsx

import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
// import collegesOptions from "../../../data/colleges"; // Adjust the path as needed

const SearchOverlay = ({ isOpen, handleCloseOverlay }) => {
  const [query, setQuery] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const overlayRef = useRef(null);
  const inputRef = useRef(null);

  // Close overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        handleCloseOverlay();
      }
    };

    

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus the input when overlay opens
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleCloseOverlay]);

  // Handle "Escape" key to close the overlay
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseOverlay();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleCloseOverlay]);

  // Debounce function to limit filtering frequency
  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  // Debounced filter function
  // const debouncedFilter = useRef(
  //   debounce((searchQuery) => {
  //     if (searchQuery.trim() === "") {
  //       setFilteredColleges([]);
  //     } else {
  //       const filtered = collegesOptions.filter((college) =>
  //         college.label.toLowerCase().includes(searchQuery.toLowerCase())
  //       );
  //       setFilteredColleges(filtered);
  //     }
  //   }, 300)
  // ).current;

  // Update filteredColleges whenever query changes with debouncing
  // useEffect(() => {
  //   debouncedFilter(query);
  //   if (query.trim() === "") {
  //     setHighlightedIndex(-1);
  //   } else {
  //     setHighlightedIndex(0); // Highlight the first item by default
  //   }
  // }, [query, debouncedFilter]);

  // // Handle input changes
  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setQuery(value);
  // };

  // // Handle selecting a college from the recommendations
  // const handleSelectCollege = (college) => {
  //   setQuery(college.label);
  //   setFilteredColleges([]);
  //   setHighlightedIndex(-1);
  //   // Optionally, perform additional actions like submitting the form
  // };

  // Handle key down events
  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     if (filteredColleges.length > 0 && highlightedIndex >= 0) {
  //       handleSelectCollege(filteredColleges[highlightedIndex]);
  //     }
  //   } else if (e.key === "ArrowDown") {
  //     e.preventDefault();
  //     if (filteredColleges.length > 0) {
  //       setHighlightedIndex((prevIndex) =>
  //         prevIndex < filteredColleges.length - 1 ? prevIndex + 1 : prevIndex
  //       );
  //     }
  //   } else if (e.key === "ArrowUp") {
  //     e.preventDefault();
  //     if (filteredColleges.length > 0) {
  //       setHighlightedIndex((prevIndex) =>
  //         prevIndex > 0 ? prevIndex - 1 : prevIndex
  //       );
  //     }
  //   }
  // };

  // Return null if the overlay is not open
  // if (!isOpen) return null;

  return (
  //   <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center  z-50 transition-opacity duration-300 backdrop-blur-[5px]"
  //   >
  //   <div ref={overlayRef} className="w-[80%] rounded-lg pt-24">
      
  //     {/* Search Bar */}
  //     <div className="mb-6 flex justify-between items-center">
  //       <div className="relative flex-grow">
  //         <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
  //         <input
  //           ref={inputRef}
  //           type="text"
  //           placeholder="Search for colleges..."
  //           value={query}
  //           onChange={handleInputChange}
  //           onKeyDown={handleKeyDown}
  //           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
  //           aria-label="Search for colleges"
  //         />
  //       </div>
  //       <button
  //         onClick={handleCloseOverlay}
  //         className="ml-4 text-white bg-blue-800 rounded-lg shadow-lg px-4 py-2"
  //         aria-label="Cancel search"
  //       >
  //         Cancel
  //       </button>
  //     </div>
  
  //     {/* Recommendations Dropdown */}
  //     <div className="w-full flex justify-center relative">
  //       {filteredColleges.length > 0 && (
  //         <div className="w-full sm:w-3/4 md:w-1/2 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto shadow-lg z-10">
  //           <ul>
  //             {filteredColleges.map((college, index) => (
  //               <li
  //                 key={index}
  //                 onClick={() => handleSelectCollege(college)}
  //                 className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
  //                   index === highlightedIndex
  //                     ? "bg-gray-200"
  //                     : "hover:bg-gray-100"
  //                 }`}
  //                 onMouseEnter={() => setHighlightedIndex(index)}
  //               >
  //                 {college.label}
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       )}
  //     </div>
  
  //     {/* No Results Message */}
  //     {query.trim() !== "" && filteredColleges.length === 0 && (
  //       <div className="text-center text-gray-500 mt-4">
  //         No colleges found for "{query}"
  //       </div>
  //     )}
  //   </div>
  // </div>
  <></>
  
  );
};

export default SearchOverlay;
