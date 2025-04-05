import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { formDataAtom } from "../atom/store";
import ClusterCard from "../clustor/clustorcomponent";
import CollegeList from "./collegefilter";
import PlaceFilter from "../filter/placefilter";

const Filter = () => {
  const formData = useRecoilValue(formDataAtom);
  const setFormData = useSetRecoilState(formDataAtom);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [showCollegeList, setShowCollegeList] = useState(false); // State to toggle college list visibility

  // Handle cluster selection
  const handleClusterSelect = (clusterName) => {
    if (selectedCluster === clusterName) {
      setSelectedCluster(null);
    } else {
      setSelectedCluster(clusterName);
      setFormData(prevState => ({
        ...prevState,
        clusterPreferences: [{ value: clusterName }] // Assuming only one cluster is selected
      }));
    }
  };

  // Handle close button click to remove the selected cluster
  const handleClose = () => {
    setSelectedCluster(null); // Just close the selected cluster locally
  };

  // Toggle college list visibility
  const handleCollegeListToggle = () => {
    setShowCollegeList(!showCollegeList); // Toggle visibility
  };

  return (
    <div className="p-4">
      {/* Display all clusters the user can select */}
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2 text-center">I. These are the clusters you preferred</h3>
        <div className="flex flex-wrap gap-4 justify-center mt-7">
          {formData.clusterPreferences.map((item, index) => (
            <div
              key={index}
              className={`cursor-pointer p-3 rounded-lg border border-gray-300 
              ${selectedCluster === item.value ? 'bg-blue-500 text-white' : 'bg-white'}`}
              onClick={() => handleClusterSelect(item.value)}
            >
              {item.value}
            </div>
          ))}
        </div>
        <h3 className="text-lg font-bold mb-2 text-center mt-6">Click on the above Cluster to add filters on that Cluster</h3>
      </div>

      {/* Show selected cluster with a close button */}
      {selectedCluster && (
        <div className="flex items-center mb-4 p-4 bg-green-100 rounded-lg">
          <span className="mr-2 text-lg font-semibold text-green-700">{selectedCluster}</span>
          <button
            onClick={handleClose}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            X
          </button>
        </div>
      )}

      <h3 className="text-lg font-bold mb-2 text-center mt-6">II . Add filter by Selecting Perticular College That you Prefer </h3>
      {/* Render ClusterCard for the selected cluster */}
      {selectedCluster && (
        <div>
          <ClusterCard clusterName={selectedCluster} />
        </div>
      )}

      {/* Toggle College List Button */}
      <div className="mt-8 grid place-items-center">
        <div
          className={`cursor-pointer p-3 rounded-lg border border-gray-300 w-48
          ${showCollegeList ? 'bg-blue-500 text-white' : 'bg-white'}`}
          onClick={handleCollegeListToggle}
        >
          {showCollegeList ? "Hide College List" : "Show College List"}
        </div>
      </div>

      {/* Render the College List if showCollegeList is true */}
      {showCollegeList && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-4 text-center">II. Filter the college list by adding filters on the college</h2>
          <CollegeList />
        </div>
      )}

<h3 className="text-lg font-bold mb-2 text-center mt-6">III . Add filter on Place </h3>
<PlaceFilter/>
    </div>
    

  );
};

export default Filter;
