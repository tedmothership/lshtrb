export interface Room {
  username: string;
  gender: 'f' | 'm' | 's' | 'c' | 't'; // female, male, couple (male + female), trans, couple (female + female)
  display_name: string;
  image_url_360x270: string;
  image_url: string;
  chat_room_url_revshare: string; // Affiliate link
  chat_room_url: string; // Direct link
  iframe_embed_revshare: string;
  iframe_embed: string;
  block_from_states: string; // e.g., "AL,AK,AS,AZ,AR..."
  block_from_countries: string; // e.g., "AF,AX,AL,DZ..."
  broadcaster_display_name: string;
  is_hd: boolean;
  is_new: boolean;
  num_followers: number;
  num_users: number; // Current viewers
  room_status: 'public' | 'private' | 'away' | 'offline'; // Assuming possible values
  room_subject: string;
  tags: string[];
  creation_at: string; // Date string
  birthday: string | null; // Date string or null
  age: number | null;
  spoken_languages: string[]; // e.g., ["en", "es"]
  // Potentially other fields from a more detailed API if available
  // For managed broadcasters
  priority?: number; 
  id?: string; // if it comes from our DB
  created_at?: string; // if it comes from our DB
}

export interface FiltersState {
  gender: 'all' | 'f' | 'm' | 's' | 'c' | 't';
  region: 'all' | 'us' | 'eu' | 'asia' | 'other'; // Example regions
  tags: string[];
  minAge: number | null;
  maxAge: number | null;
  isHd: boolean | null;
  sortBy: 'popular' | 'newest' | 'viewers';
  searchQuery?: string; // Added for search functionality
}

export interface AppContextType {
  rooms: Room[];
  managedBroadcasters: Room[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  filters: FiltersState;
  setCurrentPage: (page: number) => void;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  fetchRooms: (page: number, filters: FiltersState, signal: AbortSignal) => Promise<void>;
  fetchManagedBroadcasters: () => Promise<void>;
}

export interface AffiliateLinkOptions {
  tracking?: string;
  campaign?: string;
  tour?: string; // e.g., 'xxx', 'fhg', 'sites'
  gender?: 'female' | 'male' | 'couple' | 'trans';
  tags?: string[];
}
