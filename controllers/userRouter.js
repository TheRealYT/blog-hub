const {Router, response} = require('express');
const {userService} = require("../services/userService");

const {safeExecute} = require("../controllers/errorController")
const {jwtService, JwtService} = require("../services/jwtService");

const router = Router();

router.get("/account/signup", (req, res) => {
    res.render("signup", {title: "BlogHub - Sign Up"});
})

router.post("/account/signup", safeExecute(async (req, res) => {
    const data = req.body
    await userService.addUser(data)
    res.show("Account created successfully!", 201)
}))

router.get("/account/login", (req, res) => {
    res.render("login", {title: "BlogHub - Sign Up"});
})

router.post("/account/login", safeExecute(async (req, res) => {
    const data = req.body
    const user = await userService.login(data)
    if (user) {
        const token = await jwtService.sign({id: user._id});

        res.cookie('token', token, { maxAge: JwtService.MAX_AGE, httpOnly: true });
        res.show("Login successful", 200, {
            token
        })
        return
    }
    res.show("Incorrect user name or password", 403)
}))

module.exports = router;