import { Room } from '../types';

const API_BASE_URL = 'https://chaturbate.com/api/public/affiliates/onlinerooms/';
const AFFILIATE_CODE = 'OnFvA'; // Your affiliate code

/**
 * Fetches details for a specific model by username.
 * This simulates fetching a list and finding the user, as the public API
 * might not have a direct endpoint for a single user by username without knowing
 * their current status or if they are online.
 */
export const fetchModelDetailsByName = async (username: string): Promise<Room | null> => {
  const params = new URLSearchParams({
    wm: AFFILIATE_CODE,
    client_ip: 'request_ip',
    format: 'json',
    limit: '200' // Fetch a decent number to increase chances of finding the user if online
  });

  // Note: The Chaturbate API doesn't have a direct public search by username for *any* room.
  // It lists online rooms. If the model is offline, this won't find them.
  // This function will search within the currently online rooms.
  const url = `${API_BASE_URL}?${params.toString()}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`API error! status: ${response.status} for URL: ${url}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const apiData: { count: number, results: Room[] } = await response.json();
    
    // Find the room by username (case-insensitive)
    const foundRoom = apiData.results.find(
      r => r.username.toLowerCase() === username.toLowerCase()
    );
    
    return foundRoom || null; // Returns null if not found among online rooms
  } catch (error) {
    console.error('Failed to fetch model details by name:', error);
    return null;
  }
};
