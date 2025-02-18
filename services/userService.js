const {User} = require("../models/userModel");
const {filterService} = require("./filterService");
const {passwordService} = require("./passwordService");

class UserService {
    addUser(data) {
        return new User(filterService.filter(data, ["username", "email", "password"])).save()
    }

    async login(data) {
        const filter = filterService.filter(data, ["usernameOrEmail", "password"]);
        const user = await User.findOne({$or: [{username: filter?.usernameOrEmail}, {email: filter?.usernameOrEmail}]}).exec()

        if (user) {
            if (await passwordService.match(filter?.password ?? "", user.password)) {
                return user
            }
        }
        return false
    }

    async findBy(userId) {
        return await User.findOne({_id: userId}).exec()
    }
}

const userService = new UserService()

module.exports = {
    userService,
    UserService,
}