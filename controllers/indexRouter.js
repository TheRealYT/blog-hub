const {Router} = require('express');
const {renderService} = require("../services/renderService");
const router = Router();

router.get("/", async (req, res) => {
    res.render('index', await renderService.add(req, {title: "BlogHub - Post and explore blogs on diverse topics."}));
})

module.exports = router;