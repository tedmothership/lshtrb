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
    setFilters: setContextFilters, // This is `updateFiltersAndTriggerEffect` from AppContext
  } = useAppContext();

  // This function is called by FilterPanel when filters change.
  // It uses the `setFilters` from AppContext, which will update the state
  // and trigger the main useEffect in AppContext to refetch data on page 1.
  const handleFilterChange = (newFilters: import('../types').FilterState) => {
    setContextFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
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
        onFilterChange={handleFilterChange} // Pass the correct handler
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
