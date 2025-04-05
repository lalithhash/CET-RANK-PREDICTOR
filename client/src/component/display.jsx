import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { collegelist, sidebarState } from "../atom/store"; // Import the state
import { useNavigate } from "react-router-dom";
import FilterComponent from "../filter/filter";


const CollegesTable = () => {
  const nav = useNavigate();
  const data = useRecoilValue(collegelist);
  const sidebarOpen = useRecoilValue(sidebarState); // Sidebar state to conditionally position the table

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState({
    collegeName: "",
    branchCode: "",
    rank: "",
  });

  useEffect(() => {
    if (data.length === 0) {
      nav("/");
    }
  }, [data]);

  // Get unique college names for recommendations
  const collegeNames = Array.from(
    new Set(data.map((college) => college.collegeName))
  );

  // Filtered data based on selected filter
  const filteredData = data.filter((college) => {
    return (
      (filter.collegeName === "" || college.collegeName.includes(filter.collegeName)) &&
      (filter.branchCode === "" || college.branchCode === filter.branchCode) &&
      (filter.rank === "" || college.rank <= filter.rank)
    );
  });

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="container mx-auto py-8 px-4 mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        College Allotment Results
      </h2>
      <div className="flex justify-end">
        <button
          onClick={toggleModal}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-blue-700 focus:outline-none transition-all duration-300 shadow-lg"
        >
          <span>Filter</span>
        </button>
      </div>

      {/* Modal with Filter Options */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-[80vh] overflow-auto"
          >
            <h3 className="text-xl font-bold mb-4 flex justify-self-center">
              Filter the college list by adding below criteria
            </h3>

            <div className="w-full">
              <FilterComponent
                filter={filter}
                setFilter={setFilter}
                collegeNames={collegeNames}
              />
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={toggleModal}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={toggleModal}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Responsive Table */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`shadow-lg rounded-lg transition-all ${
          sidebarOpen ? "mt-[calc(96px)]" : "mt-0"
        }`}
      >
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white text-gray-800 border border-gray-200">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="text-left py-3 px-4 font-semibold uppercase">S.No</th>
                <th className="text-left py-3 px-4 font-semibold uppercase">College Code</th>
                <th className="text-left py-3 px-4 font-semibold uppercase">College Name</th>
                <th className="text-left py-3 px-4 font-semibold uppercase">Branch Name</th>
                <th className="text-left py-3 px-4 font-semibold uppercase">Branch Code</th>
                <th className="text-left py-3 px-4 font-semibold uppercase">Place</th>
                <th className="text-left py-3 px-4 font-semibold uppercase">Rank</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((college, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-100 transition duration-300 ease-in-out"
                >
                  <td className="py-3 px-4 border-b">{index + 1}</td>
                  <td className="py-3 px-4 border-b">{college.collegeCode}</td>
                  <td className="py-3 px-4 border-b">{college.collegeName}</td>
                  <td className="py-3 px-4 border-b">{college.branchName}</td>
                  <td className="py-3 px-4 border-b">{college.branchCode}</td>
                  <td className="py-3 px-4 border-b">{college.place}</td>
                  <td className="py-3 px-4 border-b">{college.rank}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="block md:hidden space-y-4">
          {filteredData.map((college, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg shadow p-4"
            >
              <h3 className="font-bold text-lg mb-2">
                {index + 1}. {college.collegeName}
              </h3>
              <p className="text-sm text-gray-600">College Code: {college.collegeCode}</p>
              <p className="text-sm text-gray-600">Branch Name: {college.branchName}</p>
              <p className="text-sm text-gray-600">Branch Code: {college.branchCode}</p>
              <p className="text-sm text-gray-600">Place: {college.place}</p>
              <p className="text-sm text-gray-600">Rank: {college.rank}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CollegesTable;
