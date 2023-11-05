// middleware/errorHandler.js
module.exports.errorHandler = function(err, req, res) {
    console.error(`Error: ${err}`);
    res.status(500).send('Internal Server Error');
};