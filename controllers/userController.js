const {Router, response} = require('express');
const {userService} = require("../services/userService");

const {safeExecute} = require("../controllers/errorController")

const router = Router();

router.get("/signup", (req, res) => {
    res.render("signup", {title: "Sign Up"});
})

router.post("/signup", safeExecute(async (req, res) => {
    const data = req.body
    await userService.addUser(data)
    res.show("Account created successfully!", 201)
}))

module.exports = router;