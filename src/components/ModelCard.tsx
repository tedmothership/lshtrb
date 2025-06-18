import React from 'react';
import { Eye, Heart, MapPin, Tag, Zap, Crown, Video } from 'lucide-react';
import { Room } from '../types'; // Assuming you have a Room type
import { getGenderSpecificLink } from '../utils/affiliateLinks'; // Assuming you use this for links

interface ModelCardProps {
  model: Room;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const {
    display_name,
    gender,
    is_hd,
    is_new,
    num_users,
    num_followers,
    preview_url_medium: imageUrl, // or other preview_url
    room_subject: subject,
    tags,
    username,
    // Assuming these might be part of your Room type or you derive them
    location = "Unknown Location", 
    age = "N/A",
  } = model;

  const modelProfileLink = getGenderSpecificLink(username, gender === 'female'); // Example link

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-pink-500/30 group">
      <a href={modelProfileLink} target="_blank" rel="noopener noreferrer" className="relative block">
        <img 
          src={imageUrl || `https://placehold.co/300x225/1f2937/374151?text=${display_name}`} 
          alt={`${display_name}'s live stream preview`} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute top-2 left-2 flex space-x-1">
          {is_hd === 1 && <span className="bg-pink-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">HD</span>}
          {/* You might want a different indicator for 'Public' if it's always public */}
          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">Public</span> 
        </div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
          <Eye className="w-3 h-3 mr-1" /> {num_users}
        </div>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full flex items-center">
          <Crown className="w-3.5 h-3.5 mr-1 text-purple-400" />
          <span className="font-semibold">{display_name}</span>
          <span className="ml-1.5 text-gray-300">({age})</span>
        </div>
      </a>

      <div className="p-4 flex flex-col flex-grow">
        <a href={modelProfileLink} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
          <h3 className="text-sm font-semibold text-white truncate mb-1" title={subject}>
            {subject || "Live Show"}
          </h3>
        </a>

        {tags && tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="text-xs text-gray-400 mb-3 space-y-0.5">
          <div className="flex items-center">
            <Heart className="w-3.5 h-3.5 mr-1.5 text-pink-500" /> {num_followers} followers
          </div>
          <div className="flex items-center truncate">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> {location}
          </div>
        </div>
        
        <div className="mt-auto">
          {/* THIS IS THE BUTTON TO HIDE ON MOBILE */}
          <a
            href={modelProfileLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <Zap className="w-4 h-4 mr-2" />
            Watch Live
          </a>
          {/* On mobile, the card itself is clickable, so this button is less critical */}
          {/* You could add a smaller, less prominent link for mobile if desired, or rely on image/title click */}
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
