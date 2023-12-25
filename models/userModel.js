const {Schema, model} = require("mongoose")
const {passwordService} = require("../services/passwordService");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username required'],
            minLength: [6, 'Username too short'],
            maxLength: [12, 'Username too long'],
            validate: {
                validator: async username => {
                    const exists = await User.findOne({username}).exec()
                    return exists === null
                },
                message: () => `Username already taken`
            },
        },
        email: {
            type: String,
            required: [true, 'Email required'],
            unique: true,
            validate: [
                {
                    validator: email => /^[\w-.]{3,}@([\w-]+\.)+[\w-]{2,4}$/.test(email),
                    message: () => "Invalid email",
                },
                {
                    validator: async email => {
                        const exists = await User.findOne({email}).exec()
                        return exists === null
                    },
                    message: () => `Email already used`
                }
            ]
        },
        password: {
            type: String,
            required: [true, "Password required"],
            minLength: [8, 'Password too short'],
            maxLength: [16, 'Password too long'],
        },
        photo: {
            type: String,
            default: "",
            validate: {
                validator: photoUrl => photoUrl === "" || /^http(s)?:\/\/[\w-]+(\.[\w-]+)+/.test(photoUrl),
                message: () => `Invalid url`
            }
        }
    },
    {timestamps: true}
)

userSchema.post('validate', async user => {
    user.password = await passwordService.hash(user.password)
})

const User = model('User', userSchema)

module.exports = {
    User
}