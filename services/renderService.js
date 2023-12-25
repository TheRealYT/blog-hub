const {loadCredentials} = require("../controllers/sessionController");

class RenderService {
    async add(req, data) {
        if (await loadCredentials(req)) data.userId = req.user.id
        return data
    }
}

const renderService = new RenderService()

module.exports = {
    renderService,
    RenderService,
}