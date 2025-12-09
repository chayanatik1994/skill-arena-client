import React from 'react';
import PageNotFoundImg from '../../assets/PageNotFound404.jpg';

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
            <img 
                src={PageNotFoundImg} 
                alt="Page Not Found" 
                className="w-full max-w-md mb-6"
            />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-4">Sorry, the page you are looking for does not exist.</p>
            <button 
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
                Go Back Home
            </button>
        </div>
    );
};

export default PageNotFound;
