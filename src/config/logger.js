const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console()
    ]
});

function logRequest(req, res, next) {
    if (req)
        logger.info(`Received ${req.method} request at ${req.url}`);
    next();
}


function setupLogger(app) {
    app.use(logRequest);
}

module.exports = {setupLogger, logger}