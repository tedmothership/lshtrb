import { Room } from '../types'; // Assuming Room might be used or relevant contextually

// Affiliate linking utility for Chaturbate integration
// Campaign: OnFvA, Revshare: 20% + $50 per broadcaster + 5% referred affiliate income

export interface AffiliateLinkOptions {
  tour: string;
  campaign?: string;
  track?: string;
  room?: string;
  next?: string;
  signup_notice?: string;
  // Allow arbitrary extra string parameters for flexibility with new API options
  [key: string]: string | undefined; 
}

const BASE_URL = 'https://chaturbate.com/in/';
const EMBED_BASE_URL = 'https://chaturbate.com/embed/'; // For direct embeds
const DEFAULT_CAMPAIGN = 'OnFvA';
const DEFAULT_TRACK = 'default';

export const TOUR_CODES = {
  // Home Pages
  HOME_PAGE: 'grq0',
  HOME_PAGE_NO_POPUP: 'IGtl',
  HOME_PAGE_FEMALE: 'IsSO',
  HOME_PAGE_FEMALE_NO_POPUP: 'EuIR',
  HOME_PAGE_MALE: 'R2Xc',
  HOME_PAGE_MALE_NO_POPUP: 'YKzf',
  HOME_PAGE_COUPLE: '0G9g',
  HOME_PAGE_COUPLE_NO_POPUP: 'DqyZ',
  HOME_PAGE_TRANS: 'khMd',
  HOME_PAGE_TRANS_NO_POPUP: 'vj0T',

  // Current Top Rooms
  CURRENT_TOP_ROOM: 'hr8m',
  CURRENT_TOP_ROOM_NO_POPUP: 'VKKA',
  CURRENT_TOP_ROOM_FEMALE: 'uhEc',
  CURRENT_TOP_ROOM_FEMALE_NO_POPUP: '6hnx',
  CURRENT_TOP_ROOM_MALE: 'EyCi',
  CURRENT_TOP_ROOM_MALE_NO_POPUP: 'm58x',
  CURRENT_TOP_ROOM_COUPLE: '43Qk',
  CURRENT_TOP_ROOM_COUPLE_NO_POPUP: 'yDHd',
  CURRENT_TOP_ROOM_TRANS: '2MTk',
  CURRENT_TOP_ROOM_TRANS_NO_POPUP: 'w217',

  // Full Video Mode
  FULL_VIDEO_MODE: 'dU9X',
  FULL_VIDEO_MODE_FEMALE: 'gLDS',
  FULL_VIDEO_MODE_MALE: '4xFT',
  FULL_VIDEO_MODE_COUPLE: 'GORs',
  FULL_VIDEO_MODE_TRANS: '4auy',
  FULL_VIDEO_MODE_CUSTOM: 'Limj', // Used for specific room in full video mode

  // Random Rooms
  RANDOM_ROOM_FEMALE: '41Ea',
  RANDOM_ROOM_MALE: '9rL0',
  RANDOM_ROOM_COUPLE: 'goZq',
  RANDOM_ROOM_TRANS: 'sxJR',

  // Regions
  REGION_NORTH_AMERICAN: 'NAcr',
  REGION_EURO_RUSSIAN: 'ERcr',
  REGION_ASIAN: 'AZcr',
  REGION_SOUTH_AMERICAN: 'SAcr',
  REGION_OTHER: 'ORcr',

  // Join Pages
  JOIN_PAGE: '3Mc9',
  JOIN_PAGE_FEMALE: 'JpRf',
  JOIN_PAGE_MALE: 'JpRm',
  JOIN_PAGE_COUPLE: 'JpRc',
  JOIN_PAGE_TRANS: 'JpRt',
  JOIN_PAGE_REDIRECT_TO_ROOM: 'APi5', // New: For "Join Page and Redirect to Room"

  // Special Pages
  BROADCASTER_SIGNUP: 'NwNd',
  CONTEST_DETAILS: 'jb4g',
  AFFILIATE_PROGRAM: '07kX',
  YOUR_CHAT_ROOM: 'dT8X', // Used for specific room, standard view
  YOUR_CHAT_ROOM_HOMEPAGE_FALLBACK: 'LQps',

  // Embed Specific
  VIDEO_EMBED: 'dTm0' // Tour code commonly used in Chaturbate's official video embeds
} as const;

