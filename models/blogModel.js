const {Schema, model, Types} = require("mongoose")

const blogSchema = new Schema(
    {
        blogId: {
            type: String,
        },
        userId: {
            type: Types.ObjectId,
        },
        title: {
            type: String,
            required: [true, 'Title required'],
            maxLength: [128, 'Title too long'],
        },
        content: {
            type: String,
            required: [true, 'Blog content required']
        },
        cover: {
            type: String,
            default: "",
            validate: {
                validator: photoUrl => photoUrl === "" || /^http(s)?:\/\/[\w-]+(\.[\w-]+)+/.test(photoUrl),
                message: () => `Invalid cover image url`
            }
        },
        tags: {
            type: [String],
            default: [],
            validate: {
                validator: tags => {
                    const patterns = [
                        /_{2,}/i, // consecutive _
                        /^[^a-z0-9]/i, // starting with non-alphanumeric
                        /[^a-z0-9_]/i, // containing except alphanumeric and _
                    ]

                    for (const tag of tags) {
                        for (const pattern of patterns) {
                            if (pattern.test(tag)) {
                                return false
                            }
                        }
                    }
                    return true
                },
                message: () => `One or more keyword is invalid`
            }
        }
    },
    {timestamps: true}
)

const Blog = model('Blog', blogSchema)

module.exports = {
    Blog
}