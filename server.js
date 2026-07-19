require('dotenv').config();
const express = require('express');
const pool = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');

const app = express();


app.use(express.json());
app.use(express.static('public'));

//test route
app.get('/', (req, res) => {
  res.send('URL Shortener API is running...');
});



app.use('/',urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});