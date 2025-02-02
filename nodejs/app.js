require('dotenv').config();

const express = require('express');
const mongodb = require('./config/db')
const app = express();
const PORT = 3000;

app.use(express.json());

mongodb();

const usersRouters = require('./routes/usersRoutes');
app.use('/api/users', usersRouters);

const aboutRouters = require('./routes/aboutRoutes')
app.use('/api/profile', aboutRouters)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
