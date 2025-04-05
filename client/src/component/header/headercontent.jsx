import React from 'react';

const HeaderCont = ({ content }) => {
  return (
    <div className="bg-gray-700 text-white py-6 px-4 sm:px-6 lg:px-8 mt-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="">{content.title}</h1>
        <p className="">{content.discription[0]}</p>
        <p className="">{content.discription[1]}</p>
        <p className="">{content.discription[2]}</p>
      </div>
    </div>
  );
};

export default HeaderCont;
