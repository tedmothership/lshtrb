import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, FilterState } from '../types';

const API_BASE_URL = 'https://chaturbate.com/api/public/affiliates/onlinerooms/';
const AFFILIATE_CODE = 'OnFvA';
const ITEMS_PER_PAGE = 50;

export const useApi = () => {
  const [data, setData] = useState<ApiResponse>({ count: 0, results: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRooms = useCallback(async (filters: FilterState, page: number = 1) => {
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

      // Add gender filters
      if (filters.gender.length > 0) {
        filters.gender.forEach(gender => {
          params.append('gender', gender);
        });
      }

      // Add region filters
      if (filters.region.length > 0) {
        filters.region.forEach(region => {
          params.append('region', region);
        });
      }

      // Add tag filters
      if (filters.tags.length > 0) {
        filters.tags.slice(0, 5).forEach(tag => { // API limits to 5 tags
          params.append('tag', tag);
        });
      }

      // Add HD filter
      if (filters.hd === true) {
        params.set('hd', 'true');
      } else if (filters.hd === false) {
        params.set('hd', 'false');
      }
      // If filters.hd is null, the 'hd' parameter is not added.

      const url = `${API_BASE_URL}?${params.toString()}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiData: ApiResponse = await response.json();
      
      // Apply search filter client-side
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
        count: apiData.count, // Use API's total count for pagination purposes
        results: filteredResults // Results are client-side filtered
      });
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
      setData({ count: 0, results: [] }); // Reset data on error
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback((filters: FilterState, page?: number) => {
    const pageToUse = page || currentPage;
    // If filters change, reset to page 1, unless a specific page is requested
    const resetToPageOne = page === undefined; 
    const finalPage = resetToPageOne ? 1 : pageToUse;
    setCurrentPage(finalPage);
    return fetchRooms(filters, finalPage);
  }, [fetchRooms, currentPage]);

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages: Math.ceil(data.count / ITEMS_PER_PAGE),
    refetch,
    setCurrentPage // Expose setCurrentPage for direct manipulation if needed
  };
};
