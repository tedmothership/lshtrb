import React from 'react';
import { X, Filter } from 'lucide-react';
import { FilterState } from '../types';
import { getGenderSpecificLink, getRegionLink } from '../utils/affiliateLinks';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange 
}) => {
  const genderOptions = [
    { value: 'f', label: 'Female', color: 'pink' },
    { value: 'm', label: 'Male', color: 'blue' },
    { value: 't', label: 'Trans', color: 'purple' },
    { value: 'c', label: 'Couple', color: 'orange' }
  ];

  const regionOptions = [
    { value: 'northamerica', label: 'North America' },
    { value: 'europe_russia', label: 'Europe & Russia' },
    { value: 'asia', label: 'Asia' },
    { value: 'southamerica', label: 'South America' },
    { value: 'other', label: 'Other' }
  ];

  const popularTags = [
    'bigass', 'bigboobs', 'anal', 'squirt', 'milf', 'teen', 'mature', 'bdsm',
    'latina', 'asian', 'ebony', 'blonde', 'brunette', 'redhead', 'skinny', 'bbw'
  ];

  const handleGenderToggle = (gender: string) => {
    const newGenders = filters.gender.includes(gender)
      ? filters.gender.filter(g => g !== gender)
      : [...filters.gender, gender];
    
    onFilterChange({ ...filters, gender: newGenders });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    onFilterChange({ ...filters, tags: newTags });
  };

  const handleRegionToggle = (region: string) => {
    const newRegions = filters.region.includes(region)
      ? filters.region.filter(r => r !== region)
      : [...filters.region, region];
    
    onFilterChange({ ...filters, region: newRegions });
  };

  const clearAllFilters = () => {
    onFilterChange({
      gender: [],
      tags: [],
      region: [],
      hd: null,
      search: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-purple-500" />
              <h2 className="text-lg font-semibold text-white">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Gender Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Gender</h3>
              <div className="grid grid-cols-2 gap-2">
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleGenderToggle(option.value)}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      filters.gender.includes(option.value)
                        ? `bg-${option.color}-500/20 border-${option.color}-500 text-${option.color}-400`
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              {/* Quick Links to Gender Pages */}
              <div className="mt-3 text-xs text-gray-400">
                <p className="mb-2">Quick access:</p>
                <div className="flex flex-wrap gap-1">
                  {genderOptions.map((option) => (
                    <a
                      key={`link-${option.value}`}
                      href={getGenderSpecificLink(option.value, false)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-2 py-1 rounded text-xs border border-${option.color}-500/30 
                               text-${option.color}-400 hover:bg-${option.color}-500/10 transition-colors`}
                    >
                      {option.label} Page
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* HD Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Quality</h3>
              <button
                onClick={() => onFilterChange({ ...filters, hd: filters.hd ? null : true })}
                className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                  filters.hd
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                }`}
              >
                HD Only
              </button>
            </div>

            {/* Region Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Region</h3>
              <div className="space-y-2">
                {regionOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleRegionToggle(option.value)}
                    className={`w-full p-2 rounded-lg border text-left transition-all duration-200 ${
                      filters.region.includes(option.value)
                        ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              {/* Quick Links to Region Pages */}
              <div className="mt-3 text-xs text-gray-400">
                <p className="mb-2">Browse by region:</p>
                <div className="flex flex-wrap gap-1">
                  {regionOptions.map((option) => (
                    <a
                      key={`region-link-${option.value}`}
                      href={getRegionLink(option.value)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 rounded text-xs border border-purple-500/30 
                               text-purple-400 hover:bg-purple-500/10 transition-colors"
                    >
                      {option.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 ${
                      filters.tags.includes(tag)
                        ? 'bg-pink-500/20 border-pink-500 text-pink-400'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={clearAllFilters}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg 
                       transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
