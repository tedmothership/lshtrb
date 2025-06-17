import React, { useCallback } from 'react';
import CamGrid from '../components/CamGrid';
import Pagination from '../components/Pagination';
import TopBroadcasters from '../components/TopBroadcasters'; // Import the new component
import { useAppContext } from '../contexts/AppContext';

function HomePage() {
  const {
    rooms,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useAppContext();

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setCurrentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Broadcasters Section */}
      <TopBroadcasters />

      {/* Divider (optional) */}
      {rooms.length > 0 && <hr className="my-8 sm:my-12 border-gray-700" />}
      
      {/* Main Grid Title (optional, if you want a title for the main paginated grid) */}
      {/* <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
        Live Now
      </h2> */}

      <CamGrid
        rooms={rooms}
        loading={loading} // This loading is for the main paginated grid
        error={error}     // This error is for the main paginated grid
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        loading={loading} // Pass loading state to pagination as well
      />
    </div>
  );
}

export default HomePage;
