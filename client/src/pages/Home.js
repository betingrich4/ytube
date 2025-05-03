import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideosSuccess, fetchVideosFailure } from '../store/videoSlice';
import { getVideos } from '../services/api';
import VideoCard from '../components/VideoCard';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector(state => state.video);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videos = await getVideos();
        dispatch(fetchVideosSuccess(videos));
      } catch (error) {
        dispatch(fetchVideosFailure(error.message));
      }
    };
    
    loadVideos();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="videos-grid">
        {videos.map(video => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
