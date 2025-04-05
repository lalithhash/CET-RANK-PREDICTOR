import React from 'react';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';

// Import the updated clusters data
import { clustersData } from '../data/clustor'; // Adjust the path accordingly

const ClusterTable = ({ clusters }) => (
  <table className="table-auto w-full border-collapse border border-gray-200 text-left text-sm mt-50">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-200 px-4 py-2">Cluster Name</th>
        <th className="border border-gray-200 px-4 py-2">Description</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(clusters).map(([key, value]) => (
        <tr key={key}>
          <td className="border border-gray-200 px-4 py-2 font-semibold">{key.replace('_', ' ')}</td>
          <td className="border border-gray-200 px-4 py-2">{value.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ClusterDetail = ({ clusterName, description, branches }) => (
  <motion.div
    className="mt-6 p-6 border border-gray-300 rounded-lg shadow-md bg-white"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-xl font-bold text-gray-800 mb-2">{clusterName}</h2>
    <p className="text-gray-600 mb-4">{description}</p>
    <ul className="list-disc pl-6">
      {branches.map((branch) => (
        <li key={branch.Branch_code} className="text-gray-700">
          {branch.Branch_name} ({branch.Branch_code})
        </li>
      ))}
    </ul>
  </motion.div>
);

const ClusterComponent = () => {
  const majorClusters = ['CS_Cluster', 'EC_Cluster', 'ME_Cluster', 'Civil_Cluster', 'Aerospace_Cluster', 'BioTech_Cluster'];

  const otherClusters = Object.keys(clustersData).filter((key) => !majorClusters.includes(key));

  return (
    <div className="max-w-screen-xl mx-auto p-8 mt-16">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Explore Engineering Branches in Different Clusters</h1>
        <p className="text-lg text-gray-600">
          A "Cluster" refers to a group of related engineering branches that share similar technologies, knowledge, and expertise.
          Explore the different clusters to find which aligns with your career path!
        </p>
      </motion.div>

      {/* Major Clusters Section */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Major Clusters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {majorClusters.map((key) => (
            <ClusterDetail
              key={key}
              clusterName={key.replace('_', ' ')}
              description={clustersData[key].description}
              branches={clustersData[key].branches}
            />
          ))}
        </div>
      </section>

      {/* Other Clusters Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Other Clusters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherClusters.map((key) => (
            <ClusterDetail
              key={key}
              clusterName={key.replace('_', ' ')}
              description={clustersData[key].description}
              branches={clustersData[key].branches}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ClusterComponent;
