const { restart } = require("nodemon")

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    restart.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}