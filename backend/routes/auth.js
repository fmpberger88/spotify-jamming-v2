const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

// Spotify Authentication - Login
authRouter.get('/',
    passport.authenticate('spotify', {
        scope: ['user-read-email', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private'],
        showDialog: true
    })
);

authRouter.get('/callback',
    passport.authenticate('spotify', { failureRedirect: '/login' }),
    (req, res) => {
        // Set a secure, httpOnly cookie to indicate logged-in status
        res.cookie('loggedIn', 'true', {
            httpOnly: true,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https', // Ensure cookies are sent over HTTPS
            sameSite: 'Strict', // Protect against CSRF
            maxAge: 7200000 // 2 hours in milliseconds
        });
        res.redirect('/'); // Redirect to the home page after successful login
    }
);

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
