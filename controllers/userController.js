const {Router} = require('express');
const {userService} = require("../services/userService");

const {safeExecute} = require("../controllers/errorController")

const router = Router();

router.post("/add", safeExecute(async (req, res) => {
        const data = req.body
        const result = await userService.addUser(data)
        res.json(result)
    })
)

module.exports = router;