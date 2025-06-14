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
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>; // For direct state manipulation if needed, triggers useEffect
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  isFilterPanelOpen: boolean;
  setIsFilterPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetchData: (newFilters: FilterState, newPage?: number) => void; // For controlled refetch with specific page
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
  
  const { data, loading, error, currentPage, totalPages, refetch: apiRefetch, setCurrentPage: setApiCurrentPage } = useApi();
  const skipFilterEffectRef = useRef(false);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Update filters state when debounced search term changes
  // This will trigger the main filter effect below to refetch on page 1
  useEffect(() => {
    // Avoid updating if search term hasn't actually changed
    if (debouncedSearchTerm !== filters.search) {
      setFiltersState(prevFilters => ({ ...prevFilters, search: debouncedSearchTerm }));
    }
  }, [debouncedSearchTerm, filters.search]); // Added filters.search to prevent loop if setFiltersState was in deps

  // Main effect to refetch data when filters state changes (e.g., from FilterPanel, or debounced search)
  // This effect always resets to page 1.
  useEffect(() => {
    if (skipFilterEffectRef.current) {
      skipFilterEffectRef.current = false; // Reset flag and skip this run
      return;
    }
    apiRefetch(filters, 1); 
  }, [filters, apiRefetch]);


  // Passed as `setCurrentPage` to consumers (e.g., Pagination)
  const handleSetCurrentPage = useCallback((page: number) => {
    apiRefetch(filters, page); // Uses current filters from state, fetches specified page
  }, [filters, apiRefetch]);
  
  // Passed as `refetchData` to consumers.
  // Use this for scenarios requiring setting new filters AND a specific page simultaneously,
  // bypassing the default "reset to page 1" behavior of the main filter effect.
  const refetchDataWithNewFiltersAndPage = useCallback((newFilters: FilterState, newPage: number = 1) => {
    skipFilterEffectRef.current = true; // Signal to the main filter effect to skip its next run
    setFiltersState(newFilters);        // Update the filters state
    apiRefetch(newFilters, newPage);    // Directly call the API with the new filters and specified page
  }, [apiRefetch]); // setFiltersState is stable

  // This is the `setFilters` exposed to consumers like FilterPanel.
  // It directly updates the filter state, which then triggers the main useEffect.
  const updateFiltersAndTriggerEffect = useCallback((newFiltersOrUpdater: React.SetStateAction<FilterState>) => {
    setFiltersState(newFiltersOrUpdater);
  }, []); // setFiltersState is stable

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
      setFilters: updateFiltersAndTriggerEffect, // Use this for FilterPanel
      searchTerm,
      setSearchTerm,
      isFilterPanelOpen,
      setIsFilterPanelOpen,
      refetchData: refetchDataWithNewFiltersAndPage // Use this for more controlled refetches
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
