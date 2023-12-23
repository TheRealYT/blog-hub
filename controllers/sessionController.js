const { Router } = require('express');
const {jwtService} = require("../services/jwtService");
const {HTTPError} = require("../services/errorService");

async function guard(req, res, next) {
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

module.exports = {guard};