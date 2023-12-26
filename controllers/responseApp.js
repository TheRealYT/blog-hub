const {renderService} = require("../services/renderService");
module.exports = (app) => {
    app.response.show = async function (message, statusCode, data = {}) {
        const isJson = this.req?.headers["content-type"]?.toLowerCase() === "application/json";
        const arg = {data, message, success: statusCode >= 200 && statusCode <= 299};

        if (isJson) {
            return this.contentType("application/json").status(statusCode).json(arg)
        }

        arg.title = "BlogHub - Error"
        return this.status(statusCode).render("error", await renderService.add(this.req, arg))
    }
}