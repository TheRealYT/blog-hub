const {filterService} = require("./filterService");
const {Blog} = require("../models/blogModel");
const {randomService} = require("./randomService");

class BlogService {
    postBlog(userId, data) {
        const filter = filterService.filter(data, ["title", "content", "cover", "tags"]);
        filter.userId = userId
        filter.blogId = randomService.uuid()

        return new Blog(filter).save()
    }

    updateBlog(userId, blogId, data) {
        const filter = filterService.filter(data, ["title", "content", "cover", "tags"]);
        return Blog.findOneAndUpdate({blogId, userId}, filter, {new: true, runValidators: true}).exec()
    }

    findMy(userId) {
        return Blog.find({userId}).select('-_id -userId -__v').exec();
    }

    findOne(userId, blogId) {
        return Blog.find({userId, blogId}).select('-_id -userId -__v').exec();
    }
}

const blogService = new BlogService()

module.exports = {
    blogService,
    BlogService,
}