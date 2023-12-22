const { Router } = require('express');
const express = require("express");
const router = Router();

router.use((req, res, next) => {
    if (req.url.toLowerCase().startsWith("/assets/")) {
        req.url = req.url.substring(7)
        express.static("assets")(req, res, next)
    } else next()
})

module.exports = router;