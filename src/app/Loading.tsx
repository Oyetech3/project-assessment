"use client";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin"></div>
    
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold text-blue-500 animate-pulse">
            Loading...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;