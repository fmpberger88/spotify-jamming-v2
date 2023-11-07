const SpotifyStrategy = require('passport-spotify').Strategy;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    passport.use(
        new SpotifyStrategy(
            {
                clientID: process.env.SPOTIFY_CLIENT_ID,
                clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
                callbackURL: `https://fmpberger-jammming.onrender.com/callback`
        },
            (accessToken, refreshToken, expires_in, profile, done) => {
                profile.accessToken = accessToken;
                profile.refreshToken = refreshToken;
                profile.expiresIn = Date.now() + (expires_in * 1000);
                return done(null, profile);
        }
    ));
};
