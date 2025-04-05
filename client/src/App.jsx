import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/header/navbar';
import Footer from './component/footer/footer';
import Sidebar from './component/sidebar/sidebar';
import { RecoilRoot } from 'recoil';
import { FiMessageCircle } from "react-icons/fi"; // Import chatbot icon
import PageNotFound from './component/notfound';

const CollegesTable = React.lazy(() => import('./component/display'));
const Admin = React.lazy(() => import('./pages/Admin'));
const About = React.lazy(() => import('./pages/About'));
const ClusterComponent = React.lazy(() => import('./clustor/clustor'));
const Home = React.lazy(() => import('./pages/home/home'));


function App() {
  // Function to navigate to the chatbot page
  const redirectToChatbot = () => {
    window.location.href = "https://chat-box-for-kcet-counselling.streamlit.app/";
  };

  return (
    <RecoilRoot>
      <Router>
        <Suspense fallback={<div className="text-center mt-20 text-lg">Loading...</div>}>
          <Navbar />
          <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Sidebar included here */}
            <div className="flex flex-row">
              <Sidebar />
              <div className="flex-grow p-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/clustor" element={<ClusterComponent />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/collegedisplay" element={<CollegesTable />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </div>
            </div>
          </div>
          <Footer />

          {/* Chatbot Icon */}
          <div className="fixed bottom-6 right-6 z-50 text-center">
            {/* Disclaimer Text with Attractive Design */}
            <div className="opacity-0 animate-fadeIn transition-opacity duration-1000 delay-1000 bg-blue-600 text-white p-3 rounded-lg shadow-lg mb-3">
              <p className="text-sm font-medium">
                Chat with this bot to get info about the colleges
              </p>
            </div>

            {/* Chatbot Icon with Hover and Scale Effects */}
            <button
              onClick={redirectToChatbot}
              className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-125 hover:shadow-2xl"
            >
              <FiMessageCircle className="text-white text-3xl" />
            </button>
          </div>
        </Suspense>
      </Router>
    </RecoilRoot>
  );
}

export default App;
