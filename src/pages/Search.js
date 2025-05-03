import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchVideosSuccess, searchVideosFailure } from '../store/videoSlice';
import { searchYouTube, searchLocal } from '../services/api';
import VideoCard from '../components/VideoCard';
import './Search.css';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchResults } = useSelector(state => state.video);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('local');

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [location.search]);

  const performSearch = async (query) => {
    try {
      let results;
      if (searchType === 'youtube') {
        results = await searchYouTube(query);
      } else {
        results = await searchLocal(query);
      }
      dispatch(searchVideosSuccess(results));
    } catch (error) {
      dispatch(searchVideosFailure(error.message));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        
        <div className="search-type">
          <button 
            className={searchType === 'local' ? 'active' : ''}
            onClick={() => setSearchType('local')}
          >
            Our Videos
          </button>
          <button 
            className={searchType === 'youtube' ? 'active' : ''}
            onClick={() => setSearchType('youtube')}
          >
            YouTube
          </button>
        </div>
      </div>
      
      <div className="search-results">
        {searchResults.length > 0 ? (
          <div className="videos-grid">
            {searchResults.map((video, index) => (
              <VideoCard key={index} video={video} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            No videos found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
