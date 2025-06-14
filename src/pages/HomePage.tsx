import React, { useCallback } from 'react';
import CamGrid from '../components/CamGrid';
import Pagination from '../components/Pagination';
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
      <CamGrid
        rooms={rooms}
        loading={loading}
        error={error}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
}

export default HomePage;