export function buildAffiliateLink(options: AffiliateLinkOptions): string {
  // Destructure known properties and gather the rest into extraParams
  const { tour, campaign, track, room, next, signup_notice, ...extraParams } = options;
  
  const params = new URLSearchParams({
    tour: tour,
    campaign: campaign || DEFAULT_CAMPAIGN,
    track: track || DEFAULT_TRACK
  });

  // Add standard optional parameters
  if (room) params.set('room', room);
  if (next) params.set('next', next);
  if (signup_notice) params.set('signup_notice', signup_notice);

  // Add any extra parameters passed in the options object
  for (const key in extraParams) {
    if (extraParams[key] !== undefined) {
      params.set(key, extraParams[key]!);
    }
  }

  return `${BASE_URL}?${params.toString()}`;
}

// Gender-specific link builders
export function getGenderSpecificLink(gender: string, usePopup: boolean = true): string {
  const tourCode = (() => {
    switch (gender) {
      case 'f':
        return usePopup ? TOUR_CODES.HOME_PAGE_FEMALE : TOUR_CODES.HOME_PAGE_FEMALE_NO_POPUP;
      case 'm':
        return usePopup ? TOUR_CODES.HOME_PAGE_MALE : TOUR_CODES.HOME_PAGE_MALE_NO_POPUP;
      case 'c':
        return usePopup ? TOUR_CODES.HOME_PAGE_COUPLE : TOUR_CODES.HOME_PAGE_COUPLE_NO_POPUP;
      case 't':
        return usePopup ? TOUR_CODES.HOME_PAGE_TRANS : TOUR_CODES.HOME_PAGE_TRANS_NO_POPUP;
      default:
        return usePopup ? TOUR_CODES.HOME_PAGE : TOUR_CODES.HOME_PAGE_NO_POPUP;
    }
  })();

  return buildAffiliateLink({ tour: tourCode });
}

// Room-specific link builder
export function getRoomLink(username: string, useFullVideo: boolean = false): string {
  const tourCode = useFullVideo ? TOUR_CODES.FULL_VIDEO_MODE_CUSTOM : TOUR_CODES.YOUR_CHAT_ROOM;
  const trackValue = useFullVideo 
    ? `${username}_fvm_broadcaster` 
    : `${username}_broadcaster`;
  
  return buildAffiliateLink({
    tour: tourCode,
    room: username,
    track: trackValue,
    ...(useFullVideo && { signup_notice: '1' })
  });
}

// New function to get embeddable video-only link for a specific room
export function getEmbeddableRoomVideoLink(username: string): string {
  const params = new URLSearchParams({
    tour: TOUR_CODES.VIDEO_EMBED, 
    campaign: DEFAULT_CAMPAIGN,   
    track: `${username}_embed_broadcaster`, // Updated tracking
    disable_sound: '1',         
    embed_video_only: '1',      
    mobileRedirect: 'auto'      
  });

  return `${EMBED_BASE_URL}${username}/?${params.toString()}`;
}


// Top room link by gender
export function getTopRoomLink(gender: string, usePopup: boolean = true): string {
  const tourCode = (() => {
    switch (gender) {
      case 'f':
        return usePopup ? TOUR_CODES.CURRENT_TOP_ROOM_FEMALE : TOUR_CODES.CURRENT_TOP_ROOM_FEMALE_NO_POPUP;
      case 'm':
        return usePopup ? TOUR_CODES.CURRENT_TOP_ROOM_MALE : TOUR_CODES.CURRENT_TOP_ROOM_MALE_NO_POPUP;
      case 'c':
        return usePopup ? TOUR_CODES.CURRENT_TOP_ROOM_COUPLE : TOUR_CODES.CURRENT_TOP_ROOM_COUPLE_NO_POPUP;
      case 't':
        return usePopup ? TOUR_CODES.CURRENT_TOP_ROOM_TRANS : TOUR_CODES.CURRENT_TOP_ROOM_TRANS_NO_POPUP;
      default:
        return usePopup ? TOUR_CODES.CURRENT_TOP_ROOM : TOUR_CODES.CURRENT_TOP_ROOM_NO_POPUP;
    }
  })();

  return buildAffiliateLink({ tour: tourCode });
}

