const express = require('express');
const passport = require('passport');
const callbackRouter = express.Router();

callbackRouter.get('/',
    passport.authenticate('spotify', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('http://localhost:3000/');
    }
);

module.exports = callbackRouter;