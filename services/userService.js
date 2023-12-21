const {User} = require("../models/userModel");
const {filterService} = require("./filterService");

class UserService {
    addUser(data) {
        return new User(filterService.filter(data, ["username", "email", "password"])).save()
    }
}

const userService = new UserService()

module.exports = {
    userService,
    UserService,
}