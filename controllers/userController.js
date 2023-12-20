const {Router} = require('express');
const {userService} = require("../services/userService");
const router = Router();

router.post("/validate", async (req, res) => {
    const data = req.body
    const result = userService.validateUser(data)
    res.json(result)
})

router.post("/add", async (req, res, next) => {
    const data = req.body
    try {
        const result = await userService.addUser(data)
        res.json(result)
    } catch (e) {
        if (e.name === "ValidationError") return res.status(400).send(e.errors)
        next(e)
    }
})

module.exports = router;