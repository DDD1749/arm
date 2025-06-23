import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-amber-200 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-amber-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="absolute mt-24 text-gray-600 font-medium">Loading 3D Model...</p>
    </div>
  );
};

export default LoadingSpinner;