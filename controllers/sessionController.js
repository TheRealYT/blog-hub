const {Router} = require('express');
const {jwtService} = require("../services/jwtService");
const {HTTPError} = require("../services/errorService");

async function guard(req, res, next) {
    if (loggedIn(req)) {
        next()
        return
    }

    const token = jwtService.extractTokenCookie(req) ?? jwtService.extractTokenAuth(req)
    if (token) {
        try {
            req.user = await jwtService.verify(token)
            next()
        } catch (e) {
            next(e)
        }
        return
    }
    next(new HTTPError(403, {}, "Unauthorized access"))
}

function loggedIn(req) {
    return !!req?.user?.id;
}

async function loadCredentials(req) {
    if (loggedIn(req)) return true

    const token = jwtService.extractTokenCookie(req) ?? jwtService.extractTokenAuth(req)
    if (token) {
        try {
            req.user = await jwtService.verify(token)
            return true
        } catch (e) {
        }
    }
    return false
}

module.exports = {guard, loadCredentials};