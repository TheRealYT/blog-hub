// load .env
require("dotenv").configDotenv()

const express = require("express")
const app = express()
const twig = require("twig")

// controllers
const indexController = require("./controllers/indexController")
const userController = require("./controllers/userController")

// services
const {dbService} = require("./services/dbService");

// setup twig template
twig.cache(false) // TODO: sync with app "view cache"
app.set('view engine', 'twig');
app.set("twig options", {
    allowAsync: true, // allow asynchronous compiling
    strict_variables: false
});

app.use(express.static("public")) // expose public dir
app.use(require("cookie-parser")())
app.use(express.json()) // json body parser
app.use(express.urlencoded({extended: true})) // form parser

// use controllers
app.use("/", indexController)
app.use("/user", userController)

// fallback
app.use((req, res) => {
    res.status(404).send("404 :( Not Found");
})

// error handler
app.use((error, req, res) => {
    console.error(error);
    res.status(505).send("500 :( Internal Server Error");
})

// initial db connection
dbService.connect().then(() => {
    console.log("Database connected")
}).catch(e => console.error(e))

// start server
const listener = app.listen(process.env.PORT, () => {
    const {port, address} = listener.address();
    console.log("Server started", address, port)
})