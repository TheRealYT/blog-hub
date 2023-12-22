const {HTTPError, errorService} = require("../services/errorService");

function handleError(error, req, res, next)  {
    if (error instanceof HTTPError) {
        res.show(error.message, error.statusCode, {error: error.data})
        return
    } else if (error?.name === "TokenExpiredError") {
        res.show("Session expired", 403, {})
        return
    }
    next(error)
}

function safeExecute(middleWare) {
    return async (req, res, next) => {
        try {
            await middleWare(req, res, next)
        } catch (e) {
            if (e.name === "ValidationError") {
                next(new HTTPError(400, errorService.getErrorMessages(e), "Invalid input"))
                return
            }
            next(e)
        }
    }
}

module.exports = {safeExecute, handleError};