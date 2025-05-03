const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videos');
const auth = require('../middleware/auth');

router.get('/', videoController.getVideos);
router.get('/:id', videoController.getVideo);
router.post('/', auth, videoController.uploadVideo);
router.post('/:id/like', auth, videoController.likeVideo);

module.exports = router;
