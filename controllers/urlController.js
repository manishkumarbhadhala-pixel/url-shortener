const { nanoid } = require('nanoid');
const pool = require('../config/db');

// POST /api/shorten - long URL le kar short code generate karega
const shortenUrl = async (req, res) => {
  try {
    const { original_url } = req.body;

    // Validation - URL diya hai ya nahi
    if (!original_url) {
      return res.status(400).json({ error: 'original_url is required' });
    }

    // Simple URL format check
    try {
      new URL(original_url);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Check karo agar ye URL pehle se already shorten ho chuka hai
    const [existing] = await pool.query(
      'SELECT * FROM urls WHERE original_url = ?',
      [original_url]
    );

    if (existing.length > 0) {
      return res.status(200).json({
        message: 'URL already shortened',
        short_url: `${req.protocol}://${req.get('host')}/${existing[0].short_code}`,
        original_url: existing[0].original_url
      });
    }

    // 6-character unique short code generate karo
    const short_code = nanoid(6);

    // Database me insert karo
    await pool.query(
      'INSERT INTO urls (original_url, short_code) VALUES (?, ?)',
      [original_url, short_code]
    );

    res.status(201).json({
      message: 'URL shortened successfully',
      short_url: `${req.protocol}://${req.get('host')}/${short_code}`,
      original_url
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
};

module.exports = { shortenUrl };