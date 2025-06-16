import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Eye, Heart, MapPin, Crown, Zap } from 'lucide-react';
import { Room } from '../types';
import { getRoomLink } from '../utils/affiliateLinks';

interface CamCardProps {
  room: Room;
}

const CamCard: React.FC<CamCardProps> = ({ room }) => {
  const getGenderColor = (gender: string) => {
    switch (gender) {
      case 'f': return 'text-pink-400';
      case 'm': return 'text-blue-400';
      case 't': return 'text-purple-400';
      case 'c': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case 'f': return 'Female';
      case 'm': return 'Male';
      case 't': return 'Trans';
      case 'c': return 'Couple';
      default: return 'Unknown';
    }
  };

  const getShowStatus = (show: string) => {
    switch (show) {
      case 'public': return { label: 'Public', color: 'bg-green-500' };
      case 'private': return { label: 'Private', color: 'bg-red-500' };
      case 'group': return { label: 'Group', color: 'bg-yellow-500' };
      case 'away': return { label: 'Away', color: 'bg-gray-500' };
      default: return { label: 'Unknown', color: 'bg-gray-500' };
    }
  };

  const status = getShowStatus(room.current_show);
  const timeOnline = Math.floor(room.seconds_online / 60);
  
  const affiliateLink = getRoomLink(room.username, false);

  return (
    <div className="group relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700 
                    hover:border-purple-500/50 transition-all duration-300 hover:scale-105 
                    hover:shadow-xl hover:shadow-purple-500/10 flex flex-col h-full"> {/* h-full is key */}
      {/* Image Container */}
      <Link to={`/model/${room.username}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={room.image_url_360x270}
            alt={room.username}
            className="w-full h-full object-cover transition-transform duration-300 
                     group-hover:scale-110"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {room.is_hd && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                HD
              </span>
            )}
            {room.is_new && (
              <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-semibold 
                             animate-pulse">
                NEW
              </span>
            )}
            <span className={`${status.color} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
              {status.label}
            </span>
          </div>

          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 
                        rounded-full flex items-center space-x-1">
            <Eye className="h-3 w-3" />
            <span>{room.num_users}</span>
          </div>

          <div className="absolute bottom-2 left-2 right-2">
            <div className="flex items-center justify-between text-white text-sm mb-2">
              <div className="flex items-center space-x-2">
                <Crown className={`h-4 w-4 ${getGenderColor(room.gender)}`} />
                <span className="font-semibold truncate">{room.username}</span>
              </div>
              <span className="text-xs text-gray-300">{room.age}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Card Content Area - Arranges TextWrapper and ButtonContainer vertically, TextWrapper grows */}
      <div className="p-4 flex flex-col flex-grow min-h-0"> {/* Removed space-y-3 from here */}
        
        {/* Text Content Wrapper - This div will grow, pushing the button container down */}
        <div className="flex-grow space-y-3"> {/* Added flex-grow here and space-y-3 */}
          {/* Room Subject */}
          <p className="text-gray-300 text-sm line-clamp-2 min-h-[2.5rem]">
            {room.room_subject || 'No description available'}
          </p>

          {/* Tags */}
          {room.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {room.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {room.tags.length > 3 && (
                <span className="text-gray-400 text-xs">+{room.tags.length - 3}</span>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{room.num_users}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-3 w-3" />
                <span>{room.num_followers}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span className={getGenderColor(room.gender)}>
                {getGenderLabel(room.gender)}
              </span>
            </div>
          </div>

          {/* Location & Time */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="truncate">{room.location || 'Unknown location'}</span>
            <span>{timeOnline}m online</span>
          </div>
        </div>

        {/* Action Buttons Container - No longer needs mt-auto */}
        <div className="flex space-x-2 pt-3"> 
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 
                     hover:to-pink-700 text-white text-center py-2 rounded-lg font-semibold 
                     transition-all duration-200 transform hover:scale-105 flex items-center 
                     justify-center space-x-2"
          >
            <Zap className="h-4 w-4" />
            <span>Watch Live</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CamCard;
