const {Router} = require('express');
const {renderService} = require("../services/renderService");
const {safeExecute} = require("./errorController");
const {blogService} = require("../services/blogService");
const {HTTPError} = require("../services/errorService");
const router = Router();

router.get("/", async (req, res) => {
    res.render('index', await renderService.add(req, {title: "BlogHub - Post and explore blogs on diverse topics."}));
})

router.get("/explore", safeExecute(async (req, res) => {
    const blogs = await blogService.findMany()
    res.render('explore', await renderService.add(req, {
        title: "BlogHub - Post and explore blogs on diverse topics.",
        blogs: JSON.stringify(blogs)
    }));
}))

router.get("/blogs/:blogId", safeExecute(async (req, res) => {
    const blog = await blogService.findOneBlogId(req.params?.blogId)
    if (!blog) {
        throw new HTTPError(404, {}, "Blog not found")
    }

    res.render('blog', await renderService.add(req, {
        title: blog.title,
        blog,
        dateFormat(date) {
            function pad(obj, fill = '0', len = 2) {
                return obj.toString().padStart(len, fill)
            }

            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
        }
    }))
}))

module.exports = router;