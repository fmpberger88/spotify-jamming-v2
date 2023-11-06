const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

// Debugging-Meldung hinzufügen
authRouter.use((req, res, next) => {
    console.log(`[DEBUG] Auth Router Accessed: ${new Date().toISOString()}`);
    next();
});

// Spotify Authentifizierung
// Login
authRouter.get('/', (req, res, next) => {
    console.log("[DEBUG] Attempting Spotify Authentication");

    // Weitere Debugging-Meldung oder Kontrollstrukturen können hier hinzugefügt werden.
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieSecure = isProduction && process.env.COOKIE_SECURE === 'true';
    const cookieSameSite = process.env.COOKIE_SAMESITE || 'Lax'; // Default 'Lax' falls nicht definiert

    passport.authenticate('spotify', {
        scope: ['user-read-email', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private'],
        showDialog: true
    }, (err, user, info) => {  // Callback-Funktion hinzugefügt
        if (err) return next(err);
        if (!user) return res.redirect('/login');

        req.login(user, (err) => {
            if (err) return next(err);

            // Cookie setzen
            res.cookie('loggedIn', 'true', {
                httpOnly: true,
                secure: cookieSecure, // Verwende dies nur, wenn deine Website HTTPS verwendet
                //SameSite: cookieSameSite,
                maxAge: 7200000 // 2 Stunden in Millisekunden
            });

            return res.redirect('/');
        });
    })(req, res, next);
});

authRouter.get('/logout', (req, res) => {
    // Logout the user using the logout method provided by the authentication middleware (like passport)
    req.logout((err) => {
        if (err) {
            // If there's an error logging out, log it for debugging purposes
            console.error('Error during the logout process:', err);
            return next(err);
        }

        // If 'loggedIn' cookie is being used, clear it after successful logout
        res.clearCookie('loggedIn');

        // Destroy the session only after the logout is successful
        req.session.destroy((err) => {
            if (err) {
                // Log error for debugging purposes
                console.error('Error destroying the session:', err);
                return next(err);
            }

            // Ensure that the client-side does not cache the response to this request
            res.set('Cache-Control', 'no-store');

            // Inform the client that the logout has been successful
            // Alternatively, you can redirect to the login page or send a JSON response if it's an API
            res.redirect('/');
        });
    });
});






module.exports = authRouter;
