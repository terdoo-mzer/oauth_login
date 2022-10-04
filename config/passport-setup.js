
const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const  keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })
});

passport.use(
    new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSECRET,
    callbackURL: "/auth/google/redirect"
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id}).then((currentUser) => {
      if(currentUser) {
        // Does this user exist already? if yes, Then don't add to db
        console.log(`user is: ${currentUser}`);
        done(null, currentUser);
      } else {
        // Run here and add the user to db
        new User({
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.picture
        }).save().then((newUser) => {
          console.log(`new user created: ${newUser}`); 
          done(null, newUser);
        })
      }
    })
    console.log(profile);
  
  }
));