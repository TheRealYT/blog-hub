const {User} = require("../models/userModel");

class UserService {
    validateUser(data) {
        return new User(data).validateSync()
    }

    addUser(data) {
        return new User(data).save()
    }
}

const userService = new UserService()

module.exports = {
    userService,
    UserService
}