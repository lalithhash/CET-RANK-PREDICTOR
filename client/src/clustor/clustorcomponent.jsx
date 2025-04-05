import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring'; // For animations
import { clustersData } from '../data/clustor';
import { useRecoilState } from 'recoil';
import { collegelist } from '../atom/store';

const ClusterCard = ({ clusterName }) => {
  
const clusterData = clustersData[clusterName];

  const [collegeList, setCollegeList] = useRecoilState(collegelist); // Recoil state for college list
  const [localBranches, setLocalBranches] = useState(clusterData.branches); // Local state for branches

  if (!clusterData) {
    return <div className="text-red-500">Cluster data not found</div>;
  }

  const { description } = clusterData;

  // Animation for entering the card
  const animationProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
  });

  const handleRemoveClick = (branch) => {
    // Update the college list in Recoil state by filtering out the branch
    const updatedCollegeList = collegeList.filter(
      (college) => college.branchCode !== branch.Branch_code
    );
    setCollegeList(updatedCollegeList); // Update the state

    // Update the local branches state by filtering out the branch
    const updatedBranches = localBranches.filter(
      (localBranch) => localBranch.Branch_code !== branch.Branch_code
    );
    setLocalBranches(updatedBranches); // Update local branches
  };

  return (
    <animated.div
      style={animationProps}
      className="bg-white p-6 rounded-lg shadow-lg w-full mb-6 transition-all duration-300 ease-in-out"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{clusterName.replace('_', ' ')}</h2>
      <p className="text-gray-600 mb-4">{description}</p>

      {localBranches.length > 0 ? (
        <ul className="space-y-2">
          {localBranches.map((branch, index) => (
            <li key={index} className="text-gray-700 flex items-center justify-between">
              <div>
                <strong>{branch.Branch_name}</strong> ({branch.Branch_code})
              </div>
              <button
                onClick={() => handleRemoveClick(branch)}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No branches available for this cluster.</p>
      )}
    </animated.div>

  );
};

export default ClusterCard;
