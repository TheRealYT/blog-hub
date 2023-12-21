module.exports = (app) => {
    app.response.show = function (message, statusCode, data = {}) {
        if (this.req?.headers["content-type"]?.toLowerCase() === "application/json") {
            return this.contentType("application/json")
                .status(statusCode)
                .json({data, message, success: statusCode >= 200 && statusCode <= 299})
        } else {
            return this.contentType("text/html")
                .status(statusCode)
                .send({data, message}) // TODO: render template
        }
    }
}