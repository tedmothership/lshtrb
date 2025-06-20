import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Room } from '../types';
import { fetchModelDetailsByName } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  ArrowLeft, Users, Clock, MapPin, Eye, Heart, Languages, Crown, Zap, Tv2, PlaySquare, Gift, CalendarDays
} from 'lucide-react';
import { getGenderSpecificLink } from '../utils/affiliateLinks';

const DESKTOP_IFRAME_SRC = "https://cbxyz.com/in/?tour=dU9X&campaign=OnFvA&track=embed&signup_notice=1&disable_sound=1&mobileRedirect=never";
const MOBILE_IFRAME_SRC = "https://cbxyz.com/in/?tour=dTm0&campaign=OnFvA&track=embed&disable_sound=1&mobileRedirect=auto&embed_video_only=1";

const ModelPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!username) {
      setError("No username provided.");
      setLoading(false);
      return;
    }

    const loadModelData = async () => {
      setLoading(true);
      setError(null);
      setRoom(null); 
      try {
        const modelData = await fetchModelDetailsByName(username);
        if (modelData) {
          setRoom(modelData);
        } else {
          setError(`Model "${username}" not found or may be offline.`);
        }
      } catch (err) {
        console.error("Error in loadModelData:", err);
        setError(err instanceof Error ? err.message : "Failed to load model data.");
      } finally {
        setLoading(false);
      }
    };

    loadModelData();
  }, [username]);

  const formatOnlineTime = (seconds: number | undefined): string => {
    if (seconds === undefined) return 'N/A';
    const totalMinutes = Math.floor(seconds / 60);
    return `${totalMinutes} minutes online`;
  };

  const calculateAge = (birthDateString?: string): string | null => {
    if (!birthDateString) return null;
    try {
      const birthDate = new Date(birthDateString);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age > 0 ? `${age} years old` : null;
    } catch (e) {
      console.error("Error calculating age:", e);
      return null;
    }
  };
  
  const getDisplayGender = (gender?: string): string => {
    if (gender) {
      const lowerGender = gender.toLowerCase();
      if (lowerGender === 'f' || lowerGender === 'female') {
        return 'Female';
      }
      if (gender.length > 0) {
        return gender.charAt(0).toUpperCase() + gender.slice(1);
      }
    }
    return 'Female'; 
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-200px)] bg-slate-900"><LoadingSpinner /></div>;
  }

  if (error || !room) {
    return (
      <div className="text-center py-10 px-4 text-white bg-slate-900 min-h-screen">
        <h1 className="text-2xl font-semibold text-red-400 mb-4">Information</h1>
        <p className="text-gray-300 mb-6">{error || `Model data for "${username}" could not be loaded. The model might be offline or the username is incorrect.`}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-full transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const pageTitle = `${room.display_name || room.username} - Live Cam Show on CamHub`;
  const description = `Watch ${room.display_name || room.username} live on webcam. ${room.room_subject || 'Join their adult chat room now!'}`;
  const canonicalUrl = `${window.location.origin}/model/${room.username}`;
  const affiliateLink = getGenderSpecificLink(room.gender || '', true, room.username);
  const ageDisplay = calculateAge(room.birthday) || "22 years old"; 
  const modelDisplayName = room.display_name || room.username;
  const locationDisplay = room.location || "narnia"; 
  const onlineTimeDisplay = room.seconds_online !== undefined ? formatOnlineTime(room.seconds_online) : "162 minutes online";
  const displayGender = getDisplayGender(room.gender);
  const currentIframeSrc = isMobileView ? MOBILE_IFRAME_SRC : DESKTOP_IFRAME_SRC;

  const ActionButtons = () => (
    <div className="space-y-3">
      <a
        href={affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-all duration-150"
      >
        <Zap size={16} className="mr-2" /> Enter Chat Room
      </a>
      <a
        href={affiliateLink} 
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-all duration-150"
      >
        <Heart size={16} className="mr-2" /> Follow Model
      </a>
      <a
        href={affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-all duration-150"
      >
        <Tv2 size={16} className="mr-2" /> Join Full Livestream
      </a>
    </div>
  );

  const ModelProfileCardContent = (
    <div className="bg-slate-800 rounded-lg shadow-xl p-4 md:p-6">
      <div className="flex items-center mb-4">
        <Crown size={28} className="mr-3 text-pink-500 flex-shrink-0" />
        <div>
          <h1 className="text-2xl font-bold text-white leading-tight">{modelDisplayName}</h1>
          <p className="text-sm">
            <span className="text-pink-400">{displayGender}</span>
            <span className="text-gray-400"> • {ageDisplay}</span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-700 p-3 rounded-md text-center">
          <div className="flex items-center justify-center text-green-400 mb-1">
            <Eye size={16} className="mr-1.5" />
            <span className="text-lg font-semibold">{room.num_users?.toLocaleString() || 'N/A'}</span>
          </div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Viewers</p>
        </div>
        <div className="bg-slate-700 p-3 rounded-md text-center">
          <div className="flex items-center justify-center text-pink-400 mb-1">
            <Heart size={16} className="mr-1.5" />
            <span className="text-lg font-semibold">{room.num_followers?.toLocaleString() || 'N/A'}</span>
          </div>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Followers</p>
        </div>
      </div>
      <div className="space-y-2.5 text-sm text-gray-400">
        <div className="flex items-center">
          <MapPin size={16} className="mr-3 text-gray-500 flex-shrink-0" /> {locationDisplay}
        </div>
        <div className="flex items-center">
          <Clock size={16} className="mr-3 text-gray-500 flex-shrink-0" /> {onlineTimeDisplay}
        </div>
        <div className="flex items-center">
          <Languages size={16} className="mr-3 text-gray-500 flex-shrink-0" /> English
        </div>
      </div>
    </div>
  );

  const ModelSpecificsCardContent = (room.birthday || room.gender) ? (
    <div className="bg-slate-800 rounded-lg shadow-xl p-4 md:p-6">
      <h2 className="text-lg font-semibold text-white mb-3">Model Info</h2>
      <div className="space-y-1.5 text-sm">
        {room.birthday && (
          <div className="flex justify-between">
            <span className="text-gray-400">Birthday:</span>
            <span className="text-gray-200">{room.birthday}</span>
          </div>
        )}
        {room.gender && (
          <div className="flex justify-between">
            <span className="text-gray-400">Gender:</span>
            <span className="text-pink-400">{displayGender}</span>
          </div>
        )}
      </div>
    </div>
  ) : null;

  const AffiliateProgramCardContent = (
    <div className="bg-slate-800 rounded-lg shadow-xl p-4 md:p-6">
      <h2 className="text-lg font-semibold text-green-400 mb-2 flex items-center">
        <Gift size={18} className="mr-2" /> Affiliate Program
      </h2>
      <p className="text-sm text-gray-300">
        Earn 20% revenue share + $50 per broadcaster signup + 5% referred affiliate income through our premium affiliate program.
      </p>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="bg-slate-900 min-h-screen py-8 px-4 md:px-6">
        <div className="max-w-screen-xl mx-auto">
          <Link
            to="/"
            className="mb-6 inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 md:gap-8">
            {/* Left Column (Main Content on Mobile) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden">
                <div className="aspect-video bg-black flex items-center justify-center relative">
                  <iframe 
                    src={currentIframeSrc}
                    height="100%"
                    width="100%"
                    frameBorder="0" 
                    className="absolute top-0 left-0 w-full h-full"
                    scrolling="no"
                    allowFullScreen
                    title={`${modelDisplayName}'s live show`}
                  ></iframe>
                  <div className="absolute top-3 left-3 flex space-x-2 z-10">
                    <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-md shadow">Public Show</span>
                    {room.is_hd && <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-md shadow">HD</span>}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center z-10 shadow">
                    <Eye size={14} className="mr-1" /> {room.num_users?.toLocaleString() || 'N/A'} watching
                  </div>
                </div>
              </div>

              {/* Action Buttons for Mobile - Shown below video */}
              <div className="lg:hidden mt-6">
                <ActionButtons />
              </div>

              {room.room_subject && (
                <div className="bg-slate-800 rounded-lg shadow-xl p-4 md:p-6">
                  <h2 className="text-lg font-semibold text-white mb-2">Room Topic</h2>
                  <p className="text-gray-300">{room.room_subject}</p>
                </div>
              )}

              {/* Model Profile for Mobile */}
              <div className="lg:hidden">
                {ModelProfileCardContent}
              </div>

              {/* Model Specifics for Mobile */}
              {ModelSpecificsCardContent && (
                <div className="lg:hidden">
                  {ModelSpecificsCardContent}
                </div>
              )}
              
              {room.tags && room.tags.length > 0 && (
                <div className="bg-slate-800 rounded-lg shadow-xl p-4 md:p-6">
                  <h2 className="text-lg font-semibold text-white mb-3">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {room.tags.map(tag => (
                      <Link 
                        to={`/?tag=${encodeURIComponent(tag)}`} 
                        key={tag} 
                        className="bg-purple-700 hover:bg-purple-600 text-purple-200 px-2.5 py-1 rounded text-xs transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Affiliate Program for Mobile */}
              <div className="lg:hidden">
                {AffiliateProgramCardContent}
              </div>
            </div>

            {/* Right Sidebar (Desktop) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Model Profile for Desktop */}
              <div className="hidden lg:block">
                {ModelProfileCardContent}
              </div>
              
              {/* Action Buttons for Desktop - Shown in sidebar */}
              <div className="hidden lg:block">
                <ActionButtons />
              </div>

              {/* Model Specifics for Desktop */}
              {ModelSpecificsCardContent && (
                <div className="hidden lg:block">
                  {ModelSpecificsCardContent}
                </div>
              )}
              
              {/* Affiliate Program for Desktop */}
              <div className="hidden lg:block">
                {AffiliateProgramCardContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelPage;
