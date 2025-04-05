import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { collegelist } from "../atom/store";
import { motion, AnimatePresence } from "framer-motion"; // For animation

const CollegeList = () => {
  const [collegeList, setCollegeList] = useRecoilState(collegelist);
  const [uniqueCollegeList, setUniqueCollegeList] = useState([]);

  // Use useEffect to filter unique colleges based on collegeName and collegeCode
  useEffect(() => {
    const uniqueColleges = collegeList.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.collegeName === value.collegeName && t.collegeCode === value.collegeCode
      ))
    );
    setUniqueCollegeList(uniqueColleges); // Store unique colleges
  }, [collegeList]); // Re-run when collegeList changes

  // Handle college removal
  const handleRemove = (collegeCode) => {
    const updatedList = collegeList.filter(college => college.collegeCode !== collegeCode);
    setCollegeList(updatedList); // Update Recoil state with the filtered list
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-semibold text-center mb-4">College List</h2>

      {uniqueCollegeList.length > 0 ? (
        <div>
          <AnimatePresence>
            {uniqueCollegeList.map((college) => (
              <motion.div
                key={college.collegeCode}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-4"
              >
                <div>
                  <h3 className="text-lg font-semibold">{college.collegeName}</h3>
                  <p className="text-sm text-gray-600">Code: {college.collegeCode}</p>
                </div>
                <button
                  onClick={() => handleRemove(college.collegeCode)}
                  className="text-red-500 hover:text-red-700 transition duration-300 text-sm"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p className="text-center text-gray-500">No colleges available.</p>
      )}
    </div>
  );
};

export default CollegeList;
