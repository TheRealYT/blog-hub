function formatError(error, objKey = undefined, check = false) {
    if (error != null && typeof error == "object") {
        if (!objKey) objKey = "message"
        if (objKey && objKey in error) {
            return check ? true : error[objKey]
        }
    } else if (typeof error == "string") {
        return check ? true : error
    }

    return check ? false : ""
}