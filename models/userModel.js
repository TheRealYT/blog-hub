const {Schema, model} = require("mongoose")

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
        }
    },
    {timestamps: true}
)

const User = model('User', userSchema)

module.exports = {
    User
}