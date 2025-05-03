import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { uploadVideo } from '../services/api';
import './Upload.css';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [duration, setDuration] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const videoData = {
        title,
        description,
        url,
        thumbnail,
        duration,
        tags: tags.split(',').map(tag => tag.trim())
      };

      await uploadVideo(videoData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to upload video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <h1>Upload Video</h1>
      
      <form onSubmit={handleSubmit} className="upload-form">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Video URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Thumbnail URL</label>
          <input
            type="url"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Duration (e.g. 10:30)</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default Upload;
