const crypto = require("node:crypto");

class RandomService {
    uuid() {
        const randomId = crypto.randomUUID().replaceAll('-', '')
        const time = Date.now()
        return `${time}${randomId}`
    }
}

const randomService = new RandomService()

module.exports = {
    randomService,
    RandomService,
}