import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, FilterState } from '../types';

const API_BASE_URL = 'https://chaturbate.com/api/public/affiliates/onlinerooms/';
const AFFILIATE_CODE = 'OnFvA';
const ITEMS_PER_PAGE = 50;

export const useApi = () => {
  const [data, setData] = useState<ApiResponse>({ count: 0, results: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPageInternal] = useState(1); // Renamed to avoid confusion

  // The core data fetching logic
  const executeFetchRooms = useCallback(async (filters: FilterState, page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        wm: AFFILIATE_CODE,
        client_ip: 'request_ip',
        format: 'json',
        limit: ITEMS_PER_PAGE.toString(),
        offset: ((page - 1) * ITEMS_PER_PAGE).toString()
      });

      if (filters.gender.length > 0) {
        filters.gender.forEach(gender => params.append('gender', gender));
      }
      if (filters.region.length > 0) {
        filters.region.forEach(region => params.append('region', region));
      }
      if (filters.tags.length > 0) {
        filters.tags.slice(0, 5).forEach(tag => params.append('tag', tag));
      }
      if (filters.hd === true) {
        params.set('hd', 'true');
      } else if (filters.hd === false) {
        params.set('hd', 'false');
      }

      const url = `${API_BASE_URL}?${params.toString()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiData: ApiResponse = await response.json();
      
      let filteredResults = apiData.results;
      if (filters.search.trim()) {
        const searchTerm = filters.search.toLowerCase().trim();
        filteredResults = apiData.results.filter(room =>
          room.username.toLowerCase().includes(searchTerm) ||
          (room.room_subject && room.room_subject.toLowerCase().includes(searchTerm)) ||
          room.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          (room.location && room.location.toLowerCase().includes(searchTerm))
        );
      }

      setData({
        count: apiData.count,
        results: filteredResults
      });
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
      setData({ count: 0, results: [] });
    } finally {
      setLoading(false);
    }
  }, []); // Dependencies: setLoading, setError, setData (from useState, stable)
          // AFFILIATE_CODE, API_BASE_URL, ITEMS_PER_PAGE (constants, stable)

  const refetch = useCallback((filters: FilterState, page?: number) => {
    const pageToUse = page || currentPage; // Use the state currentPage
    const resetToPageOne = page === undefined; 
    const finalPage = resetToPageOne ? 1 : pageToUse;
    
    setCurrentPageInternal(finalPage); // Update the internal current page state
    return executeFetchRooms(filters, finalPage); // Call the renamed fetching function
  }, [executeFetchRooms, currentPage]); // Depends on the stable executeFetchRooms and internal currentPage

  return {
    data,
    loading,
    error,
    currentPage, // This is the state variable
    totalPages: Math.ceil(data.count / ITEMS_PER_PAGE),
    refetch,
    setCurrentPage: setCurrentPageInternal // Expose the internal state setter directly if needed elsewhere,
                                          // but AppContext will primarily use refetch.
  };
};
