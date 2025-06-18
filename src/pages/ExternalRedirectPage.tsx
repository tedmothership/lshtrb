import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getRandomRoomLink } from '../utils/affiliateLinks'; // Assuming you have this utility
import LoadingSpinner from '../components/LoadingSpinner';

const ExternalRedirectPage: React.FC = () => {
  useEffect(() => {
    // Attempt to fetch a random room and redirect.
    // This logic might need adjustment based on how getRandomRoomLink is implemented
    // (e.g., if it needs to fetch live rooms first).
    // For simplicity, we assume getRandomRoomLink directly provides a URL.
    
    const redirectUrl = getRandomRoomLink(); // This should give a full URL
    
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      // Fallback if no random room can be found, redirect to homepage or a generic affiliate link
      window.location.href = 'https://chaturbate.com/in/?tour=OnFvA&campaign=KMU7J&track=default&room='; 
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Redirecting...</title>
        <meta name="robots" content="noindex, nofollow" /> {/* Important for redirect pages */}
      </Helmet>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
        <LoadingSpinner />
        <p className="mt-4 text-lg">Redirecting you to an exciting live show...</p>
        <p className="text-sm text-gray-400">If you are not redirected automatically, please <a href={getRandomRoomLink()} className="text-purple-400 hover:text-purple-300">click here</a>.</p>
      </div>
    </>
  );
};

export default ExternalRedirectPage;
