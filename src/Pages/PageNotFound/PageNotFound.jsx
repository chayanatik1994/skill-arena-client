import React from 'react';
import PageNotFoundImg from '../../assets/PageNotFound.jpg';

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      
      {/* Image */}
      <img
        src={PageNotFoundImg}
        alt="Page Not Found"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md mb-6 object-contain"
      />

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
        404 - Page Not Found
      </h1>

      {/* Subtext */}
      <p className="text-black text-sm sm:text-base mb-6">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Button */}
      <button
        onClick={() => (window.location.href = '/')}
        className="px-6 py-3 bg-teal-600 text-white rounded-lg"
      >
        Go Back Home
      </button>

    </div>
  );
};

export default PageNotFound;
