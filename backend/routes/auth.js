const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

// Spotify Authentication - Login
authRouter.get('/', (req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    passport.authenticate('spotify', {
        scope: ['user-read-email', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private'],
        showDialog: true
    })(req, res, next);
});


//authRouter.get('/callback',
//    passport.authenticate('spotify', { failureRedirect: '/' }),
//    (req, res) => {
        // No need to set a 'loggedIn' cookie since the session will have the login state
//        res.redirect('/'); // Redirect to the home page after successful login
//    }
//);


// Logout route
authRouter.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }

        res.clearCookie('loggedIn');
        req.session.destroy((err) => {
            if (err) { return next(err); }

            res.redirect('/'); // Redirect to home page after logout
        });
    });
});

module.exports = authRouter;
