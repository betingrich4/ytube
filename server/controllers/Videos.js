const Video = require('../models/Video');
const User = require('../models/User');

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('channel', 'username avatar');
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('channel', 'username avatar subscribers')
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'username avatar' }
      });
      
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    
    // Increment view count
    video.views += 1;
    await video.save();
    
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, url, thumbnail, duration, tags } = req.body;
    
    const video = new Video({
      title,
      description,
      url,
      thumbnail,
      duration,
      tags,
      channel: req.user.id
    });
    
    await video.save();
    
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    
    const user = await User.findById(req.user.id);
    
    // Check if user already liked the video
    const alreadyLiked = user.likedVideos.includes(video._id);
    
    if (alreadyLiked) {
      // Unlike the video
      video.likes -= 1;
      user.likedVideos = user.likedVideos.filter(id => id.toString() !== video._id.toString());
    } else {
      // Like the video
      video.likes += 1;
      user.likedVideos.push(video._id);
    }
    
    await video.save();
    await user.save();
    
    res.json({ likes: video.likes, isLiked: !alreadyLiked });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
