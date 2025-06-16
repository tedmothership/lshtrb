import React, { useEffect } from 'react';

// Define the target URL for Chaturbate.
// You might want to make this configurable or use a specific affiliate link.
const CHATURBATE_BASE_URL = 'https://chaturbate.com/';

const ExternalRedirectPage: React.FC = () => {
  useEffect(() => {
    // Perform the redirect to the external site
    window.location.href = CHATURBATE_BASE_URL;
  }, []);

  // Optionally, display a message while redirecting, though it might be too quick to see.
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
      <p className="text-lg">Redirecting to Chaturbate...</p>
    </div>
  );
};

export default ExternalRedirectPage;
