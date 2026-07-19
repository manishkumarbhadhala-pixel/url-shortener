const express = require('express');
const router = express.Router();
const { shortenUrl,redirectUrl } = require('../controllers/urlController');

// POST /api/shorten
router.post('/api/shorten', shortenUrl);

router.get('/:short_code',redirectUrl);

module.exports = router;