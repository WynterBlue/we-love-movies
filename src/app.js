if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json())

const moviesRouter = require("./movies/movies.router")
const reviewsRouter = require("./reviews/reviews.router")
const theatersRouter = require("./theaters/theaters.router")

app.use('/theaters', theatersRouter)
app.use('/reviews', reviewsRouter)
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
