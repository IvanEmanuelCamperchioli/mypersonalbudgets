const express = require("express");
const routes = require('./routes/index');
const cors = require('cors');

const app = express();

// run environment variables
require('dotenv').config();

// connect to database
require('./config/db');

// middleware
app.use(cors());
app.use(express.json());

// routes 
app.use('/api', routes);

const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => console.log(`app listening on port ${port}`));