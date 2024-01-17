module.exports = function errorHandler(err, req, res, next) {
    let statusCode = err.statusCode || 500
    let message = err.message || `Internal server error`

    switch (err.name) {
            case `InvalidToken`:
                statusCode = 401
                message = `Invalid Token`
            break;
        default:
    }
    
    res.status(statusCode).json({message})
}