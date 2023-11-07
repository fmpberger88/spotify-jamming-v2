const express = require('express');
const passport = require('passport');
const callbackRouter = express.Router();

callbackRouter.get('/',
    passport.authenticate('spotify', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('https://fmpberger-jammming.onrender.com');
    }
);

module.exports = callbackRouter;