// Random room link by gender
export function getRandomRoomLink(gender: string): string {
  const tourCode = (() => {
    switch (gender) {
      case 'f': return TOUR_CODES.RANDOM_ROOM_FEMALE;
      case 'm': return TOUR_CODES.RANDOM_ROOM_MALE;
      case 'c': return TOUR_CODES.RANDOM_ROOM_COUPLE;
      case 't': return TOUR_CODES.RANDOM_ROOM_TRANS;
      default: return TOUR_CODES.CURRENT_TOP_ROOM; 
    }
  })();

  return buildAffiliateLink({ tour: tourCode });
}

// Join page link by gender
export function getJoinPageLink(gender?: string, redirectPath?: string): string {
  const tourCode = (() => {
    switch (gender) {
      case 'f': return TOUR_CODES.JOIN_PAGE_FEMALE;
      case 'm': return TOUR_CODES.JOIN_PAGE_MALE;
      case 'c': return TOUR_CODES.JOIN_PAGE_COUPLE;
      case 't': return TOUR_CODES.JOIN_PAGE_TRANS;
      default: return TOUR_CODES.JOIN_PAGE;
    }
  })();

  const linkOptions: AffiliateLinkOptions = { tour: tourCode };
  
  if (redirectPath) {
    linkOptions.next = redirectPath;
  }

  return buildAffiliateLink(linkOptions);
}

// New: Join Page and Redirect to Room (for "Follow Model" button)
export function getFollowModelLink(username: string): string {
  return buildAffiliateLink({
    tour: TOUR_CODES.JOIN_PAGE_REDIRECT_TO_ROOM,
    room: username,
    track: `${username}_follow_redirect` // Specific tracking for this action
  });
}

// Region-specific links
export function getRegionLink(region: string): string {
  const tourCode = (() => {
    switch (region.toLowerCase()) { 
      case 'northamerica': return TOUR_CODES.REGION_NORTH_AMERICAN;
      case 'europe_russia': return TOUR_CODES.REGION_EURO_RUSSIAN;
      case 'asia': return TOUR_CODES.REGION_ASIAN;
      case 'southamerica': return TOUR_CODES.REGION_SOUTH_AMERICAN;
      case 'other': return TOUR_CODES.REGION_OTHER;
      default: return TOUR_CODES.HOME_PAGE; 
    }
  })();

  return buildAffiliateLink({ tour: tourCode });
}

// Full video mode links (for specific rooms or by gender)
export function getFullVideoModeLink(gender?: string, room?: string): string {
  const tourCode = (() => {
    if (room) return TOUR_CODES.FULL_VIDEO_MODE_CUSTOM;
    
    switch (gender) {
      case 'f': return TOUR_CODES.FULL_VIDEO_MODE_FEMALE;
      case 'm': return TOUR_CODES.FULL_VIDEO_MODE_MALE;
      case 'c': return TOUR_CODES.FULL_VIDEO_MODE_COUPLE;
      case 't': return TOUR_CODES.FULL_VIDEO_MODE_TRANS;
      default: return TOUR_CODES.FULL_VIDEO_MODE;
    }
  })();

  const trackValue = room 
    ? `${room}_fvm_broadcaster` 
    : `full_video_${gender || 'general'}`;

  return buildAffiliateLink({
    tour: tourCode,
    signup_notice: '1', 
    ...(room && { room }),
    track: trackValue 
  });
}

// Special utility for tracking custom campaigns (if ever needed)
export function buildCustomTrackingLink(tour: string, track: string, sid?: string): string {
  const params = new URLSearchParams({
    tour,
    campaign: DEFAULT_CAMPAIGN, 
    track
  });

  if (sid) {
    params.set('sid', sid); 
  }

  return `${BASE_URL}?${params.toString()}`;
}
