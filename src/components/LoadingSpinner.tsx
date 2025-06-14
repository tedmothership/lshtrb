import React from 'react';
import { Crown } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <Crown className="h-12 w-12 text-purple-500 animate-pulse" />
        <div className="absolute inset-0 animate-spin">
          <div className="h-12 w-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full" />
        </div>
      </div>
      <p className="mt-4 text-gray-400 text-sm">Loading amazing performers...</p>
      
      {/* Skeleton Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 
                      gap-6 p-6 mt-8 w-full max-w-7xl">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 
                                    animate-pulse">
            <div className="aspect-[4/3] bg-gray-700" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-700 rounded w-1/2" />
              <div className="flex space-x-2">
                <div className="h-6 bg-gray-700 rounded-full w-16" />
                <div className="h-6 bg-gray-700 rounded-full w-12" />
              </div>
              <div className="h-8 bg-gray-700 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
