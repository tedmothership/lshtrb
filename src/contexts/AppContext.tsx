import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Room, FiltersState, AppContextType } from '../types';
import { supabase } from '../supabaseClient';
import { Database } from '../types/supabase';

type ManagedBroadcasterRow = Database['public']['Tables']['managed_top_broadcasters']['Row'];

const AppContext = createContext<AppContextType | undefined>(undefined);

const API_BASE_URL = 'https://chaturbate.com/api/public/affiliates/onlinerooms/';
const AFFILIATE_CODE = 'OnFvA';
const ROOMS_PER_PAGE = 30; // Default to 30, can be adjusted

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [managedBroadcasters, setManagedBroadcasters] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filters, setFilters] = useState<FiltersState>({
    gender: 'all',
    region: 'all', // Placeholder, API doesn't directly support this for onlinerooms
    tags: [],
    minAge: null,
    maxAge: null,
    isHd: null,
    sortBy: 'popular', // Placeholder, API sort options are limited
    searchQuery: '', // Initialize searchQuery
  });

  const fetchManagedBroadcastersFromApi = async (usernames: string[]): Promise<Room[]> => {
    if (usernames.length === 0) return [];
    // The public API doesn't allow fetching multiple specific users in one go.
    // We'd have to fetch all online rooms and filter, or make individual calls if an endpoint existed.
    // For simplicity, we'll fetch a larger set of online rooms and try to find them.
    // This is inefficient and not ideal for production for many managed users.
    const params = new URLSearchParams({
      wm: AFFILIATE_CODE,
      client_ip: 'request_ip', // Required by API
      format: 'json',
      limit: '500', // Fetch a large number to increase chances of finding them
    });

    try {
      const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
      if (!response.ok) {
        console.error(`API error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const onlineRooms: Room[] = data.results || [];
      
      return onlineRooms.filter(room => usernames.includes(room.username.toLowerCase()));
    } catch (err) {
      console.error('Failed to fetch managed broadcasters from API:', err);
      return []; // Return empty if API fetch fails
    }
  };
  
  const fetchManagedBroadcasters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: managedUsers, error: dbError } = await supabase
        .from('managed_top_broadcasters')
        .select('username, priority')
        .order('priority', { ascending: true, nullsFirst: false });

      if (dbError) {
        console.error('Error fetching managed users from Supabase:', dbError);
        throw dbError;
      }

      if (managedUsers && managedUsers.length > 0) {
        const usernames = managedUsers.map(u => u.username.toLowerCase());
        const apiBroadcasters = await fetchManagedBroadcastersFromApi(usernames);
        
        // Merge API data with priority from DB
        const mergedBroadcasters = managedUsers.map(dbUser => {
          const apiData = apiBroadcasters.find(apiRoom => apiRoom.username.toLowerCase() === dbUser.username.toLowerCase());
          return {
            ...(apiData || { username: dbUser.username, display_name: dbUser.username, age: null, gender: 'f', image_url_360x270: '/placeholder.png', room_status: 'offline', num_users: 0, tags: [], is_hd: false, chat_room_url_revshare: '#', num_followers:0, room_subject: 'Offline', broadcaster_display_name: dbUser.username, is_new: false, chat_room_url: '#', iframe_embed_revshare: '', iframe_embed: '', block_from_states: '', block_from_countries: '', creation_at: '', birthday: null, spoken_languages: [] }), // Provide defaults if offline
            priority: dbUser.priority || undefined,
            id: dbUser.username, // Use username as a unique ID for these items
          };
        }).sort((a, b) => (a.priority || Infinity) - (b.priority || Infinity)); // Sort by priority

        setManagedBroadcasters(mergedBroadcasters);
      } else {
        setManagedBroadcasters([]);
      }
    } catch (err) {
      console.error('Failed to fetch managed broadcasters:', err);
      setError('Could not load featured broadcasters.');
      setManagedBroadcasters([]);
    } finally {
      setLoading(false);
    }
  }, []);


  const fetchRooms = useCallback(async (page: number, currentFilters: FiltersState, signal: AbortSignal) => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      wm: AFFILIATE_CODE,
      client_ip: 'request_ip', // Required by API
      format: 'json',
      limit: ROOMS_PER_PAGE.toString(),
      offset: ((page - 1) * ROOMS_PER_PAGE).toString(),
    });

    if (currentFilters.gender !== 'all') {
      params.append('gender', currentFilters.gender);
    }
    if (currentFilters.tags.length > 0) {
      params.append('tags', currentFilters.tags.join(','));
    }
    if (currentFilters.isHd !== null) {
      // The API doesn't seem to have a direct 'isHd' filter.
      // This would need to be client-side if required.
    }
    // Add other filters if the API supports them (e.g., region, sortBy)
    // The public API has limited sorting/filtering. Most advanced filtering is client-side.

    try {
      const response = await fetch(`${API_BASE_URL}?${params.toString()}`, { signal });
      if (!response.ok) {
        if (response.status === 400 && signal.aborted) {
          // This can happen if a previous request was aborted due to a new one.
          // The API might return 400 for aborted requests that were malformed or interrupted.
          console.log('Fetch aborted by client, API returned 400.');
          return; // Don't treat as an error, just stop processing.
        }
        console.error(`API error! status: ${response.status} for URL: ${API_BASE_URL}?${params.toString()}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      let fetchedRooms: Room[] = data.results || [];
      const totalResults = data.count || 0;

      // Client-side filtering for searchQuery
      if (currentFilters.searchQuery && currentFilters.searchQuery.trim() !== '') {
        const query = currentFilters.searchQuery.toLowerCase().trim();
        fetchedRooms = fetchedRooms.filter(room => 
          room.username.toLowerCase().includes(query) ||
          room.display_name.toLowerCase().includes(query) ||
          (room.broadcaster_display_name && room.broadcaster_display_name.toLowerCase().includes(query)) ||
          room.tags.some(tag => tag.toLowerCase().includes(query))
        );
        // Note: Client-side search on a paginated API means you only search the current page.
        // For a full search, the API would need to support it, or you'd fetch all data (not feasible).
        // For this implementation, we accept this limitation.
      }
      
      // Client-side filtering for age if API doesn't support it
      if (currentFilters.minAge !== null) {
        fetchedRooms = fetchedRooms.filter(room => room.age !== null && room.age >= currentFilters.minAge!);
      }
      if (currentFilters.maxAge !== null) {
        fetchedRooms = fetchedRooms.filter(room => room.age !== null && room.age <= currentFilters.maxAge!);
      }


      setRooms(fetchedRooms);
      setTotalPages(Math.ceil(totalResults / ROOMS_PER_PAGE)); // Total pages based on API count before client search
      setCurrentPage(page);

    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Fetch aborted');
        return; // Don't set error for aborted requests
      }
      console.error('Failed to fetch rooms:', err);
      setError('Failed to load rooms. The content might be unavailable or check your connection.');
      setRooms([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    fetchRooms(currentPage, filters, signal);
    fetchManagedBroadcasters(); // Fetch managed broadcasters on initial load and filter changes

    return () => {
      controller.abort(); // Abort fetch if component unmounts or dependencies change
    };
  }, [currentPage, filters, fetchRooms, fetchManagedBroadcasters]);

  return (
    <AppContext.Provider value={{ 
      rooms, 
      managedBroadcasters,
      loading, 
      error, 
      currentPage, 
      totalPages, 
      filters, 
      setCurrentPage, 
      setFilters,
      fetchRooms,
      fetchManagedBroadcasters
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
