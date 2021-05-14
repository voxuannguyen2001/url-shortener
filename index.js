const express = require('express');

const app = express();

const connectDB = require('./config/db');

//Connect to Database
connectDB();

app.use(express.json({extended: false}));

app.use('/', express.static(__dirname + '/static'));

//Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = 5000;

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});