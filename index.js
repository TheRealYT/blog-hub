// load .env
require("dotenv").configDotenv()

const express = require("express")
const app = express()
const twig = require("twig")

// controllers
const indexController = require("./controllers/indexRouter")
const userController = require("./controllers/userRouter")
const assetsController = require("./controllers/assetsRouter")
const responseController = require("./controllers/responseApp")
const {handleError} = require("./controllers/errorController");

// services
const {dbService} = require("./services/dbService");

// setup twig template
twig.cache(false) // TODO: sync with app "view cache"
app.set('view engine', 'twig');
app.set("twig options", {
    allowAsync: true, // allow asynchronous compiling
    strict_variables: false
});

app.use(assetsController) // expose assets dir

app.use(require("cookie-parser")())
app.use(express.json()) // json body parser
app.use(express.urlencoded({extended: true})) // form parser

// use controllers
responseController(app)
app.use("/", indexController)
app.use(userController)

// fallback
app.use((req, res) => {
    res.show("404 :( Not Found", 404);
})

// http error handler
app.use(handleError)

// error handler
app.use((error, req, res, next) => {
    console.error(error);
    res.show("500 :( Internal Server Error", 500);
})

// initial db connection
function loop() {
    dbService.connect().then(() => {
        console.log("Database connected")
    }).catch(e => {
        console.error(e.message)
        setTimeout(loop, 5000)
        console.log("Reconnecting in 5s")
    })
}
loop()

// start server
const listener = app.listen(process.env.PORT, () => {
    const {port, address} = listener.address();
    console.log("Server started", address, port)
})