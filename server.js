const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const authRoutes = require('./server/routes/router')
const Userdb = require('./server/database/connection');
const cookieParser = require('cookie-parser');
const auth = require('./server/middleware/authMiddleware');
const checkUser = require('./server/middleware/authMiddleware');

app.use(express.json());
app.use(cookieParser());
app.set({ "views": "ejs" });
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
app.use('/images', express.static(path.resolve(__dirname, 'assets/images')));
app.set('view engine', 'ejs');
PORT = 3000;

// ROUTES
app.get('*', checkUser);
app.get('/', (req, res) => {
    res.render('home.ejs');
})
app.get('/smoothies', auth, (req, res) => { res.render('smoothies.ejs'); });
app.use(authRoutes);

// DB
Userdb();
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})

