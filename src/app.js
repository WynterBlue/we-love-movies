if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json())

const moviesRouter = require("./movies/movies.router")

app.use('/movies', moviesRouter)


app.use((req, res, next) => {//path not found
    next({
        status: 404,
        message: `path not found: ${req.originalUrl}`
    })
})
app.use((error, req, res, next) => {//something went wrong
    const {status = 500, message = 'Something went wrong'} = error
    res.status(status).json({error: message})
})
module.exports = app;
