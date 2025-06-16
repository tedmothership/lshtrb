import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Heart, MapPin, Crown, Eye, Clock, Star, Zap, Video } from 'lucide-react';
import { Room } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import { getRoomLink, getFullVideoModeLink, getEmbeddableRoomVideoLink } from '../utils/affiliateLinks';

const ModelPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [model, setModel] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModel = async () => {
      if (!username) return;

      setLoading(true);
      setError(null);
      setModel(null); 

      try {
        const params = new URLSearchParams({
          wm: 'OnFvA',
          client_ip: 'request_ip',
          format: 'json',
          limit: '500' 
        });

        const response = await fetch(`https://chaturbate.com/api/public/affiliates/onlinerooms/?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error(`API error! status: ${response.status}`);
        }

        const data = await response.json();
        const foundModel = data.results.find((room: Room) => room.username.toLowerCase() === username.toLowerCase());
        
        if (!foundModel) {
          throw new Error('Model currently offline or username not found in live rooms.');
        }

        setModel(foundModel);
      } catch (err) {
        console.error('Error fetching model:', err);
        setError(err instanceof Error ? err.message : 'Failed to load model data.');
      } finally {
        setLoading(false);
      }
    };

    fetchModel();
  }, [username]);

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
      case 'public': return { label: 'Public Show', color: 'bg-green-500', icon: '🟢' };
      case 'private': return { label: 'Private Show', color: 'bg-red-500', icon: '🔴' };
      case 'group': return { label: 'Group Show', color: 'bg-yellow-500', icon: '🟡' };
      case 'away': return { label: 'Away', color: 'bg-gray-500', icon: '⚫' };
      default: return { label: 'Unknown', color: 'bg-gray-500', icon: '⚫' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !model) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 mb-8"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md">
              <h3 className="text-red-400 font-semibold mb-2">Unable to Display Model</h3>
              <p className="text-gray-400 text-sm">
                {error || 'This model may be currently offline, or the username could not be found in the live rooms. Please try again later or check the username.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const status = getShowStatus(model.current_show);
  const timeOnline = Math.floor(model.seconds_online / 60);
  
  const roomLink = getRoomLink(model.username, false);
  const fullVideoLink = getFullVideoModeLink(model.gender, model.username);
  const embedVideoLink = getEmbeddableRoomVideoLink(model.username);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 mb-8 
                   transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Removed the AlertTriangle warning box about embedding */}

            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 mb-6">
              <div className="aspect-video relative">
                <iframe
                  src={embedVideoLink}
                  title={`${model.username}'s live stream preview`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; encrypted-media" // Autoplay might work due to disable_sound=1
                  allowFullScreen
                  scrolling="no" // As per Chaturbate's example iframe
                ></iframe>
                
                {/* Status Badges & Viewer Count - positioned on top of the iframe */}
                <div className="absolute top-4 left-4 flex space-x-2 pointer-events-none">
                  <span className={`${status.color} text-white text-sm px-3 py-1 rounded-full font-semibold`}>
                    {status.icon} {status.label}
                  </span>
                  {model.is_hd && (
                    <span className="bg-green-500 text-white text-sm px-2 py-1 rounded-full font-semibold">
                      HD
                    </span>
                  )}
                  {model.is_new && (
                    <span className="bg-pink-500 text-white text-sm px-2 py-1 rounded-full font-semibold animate-pulse">
                      NEW
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 
                              rounded-full flex items-center space-x-1 pointer-events-none">
                  <Eye className="h-4 w-4" />
                  <span>{model.num_users} watching</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
              <h2 className="text-lg font-semibold text-white mb-3">Room Topic</h2>
              <p className="text-gray-300 leading-relaxed">
                {model.room_subject || 'No room topic available'}
              </p>
            </div>

            {model.tags.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {model.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-500/20 border border-purple-500/30 text-purple-300 
                               px-3 py-1 rounded-full text-sm hover:bg-purple-500/30 
                               transition-colors duration-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <Crown className={`h-8 w-8 ${getGenderColor(model.gender)}`} />
                  {model.is_new && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs 
                                   px-1 rounded-full animate-pulse">
                      NEW
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{model.username}</h1>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className={getGenderColor(model.gender)}>
                      {getGenderLabel(model.gender)}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-300">{model.age} years old</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center space-x-1 text-green-400 mb-1">
                    <Eye className="h-4 w-4" />
                    <span className="font-semibold">{model.num_users}</span>
                  </div>
                  <p className="text-xs text-gray-400">Viewers</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center space-x-1 text-pink-400 mb-1">
                    <Heart className="h-4 w-4" />
                    <span className="font-semibold">{model.num_followers}</span>
                  </div>
                  <p className="text-xs text-gray-400">Followers</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{model.location || 'Location not specified'}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{timeOnline} minutes online</span>
                </div>
                {model.spoken_languages && (
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Star className="h-4 w-4 text-gray-400" />
                    <span>{model.spoken_languages}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={roomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 
                         hover:from-purple-700 hover:to-pink-700 text-white text-center 
                         py-3 rounded-lg font-semibold transition-all duration-200 
                         transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Zap className="h-5 w-5" />
                <span>Enter Chat Room</span>
              </a>
              
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 
                               rounded-lg font-semibold transition-colors duration-200 
                               flex items-center justify-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Follow Model</span>
              </button>

              <a
                href={fullVideoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-green-600 to-blue-600 
                         hover:from-green-700 hover:to-blue-700 text-white text-center 
                         py-3 rounded-lg font-semibold transition-all duration-200 
                         transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Video className="h-5 w-5" />
                <span>Join Full Livestream</span> {/* Updated text for clarity */}
              </a>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Model Info</h3>
              <div className="space-y-3 text-sm">
                {model.birthday && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Birthday:</span>
                    <span className="text-gray-300">{model.birthday}</span>
                  </div>
                )}
                {model.country && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Country:</span>
                    <span className="text-gray-300">{model.country}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Gender:</span>
                  <span className={getGenderColor(model.gender)}>
                    {getGenderLabel(model.gender)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="text-green-300 font-semibold mb-2">Affiliate Program</h4>
              <p className="text-gray-400 text-sm">
                Earn 20% revenue share + $50 per broadcaster signup + 5% referred affiliate income 
                through our premium affiliate program.
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">About Embedded Preview</h4>
              <p className="text-gray-400 text-sm">
                This is a video-only preview. For the full interactive experience including chat and tipping, 
                please use the "Enter Chat Room" or "Join Full Livestream" buttons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelPage;
