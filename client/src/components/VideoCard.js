import React from 'react';
import { Link } from 'react-router-dom';
import { formatViews } from '../utils/helpers';
import './VideoCard.css';

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <Link to={`/video/${video._id || video.id}`}>
        <div className="thumbnail-container">
          <img src={video.thumbnail} alt={video.title} className="thumbnail" />
          <span className="duration">{video.duration}</span>
        </div>
      </Link>
      
      <div className="video-info">
        <Link to={`/channel/${video.channel?._id || video.channel}`} className="channel-avatar">
          <img src={video.channel?.avatar || '/default-avatar.jpg'} alt={video.channel?.username} />
        </Link>
        
        <div className="video-details">
          <Link to={`/video/${video._id || video.id}`} className="video-title">
            {video.title}
          </Link>
          <Link to={`/channel/${video.channel?._id || video.channel}`} className="channel-name">
            {video.channel?.username || video.channel}
          </Link>
          <div className="video-stats">
            <span>{formatViews(video.views)} views</span>
            <span>•</span>
            <span>{new Date(video.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
