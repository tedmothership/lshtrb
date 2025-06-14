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
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md">
          <h3 className="text-red-400 font-semibold mb-2">Error Loading Content</h3>
          <p className="text-gray-400 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg 
                     transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 max-w-md">
          <h3 className="text-gray-300 font-semibold mb-2">No Performers Found</h3>
          <p className="text-gray-400 text-sm">
            Try adjusting your filters or search terms to find more performers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 
                    gap-6 p-6">
      {rooms.map((room) => (
        <CamCard key={room.username} room={room} />
      ))}
    </div>
  );
};

export default CamGrid;
