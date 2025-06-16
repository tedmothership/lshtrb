import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import FilterPanel from './FilterPanel';
import { useAppContext } from '../contexts/AppContext';
import Footer from './Footer'; // Assuming Footer component exists

const Layout: React.FC = () => {
  const {
    onlineCount,
    searchTerm,
    setSearchTerm,
    isFilterPanelOpen,
    setIsFilterPanelOpen,
    filters,
    setFilters: setContextFilters,
  } = useAppContext();

  const handleFilterChange = (newFilters: import('../types').FilterState) => {
    setContextFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col w-full overflow-x-hidden">
      <Header
        onlineCount={onlineCount}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterToggle={() => setIsFilterPanelOpen(true)}
      />
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
