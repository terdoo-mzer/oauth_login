const express = require("express");
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport')

const app = express();

const port = 3000;

// Setup view engine
app.set("view engine", "ejs");

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // A day set in milliseconds
    keys: [keys.session.cookieKey]
}))

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('Connected to mongodb');
})

// Set up 
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  
    res.render("home", {user: req.user});
    
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

/*
authdemo
authdemo1992
*/