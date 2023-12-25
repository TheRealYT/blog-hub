function formatError(error, objKey = undefined, check = false) {
    if (error != null && "error" in error) {
        const errorContent = error.error

        if (objKey && objKey in errorContent) {
            return check ? true : errorContent[objKey]
        }
    }

    return check ? false : ""
}