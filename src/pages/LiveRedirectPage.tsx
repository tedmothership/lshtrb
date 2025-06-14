import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomLink } from '../utils/affiliateLinks'; // Ensure this path is correct
import LoadingSpinner from '../components/LoadingSpinner'; // Optional: for a brief loading state

const LiveRedirectPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      // Construct the affiliate link to the model's room
      // The second parameter `false` means not to use full video mode by default,
      // leading to the standard room page.
      const affiliateUrl = getRoomLink(username, false);
      
      // Perform the redirect
      window.location.href = affiliateUrl;
    } else {
      // If no username is provided (shouldn't happen with the route setup, but good for safety)
      // Redirect to homepage or an error page
      navigate('/'); 
    }
  }, [username, navigate]);

  // Display a loading message while redirecting
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
      <LoadingSpinner />
      <p className="mt-4 text-lg">Redirecting to {username}'s room on Chaturbate...</p>
      <p className="text-sm text-gray-400">If you are not redirected automatically, 
        <a 
          href={username ? getRoomLink(username, false) : '#'} 
          className="text-purple-400 hover:text-purple-300 underline ml-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          click here
        </a>.
      </p>
    </div>
  );
};

export default LiveRedirectPage;
