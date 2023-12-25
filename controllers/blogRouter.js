const {Router} = require('express');

const {safeExecute} = require("../controllers/errorController")
const {guard} = require("./sessionController");
const {userService} = require("../services/userService");
const {HTTPError} = require("../services/errorService");
const {blogService} = require("../services/blogService");
const {renderService} = require("../services/renderService");

const router = Router();

router.get("/blog/my", guard, async (req, res) => {
    const blogs = await blogService.findMy(req.user.id)
    res.render("my_blog", await renderService.add(req, {title: "BlogHub - My Blogs", blogs: JSON.stringify(blogs)}));
})

router.get("/blog/:blogId", guard, async (req, res) => {
    const blog = await blogService.findOne(req.user.id, req.params?.blogId)
    res.render("edit_blog", await renderService.add(req, {title: "BlogHub - Edit Blog", blog: JSON.stringify(blog)}));
})

router.get("/blog/new", guard, async (req, res) => {
    res.render("new_blog", await renderService.add(req, {title: "BlogHub - Create new blog"}));
})

router.post("/blog/save", guard, safeExecute(async (req, res) => {
    const data = req.body
    const userId = req.user.id

    if (await userService.findBy(userId)) {
        const blogId = data?.blogId

        if (blogId) {
            const blog = await blogService.updateBlog(userId, blogId, data)
            if (blog) {
                res.show("Blog updated", 200, {blogId: blog.blogId})
            } else {
                throw new HTTPError(404, {}, "Blog not found")
            }
            return
        }

        const blog = await blogService.postBlog(userId, data)
        res.show("Blog posted", 201, {blogId: blog.blogId})
    } else {
        throw new HTTPError(404, {}, "User account not found")
    }
}))

module.exports = router;