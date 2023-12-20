const { Router } = require('express');
const router = Router();

router.get("/", (req, res) => {
    res.render('index', {title : "BlogHub - Post and explore blogs on diverse topics."});
})

module.exports = router;