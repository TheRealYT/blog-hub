module.exports = (app) => {
    app.response.show = function (data, statusCode) {
        if (this.req?.headers["content-type"]?.toLowerCase() === "application/json") {
            return this.contentType("application/json")
                .status(statusCode)
                .json({data, success: statusCode >= 200 && statusCode <= 299})
        } else {
            return this.contentType("text/html")
                .status(statusCode)
                .send(data) // TODO: render template
        }
    }
}