const jwt = require('jsonwebtoken');

export function generateJWT(user) {
    const payload = {
        id: user.id,  // Benutzer-ID vom Datenbankrecord
        username: user.username  // Benutzername oder andere Daten
    };

    const secret = 'yourSecretKey';  // Ein geheimer Schlüssel, nur dem Server bekannt
    const options = {
        expiresIn: '1d'  // Gültigkeitsdauer des Tokens, hier 1 Tag
    };

    return jwt.sign(payload, secret, options);
}
