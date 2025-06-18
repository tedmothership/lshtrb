import React, { useEffect, useState } from 'react';
import { Room } from '../types';
import CamCard from './CamCard';
import LoadingSpinner from './LoadingSpinner';
import { supabase } from '../supabaseClient'; // Import Supabase client

const API_BASE_URL = 'https://chaturbate.com/api/public/affiliates/onlinerooms/';
const AFFILIATE_CODE = 'OnFvA';
const FALLBACK_LIMIT = 12; // Max broadcasters from Supabase/fallback

const TopBroadcasters: React.FC = () => {
  const [topRooms, setTopRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [isFallback, setIsFallback] = useState(false); // No longer needed for title

  useEffect(() => {
    const fetchBroadcasters = async () => {
      setLoading(true);
      setError(null);
      // setIsFallback(false); // No longer needed for title
      let rooms: Room[] = [];
      let primaryFetchSucceeded = false;

      // Phase 1: Try fetching specified broadcasters from Supabase
      try {
        console.log('Fetching top broadcasters from Supabase...');
        const { data: supabaseBroadcasters, error: supabaseError } = await supabase
          .from('managed_top_broadcasters')
          .select('username')
          .order('priority', { ascending: false }) // Higher priority first
          .order('created_at', { ascending: false }) // Then by creation date
          .limit(FALLBACK_LIMIT);

        if (supabaseError) {
          console.warn('Error fetching from Supabase:', supabaseError.message);
          // Don't throw, allow fallback
        } else if (supabaseBroadcasters && supabaseBroadcasters.length > 0) {
          const usernames = supabaseBroadcasters.map(b => b.username);
          console.log('Usernames from Supabase:', usernames);

          const roomPromises = usernames.map(username => {
            const params = new URLSearchParams({
              wm: AFFILIATE_CODE,
              client_ip: 'request_ip',
              format: 'json',
              username: username,
            });
            const url = `${API_BASE_URL}?${params.toString()}`;
            return fetch(url).then(res => {
              if (!res.ok) {
                console.error(`Failed to fetch data for specified user ${username}: ${res.status}`);
                return null;
              }
              return res.json();
            });
          });

          const results = await Promise.allSettled(roomPromises);
          results.forEach(result => {
            if (result.status === 'fulfilled' && result.value) {
              const apiResponse = result.value as { count: number; results: Room[] };
              if (apiResponse.results && apiResponse.results.length > 0) {
                rooms.push(apiResponse.results[0]);
              }
            }
          });

          if (rooms.length > 0) {
            primaryFetchSucceeded = true;
            console.log('Found online broadcasters from Supabase list:', rooms.length);
          } else {
            console.info('No specified broadcasters from Supabase are currently online.');
          }
        } else {
          console.info('No broadcasters found in Supabase table managed_top_broadcasters.');
        }
      } catch (err) {
        console.warn('Unexpected error fetching or processing Supabase broadcasters:', err);
        // Allow fallback
      }

      // Phase 2: If no rooms from Phase 1, try fallback
      if (!primaryFetchSucceeded) {
        console.log('Specified broadcasters not found/offline or Supabase issue, attempting fallback...');
        // setIsFallback(true); // No longer needed for title
        try {
          const fallbackParams = new URLSearchParams({
            wm: AFFILIATE_CODE,
            client_ip: 'request_ip',
            format: 'json',
            limit: FALLBACK_LIMIT.toString(),
          });
          const fallbackUrl = `${API_BASE_URL}?${fallbackParams.toString()}`;
          const fallbackResponse = await fetch(fallbackUrl);
          if (!fallbackResponse.ok) {
            throw new Error(`Fallback API request failed: ${fallbackResponse.status}`);
          }
          const fallbackData = await fallbackResponse.json() as { count: number; results: Room[] };
          if (fallbackData.results && fallbackData.results.length > 0) {
            rooms = fallbackData.results;
            console.log('Fetched fallback broadcasters:', rooms.length);
          } else {
            console.info('Fallback fetch returned no broadcasters.');
          }
        } catch (fallbackErr) {
          console.error('Error fetching fallback broadcasters:', fallbackErr);
          setError(fallbackErr instanceof Error ? fallbackErr.message : 'Failed to load any broadcasters.');
        }
      }
      
      setTopRooms(rooms);
      setLoading(false);
    };

    fetchBroadcasters();
  }, []);

  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">Top Broadcasters</h2>
        <LoadingSpinner />
      </div>
    );
  }

  if (error && topRooms.length === 0) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Top Broadcasters</h2>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 md:p-6 max-w-md mx-auto">
          <h3 className="text-red-400 font-semibold mb-2 text-base sm:text-lg">Error Loading Broadcasters</h3>
          <p className="text-gray-400 text-xs sm:text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (topRooms.length === 0) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Top Broadcasters</h2>
        <div className="bg-gray-800/20 border border-gray-700/30 rounded-lg p-4 md:p-6 max-w-md mx-auto">
          <h3 className="text-gray-400 font-semibold mb-2 text-base sm:text-lg">No Broadcasters Online</h3>
          <p className="text-gray-500 text-xs sm:text-sm">
            There are currently no featured broadcasters online. Please check back later.
          </p>
        </div>
      </div>
    );
  }
  
  const title = "Top Broadcasters"; // Title is always "Top Broadcasters"

  return (
    <div className="py-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 
                      gap-4 p-4 md:gap-6 md:p-0 items-stretch">
        {topRooms.map((room) => (
          <CamCard key={room.username} room={room} />
        ))}
      </div>
    </div>
  );
};

export default TopBroadcasters;
