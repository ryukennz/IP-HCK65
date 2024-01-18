module.exports = function errorHandler(err, req, res, next) {
    // console.log(err, "<< cek");
    let statusCode = err.statusCode || 500
    let message = err.message || `Internal server error`

    switch (err.name) {
        case `SequelizeValidationError`:
        case `SequelizeUniqueConstraintError`:
            statusCode = 400
            message = err.errors[0].message
            break;
        case `BadRequest`:
            statusCode = 400
            message = `Email/Password is required`
            break;
        case `JsonWebTokenError`:
        case `InvalidToken`:
            statusCode = 401
            message = `Invalid token`
            break;
        case `Unauthorized`:
            statusCode = 401
            message = `Invalid email/password`
            break;
        case `NotFound`:
            statusCode = 404
            message = `Data not found`
            break;
        case `Forbidden`:
            statusCode = 403
            message = `You are not authorized`
            break;
        default:
    }
    
    res.status(statusCode).json({message})
}