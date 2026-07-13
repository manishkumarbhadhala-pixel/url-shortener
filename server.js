require('dotenv').config();
const express = require('express');
const pool = require('./config/db');

const app = express();


app.use(express.json());

//test route
app.get('/', (req, res) => {
  res.send('URL Shortener API is running...');
});

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ message: 'DB connected successfully', result: rows[0].result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'DB connection failed', error: error.message });
  }
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});