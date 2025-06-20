import React from 'react';
import { Room } from '../types';
import CamCard from './CamCard';
import LoadingSpinner from './LoadingSpinner';

interface CamGridProps {
  rooms: Room[];
  loading: boolean;
  error: string | null;
}

const CamGrid: React.FC<CamGridProps> = ({ rooms, loading, error }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 md:p-6 w-11/12 max-w-md mx-auto">
          <h3 className="text-red-400 font-semibold mb-2 text-base sm:text-lg">Error Loading Content</h3>
          <p className="text-gray-400 text-xs sm:text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg 
                     text-sm sm:text-base transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 md:p-8 w-11/12 max-w-md mx-auto">
          <h3 className="text-gray-300 font-semibold mb-2 text-base sm:text-lg">No Performers Found</h3>
          <p className="text-gray-400 text-xs sm:text-sm">
            Try adjusting your filters or search terms to find more performers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 
                    gap-4 p-4 md:gap-6 md:p-6 items-stretch">
      {rooms.map((room) => (
        <CamCard key={room.username} room={room} />
      ))}
    </div>
  );
};

export default CamGrid;
