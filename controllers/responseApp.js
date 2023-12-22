module.exports = (app) => {
    app.response.show = function (message, statusCode, data = {}) {
        const isJson = this.req?.headers["content-type"]?.toLowerCase() === "application/json";

        return this.contentType(isJson ? "application/json" : "text/html")
            .status(statusCode)
            [isJson ? 'json' : 'send']({data, message, success: statusCode >= 200 && statusCode <= 299})
        // TODO: send->render template
    }
}