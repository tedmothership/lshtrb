import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import CamGrid from '../components/CamGrid';
import Pagination from '../components/Pagination';
import { useAppContext } from '../contexts/AppContext';
import { ChevronDown, Tag, Search as SearchIcon } from 'lucide-react';
import { getGenderSpecificLink } from '../utils/affiliateLinks';

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
    fetchRooms // Added fetchRooms here
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

    // Sync tag from URL to context filters
    if (tagFromUrl !== currentTagFromContextFilters) {
      setContextFilters(prevFilters => ({
        ...prevFilters,
        tags: tagFromUrl ? [tagFromUrl] : [],
        searchQuery: '' // Clear search query when tag changes
      }));
      filtersChangedInThisEffect = true;
      newPage = 1; // Reset to page 1 on tag change
    }

    // Sync search query from URL to context filters
    if (searchQueryFromUrl !== currentSearchQueryFromContext) {
      setContextFilters(prevFilters => ({
        ...prevFilters,
        searchQuery: searchQueryFromUrl || '',
        tags: searchQueryFromUrl ? [] : prevFilters.tags // Clear tags if search query is active
      }));
      filtersChangedInThisEffect = true;
      newPage = 1; // Reset to page 1 on search query change
    }
    
    // If filters changed, ensure context page is set to 1 (or newPage which is 1)
    if (filtersChangedInThisEffect) {
      if (contextCurrentPage !== newPage) {
        setContextCurrentPage(newPage);
      }
    } else { // If filters didn't change, sync page from URL to context
      if (pageFromUrl !== contextCurrentPage) {
        setContextCurrentPage(pageFromUrl);
      }
    }
    // Note: If line 61 in your file is a manual call to fetchRooms(), 
    // ensure it's done correctly, e.g., fetchRooms(newPage, newFilters, signal).
    // However, AppContext should handle fetching reactively when currentPage or filters change.
    // A direct call here might be redundant. The error `fetchRooms is not a function`
    // occurs if `fetchRooms` is not destructured from useAppContext() (as fixed above)
    // and then attempted to be called.

  }, [
      pageFromUrl, tagFromUrl, searchQueryFromUrl, 
      currentTagFromContextFilters, currentSearchQueryFromContext, 
      contextCurrentPage, setContextFilters, setContextCurrentPage,
      // If you are calling fetchRooms directly within this useEffect, 
      // it should also be added as a dependency:
      // fetchRooms 
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
  let headerTitle = "Live Adult Webcams";
  let subHeaderText = "Explore thousands of live performers. Interact, chat, and enjoy the show!";
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
  
  const canonicalUrl = `${window.location.origin}${location.pathname}${location.search}`;

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
              href={getGenderSpecificLink('', true)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-full text-sm sm:text-base transition-colors"
            >
              Start Watching Now
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
