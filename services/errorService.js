class ErrorService {
    getErrorMessages(error) {
        return Object.keys(error.errors).reduce((acc, key) => {
            if ("message" in error.errors[key]) {
                acc[key] = error.errors[key].message
            } else {
                console.error(error.errors[key])
            }
            return acc
        }, {})
    }
}

class HTTPError extends Error {
    constructor(statusCode, data, message = `HTTP Error ${statusCode}`) {
        super(message)
        this.data = data
        this.statusCode = statusCode
    }
}

const errorService = new ErrorService()

module.exports = {
    errorService,
    ErrorService,
    HTTPError
}