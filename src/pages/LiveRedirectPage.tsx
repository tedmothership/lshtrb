import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getRoomLink } from '../utils/affiliateLinks';
import LoadingSpinner from '../components/LoadingSpinner';

const LiveRedirectPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    if (username) {
      // Redirect to the full video mode for the specific user
      const redirectUrl = getRoomLink(username, true); // true for full video mode
      window.location.href = redirectUrl;
    } else {
      // Fallback if username is somehow not provided, redirect to general affiliate link or homepage
      window.location.href = 'https://chaturbate.com/in/?tour=OnFvA&campaign=KMU7J&track=default';
    }
  }, [username]);

  return (
    <>
      <Helmet>
        <title>Redirecting to Live Show...</title>
        <meta name="robots" content="noindex, nofollow" /> {/* Important for redirect pages */}
      </Helmet>
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
        <LoadingSpinner />
        <p className="mt-4 text-lg">Taking you to {username ? `${username}'s` : 'a'} live show...</p>
        {username && (
          <p className="text-sm text-gray-400">
            If you are not redirected automatically, please <a href={getRoomLink(username, true)} className="text-purple-400 hover:text-purple-300">click here</a>.
          </p>
        )}
      </div>
    </>
  );
};

export default LiveRedirectPage;
