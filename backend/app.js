const express = require("express");
const routes = require('./routes/index');
const cors = require('cors');
const path = require('path');

// Run environment variables
require('dotenv').config();

// Connect to database
require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes 
app.use('/api', routes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'))
    })
}

const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => console.log(`app listening on port ${port}`));