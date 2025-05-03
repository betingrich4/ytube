import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoSuccess, likeVideoSuccess } from '../store/videoSlice';
import { getVideo, likeVideo } from '../services/api';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentVideo } = useSelector(state => state.video);
  const { isAuthenticated } = useSelector(state => state.auth);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const video = await getVideo(id);
        dispatch(fetchVideoSuccess(video));
        setIsLiked(video.isLiked || false);
      } catch (error) {
        console.error('Failed to load video:', error);
      }
    };
    
    loadVideo();
  }, [id, dispatch]);

  const handleLike = async () => {
    if (!isAuthenticated) return;
    
    try {
      const response = await likeVideo(id);
      dispatch(likeVideoSuccess(response));
      setIsLiked(response.isLiked);
    } catch (error) {
      console.error('Failed to like video:', error);
    }
  };

  if (!currentVideo) {
    return <div className="loading">Loading video...</div>;
  }

  return (
    <div className="video-player-container">
      <div className="video-wrapper">
        <ReactPlayer
          url={currentVideo.url}
          controls
          width="100%"
          height="100%"
          className="react-player"
        />
      </div>
      
      <div className="video-details">
        <h1 className="video-title">{currentVideo.title}</h1>
        
        <div className="video-actions">
          <div className="video-stats">
            <span>{currentVideo.views} views</span>
            <span>•</span>
            <span>{new Date(currentVideo.createdAt).toLocaleDateString()}</span>
          </div>
          
          <div className="action-buttons">
            <button 
              className={`like-button ${isLiked ? 'liked' : ''}`} 
              onClick={handleLike}
            >
              <span>{currentVideo.likes}</span> {isLiked ? 'Liked' : 'Like'}
            </button>
          </div>
        </div>
        
        <div className="channel-info">
          <img 
            src={currentVideo.channel?.avatar || '/default-avatar.jpg'} 
            alt={currentVideo.channel?.username}
            className="channel-avatar"
          />
          <div className="channel-details">
            <h3>{currentVideo.channel?.username}</h3>
            <p>{currentVideo.channel?.subscribers} subscribers</p>
            <p className="video-description">{currentVideo.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
