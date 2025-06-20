// V5_FINAL_ATTEMPT_CHECK_LITERAL_AMPERSANDS
import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import CamGrid from '../components/CamGrid';
import Pagination from '../components/Pagination';
import { useAppContext } from '../contexts/AppContext';
import { ChevronDown, Tag, Search as SearchIcon } from 'lucide-react';
// import { getGenderSpecificLink } from '../utils/affiliateLinks'; // No longer needed here

const POPULAR_TAGS = [
  "asmr", "bigboobs", "squirt", "lovense", "anal", "teen", "milf", "asian", "ebony", "latina", 
  "blonde", "brunette", "redhead", "feet", "toys", "couple", "group", "trans", "male", "female"
];

const HomePage: React.FC = () => {
  const { 
    rooms, 
    loading, 
    error, 
    totalPages, 
    filters: contextFilters,
    setFilters: setContextFilters,
    setCurrentPage: setContextCurrentPage,
    currentPage: contextCurrentPage,
    fetchRooms
  } = useAppContext();
  
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const pageFromUrl = parseInt(queryParams.get('page') || '1', 10);
  const tagFromUrl = queryParams.get('tag') || null;
  const searchQueryFromUrl = queryParams.get('search_query') || null;

  const currentTagFromContextFilters = useMemo(() => contextFilters.tags[0] || null, [contextFilters.tags]);
  const currentSearchQueryFromContext = useMemo(() => contextFilters.searchQuery || null, [contextFilters.searchQuery]);

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  useEffect(() => {
    let filtersChangedInThisEffect = false;
    let newPage = pageFromUrl;

    if (tagFromUrl !== currentTagFromContextFilters) {
      setContextFilters(prevFilters => ({
        ...prevFilters,
        tags: tagFromUrl ? [tagFromUrl] : [],
        searchQuery: '' 
      }));
      filtersChangedInThisEffect = true;
      newPage = 1; 
    }

    if (searchQueryFromUrl !== currentSearchQueryFromContext) {
      setContextFilters(prevFilters => ({
        ...prevFilters,
        searchQuery: searchQueryFromUrl || '',
        tags: searchQueryFromUrl ? [] : prevFilters.tags 
      }));
      filtersChangedInThisEffect = true;
      newPage = 1; 
    }
    
    if (filtersChangedInThisEffect) {
      if (contextCurrentPage !== newPage) {
        setContextCurrentPage(newPage);
      }
    } else { 
      if (pageFromUrl !== contextCurrentPage) {
        setContextCurrentPage(pageFromUrl);
      }
    }
  }, [
      pageFromUrl, tagFromUrl, searchQueryFromUrl, 
      currentTagFromContextFilters, currentSearchQueryFromContext, 
      contextCurrentPage, setContextFilters, setContextCurrentPage,
      fetchRooms 
    ]);


  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    if (tagFromUrl) params.set('tag', tagFromUrl);
    if (searchQueryFromUrl) params.set('search_query', searchQueryFromUrl);
    
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleTagClick = (tag: string | null) => {
    const params = new URLSearchParams(); 
    if (tag) {
      params.set('tag', tag);
    }
    params.set('page', '1'); 
    navigate(`${location.pathname}?${params.toString()}`);
    setIsCategoriesOpen(false);
  };
  
  const siteName = "CamHub - Live Webcam Shows & Adult Chat";
  let pageTitle = siteName;
  let description = "Discover thousands of live webcam models on CamHub. Your top spot for adult entertainment, featuring a wide variety of performers and interactive shows.";
  let headerTitle = "The #1 Hub for Lovense Lush Cams"; 
  let subHeaderText = "Explore hundreds of performers using Lovense Lush toys and take control of their pleasure in real-time. Your tips directly control the vibrations. Start your truly interactive cam show now.";
  let categoryDisplayTitle = "Popular Categories";

  if (currentSearchQueryFromContext) {
    pageTitle = `Search results for "${currentSearchQueryFromContext}" - CamHub`;
    description = `Find live webcam performers matching "${currentSearchQueryFromContext}" on CamHub.`;
    headerTitle = `Search Results for: "${currentSearchQueryFromContext}"`;
    subHeaderText = `Showing performers matching your search.`; 
    categoryDisplayTitle = `Search: "${currentSearchQueryFromContext}"`;
  } else if (currentTagFromContextFilters) {
    const capitalizedTag = currentTagFromContextFilters.charAt(0).toUpperCase() + currentTagFromContextFilters.slice(1);
    pageTitle = `Live ${capitalizedTag} Webcam Shows - CamHub`;
    description = `Watch live ${currentTagFromContextFilters} cams on CamHub. Interact with ${currentTagFromContextFilters} performers in real-time adult chat rooms.`;
    headerTitle = `Live ${capitalizedTag} Cams`;
    subHeaderText = `Explore live ${currentTagFromContextFilters} performers.`; 
    categoryDisplayTitle = `Category: ${capitalizedTag}`;
  }
  
  if (!currentSearchQueryFromContext && !currentTagFromContextFilters) {
    subHeaderText = "Explore hundreds of performers using Lovense Lush toys and take control of their pleasure in real-time. Your tips directly control the vibrations. Start your truly interactive cam show now.";
  }


  const canonicalUrl = `${window.location.origin}${location.pathname}${location.search}`;
  const takeControlNowLink = "https://diva.services/smartlink/?a=382&c=4&p=130101,130487,132016&fallback=aHR0cHM6Ly9jaGF0dXJiYXRlLmNvbS9pbi8/dG91cj0zTWM5JmNhbXBhaWduPU9uRnZBJnRyYWNrPWRlZmF1bHQmcmVkaXJlY3RfdG9fcm9vbT0td2VsY29tZXBhZ2Ut";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${window.location.origin}/logo.png`} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${window.location.origin}/logo.png`} />
      </Helmet>

      <div className="bg-gray-800 pt-6 pb-3 sm:pt-8 sm:pb-4">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-500 mb-1 sm:mb-2">
            {headerTitle}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 max-w-2xl mx-auto">
            {subHeaderText}
          </p>
          {!currentSearchQueryFromContext && (
            <a
              href={takeControlNowLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-full text-sm sm:text-base transition-colors"
            >
              Take Control Now
            </a>
          )}
        </div>
      </div>
      
      <div className="sticky top-16 z-40 bg-gray-800/90 backdrop-blur-sm shadow-md">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white flex items-center">
              {currentSearchQueryFromContext && <SearchIcon size={20} className="mr-2 text-pink-400" />}
              {categoryDisplayTitle}
            </h2>
            <button 
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex items-center text-pink-400 hover:text-pink-300 transition-colors"
              aria-expanded={isCategoriesOpen}
              aria-controls="categories-panel"
            >
              <Tag size={18} className="mr-1.5" />
              <span>{isCategoriesOpen ? "Close Tags" : "Browse Tags"}</span>
              <ChevronDown size={20} className={`ml-1 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {isCategoriesOpen && (
            <div id="categories-panel" className="mt-3 pt-3 border-t border-gray-700">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleTagClick(null)}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors
                    ${!currentTagFromContextFilters && !currentSearchQueryFromContext ? 'bg-pink-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                >
                  All Performers
                </button>
                {POPULAR_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors
                      ${currentTagFromContextFilters === tag && !currentSearchQueryFromContext ? 'bg-pink-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
                  >
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto px-0 sm:px-0 lg:px-0">
        <CamGrid rooms={rooms} loading={loading} error={error} />
      </div>

      {!loading && totalPages > 1 && rooms.length > 0 && (
        <div className="py-8">
          <Pagination
            currentPage={contextCurrentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default HomePage;
