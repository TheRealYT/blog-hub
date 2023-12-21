const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

class PasswordService {
    async hash(password) {
        return await bcrypt.hash(password, 10)
    }

    async match(password, dbPassword) {
        return await bcrypt.compare(password, dbPassword)
    }
}

const passwordService = new PasswordService()

module.exports = {
    passwordService,
    PasswordService,
}