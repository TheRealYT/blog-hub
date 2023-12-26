const {Router} = require('express');
const {userService} = require("../services/userService");

const {safeExecute} = require("../controllers/errorController")
const {jwtService, JwtService} = require("../services/jwtService");
const {renderService} = require("../services/renderService");

const router = Router();

router.get("/account/signup", async (req, res) => {
    res.render("signup", await renderService.add(req, {title: "BlogHub - Sign Up"}));
})

router.post("/account/signup", safeExecute(async (req, res) => {
    const data = req.body
    await userService.addUser(data)
    res.show("Account created successfully!", 201)
}))

router.get("/account/login", async (req, res) => {
    res.render("login", await renderService.add(req, {title: "BlogHub - Login"}));
})

router.post("/account/login", safeExecute(async (req, res) => {
    const data = req.body
    const user = await userService.login(data)
    if (user) {
        const token = await jwtService.sign({id: user._id});

        res.cookie('token', token, {maxAge: JwtService.MAX_AGE, httpOnly: true});
        res.show("Login successful", 200, {
            token
        })
        return
    }
    res.show("Incorrect user name or password", 403)
}))

router.get("/account/logout", safeExecute(async (req, res) => {
    res.clearCookie("token")
    res.redirect("/account/login")
}))

module.exports = router;