const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');

router.get('/youtube', searchController.searchYouTube);
router.get('/local', searchController.searchLocal);

module.exports = router;
