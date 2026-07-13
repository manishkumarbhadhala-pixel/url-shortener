require('dotenv').config();
const express = require('express');

const app = express();


app.use(express.json());

//test route
app.get('/', (req, res) => {
  res.send('URL Shortener API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});