
// Middleware für die Aktualisierung des Zugriffstokens
async function refreshAccessTokenIfNeeded(req, res, next) {
    if (req.isAuthenticated() && req.user) {
        const { accessToken, refreshToken, expiresIn } = req.user;

        if (Date.now() > expiresIn) {
            try {
                const response = await axios.post('https://accounts.spotify.com/api/token', null, {
                    params: {
                        grant_type: 'refresh_token',
                        refresh_token: refreshToken
                    },
                    headers: {
                        'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')
                    }
                });

                const { access_token, expires_in } = response.data;

                req.user.accessToken = access_token;
                req.user.expiresIn = Date.now() + (expires_in * 1000);

                console.log('Token refreshed');
            } catch (error) {
                console.error('Error refreshing token:', error);
                return res.status(401).json({ message: 'Unauthorized - Could not refresh token' });
            }
        }
    }
    await next();
}

module.exports = refreshAccessTokenIfNeeded;