const reviewsService = require("./reviews.service");
///////////////////
async function reviewExists(req, res, next) {
    const review = await reviewsService.read(req.params.reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    next({ status: 404, message: `Review cannot be found.` });
  }
  function validateMovie(req, res, next) {
    const { movieId } = req.params;
    const foundMovie = movieId
    if (foundMovie) {
      res.locals.movie = foundMovie;
    } 
    next(); 
  }
  ///////////////////
  
  async function list(req, res, next) {
    const {movie} = res.locals
      const reviews = await reviewsService.list();
      if (movie) {
        const data = reviews.filter((review) => review.movie_id == movie)
        res.json({data})
      }else{
          res.json({ reviews });
      }
  }
  
  async function read(req, res, next) {
    const data = res.locals.review
    res.json({data})
  }

  async function update(req, res, next){
    const localsReview = res.locals.review
    const updatedReview = {
        ...localsReview,
        ...req.body.data,
        review_id: localsReview.review_id,
    }
    const midData = await reviewsService.update(updatedReview)
    const data = midData[0]
    console.log(data)
    res.json({data})
  }
  
  module.exports = {
      list:[validateMovie, list],
      read:[reviewExists, read],
      update:[reviewExists, update]
  }
