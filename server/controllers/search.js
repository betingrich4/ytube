const ytsr = require('ytsr');
const Video = require('../models/Video');

exports.searchYouTube = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Please provide a search query' });

    const filters = await ytsr.getFilters(query);
    const filter = filters.get('Type').get('Video');
    const searchResults = await ytsr(filter.url, { limit: 10 });

    if (!searchResults.items.length) {
      return res.status(404).json({ error: 'No results found' });
    }

    const videos = searchResults.items.map(video => ({
      title: video.title,
      thumbnail: video.bestThumbnail.url,
      duration: video.duration,
      channel: video.author.name,
      views: video.views,
      url: video.url
    }));

    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchLocal = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Please provide a search query' });

    const videos = await Video.find({ 
      $text: { $search: query } 
    })
    .populate('channel', 'username avatar')
    .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
