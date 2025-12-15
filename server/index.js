const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const BASE_URL = process.env.BASE_URL;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.get('/', (req, res) => {
  res.send('<h1>Hello from Mern Stack Backend</h1>');
});

if (!DB_URL) {
  console.log('DB_URL is missing. Please set it in the .env file.');
} else {
    mongoose.connect(DB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
