import React, { createContext, useState, useEffect, useCallback, useContext, ReactNode, useRef } from 'react';
import { ApiResponse, FilterState, Room } from '../types';
import { useApi } from '../hooks/useApi';

interface AppContextType {
  rooms: Room[];
  onlineCount: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  isFilterPanelOpen: boolean;
  setIsFilterPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetchData: (newFilters: FilterState, newPage?: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFiltersState] = useState<FilterState>({
    gender: [],
    tags: [],
    region: [],
    hd: null,
    search: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  
  const { 
    data, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    refetch: apiRefetch, 
    // setCurrentPage: setApiCurrentPage // Direct access to useApi's setter if needed
  } = useApi();
  const skipFilterEffectRef = useRef(false);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Update filters state when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm !== filters.search) {
      setFiltersState(prevFilters => ({ ...prevFilters, search: debouncedSearchTerm }));
    }
  }, [debouncedSearchTerm, filters.search]);

  // Main effect to refetch data when filters state changes (e.g., from FilterPanel, or debounced search)
  // This effect always resets to page 1.
  useEffect(() => {
    if (skipFilterEffectRef.current) {
      skipFilterEffectRef.current = false;
      return;
    }
    apiRefetch(filters, 1); 
  }, [filters, apiRefetch]);

  // Passed as `setCurrentPage` to consumers (e.g., Pagination)
  const handleSetCurrentPage = useCallback((page: number) => {
    apiRefetch(filters, page);
  }, [filters, apiRefetch]);
  
  // Passed as `refetchData` to consumers.
  const refetchDataWithNewFiltersAndPage = useCallback((newFilters: FilterState, newPage: number = 1) => {
    skipFilterEffectRef.current = true; 
    setFiltersState(newFilters);        
    apiRefetch(newFilters, newPage);    
  }, [apiRefetch]); 

  const updateFiltersAndTriggerEffect = useCallback((newFiltersOrUpdater: React.SetStateAction<FilterState>) => {
    setFiltersState(newFiltersOrUpdater);
  }, []);

  // Effect to adjust current page if totalPages changes and currentPage becomes out of bounds
  useEffect(() => {
    if (loading) return; // Don't adjust while a fetch is in progress

    // Ensure totalPages is not negative if data.count is 0
    const currentTotalPages = Math.max(0, totalPages);

    if (currentTotalPages > 0 && currentPage > currentTotalPages) {
      // Current page is out of bounds (e.g., was page 6, total pages became 5)
      // Fetch the new last valid page.
      handleSetCurrentPage(currentTotalPages);
    } else if (currentTotalPages === 0 && currentPage !== 1) {
      // No pages available (e.g. filters yield no results, or error reset count in useApi)
      // and current page is not 1. Reset to page 1.
      // This will trigger a fetch for page 1 with current filters,
      // which will likely still result in 0 pages, but state is consistent.
      handleSetCurrentPage(1);
    }
  }, [currentPage, totalPages, loading, handleSetCurrentPage]);
  // Note: handleSetCurrentPage depends on `filters` and `apiRefetch`.
  // `filters` is stable unless explicitly changed. `apiRefetch` is stable.
  // This effect correctly re-runs if `currentPage`, `totalPages`, or `loading` change.

  return (
    <AppContext.Provider value={{
      rooms: data.results,
      onlineCount: data.count,
      loading,
      error,
      currentPage,
      totalPages,
      setCurrentPage: handleSetCurrentPage,
      filters,
      setFilters: updateFiltersAndTriggerEffect,
      searchTerm,
      setSearchTerm,
      isFilterPanelOpen,
      setIsFilterPanelOpen,
      refetchData: refetchDataWithNewFiltersAndPage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
