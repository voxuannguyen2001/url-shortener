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


app.listen(process.env.PORT || 5000, () => {console.log(`Server running on port ${PORT}`)});