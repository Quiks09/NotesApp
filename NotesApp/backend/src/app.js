const express = require('express');
const cors = require('cors');
const app = express();
const noteRoutes = require('./routes/noteRoutes');
const tagRoutes = require('./routes/tagRoutes');

app.use(cors());
app.use(express.json());
app.use('/notes', noteRoutes);
app.use('/tags', tagRoutes);

module.exports = app;