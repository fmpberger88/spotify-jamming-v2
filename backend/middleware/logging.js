const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');

// Configure Winston
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' })
    ]
});

// If we're not in production then log to the `console`
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple()
    }));
}

// Configure Morgan to use Winston
morgan.token('id', function getId(req) {
    return req.id;
});

const morganFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

// Use Morgan and Winston
module.exports.logging = morgan(morganFormat, {
    skip: function (req, res) {
        return res.statusCode < 400;
    },
    stream: {
        write: function(message, encoding) {
            logger.error(message);
        }
    }
});

module.exports.logger = logger;
