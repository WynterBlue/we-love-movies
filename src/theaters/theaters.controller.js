const service = require("./theaters.service");
///////////////////
function validateMovie(req, res, next) {
  const { movieId } = req.params;
  const foundMovieId = movieId;
  if (foundMovieId) {
    res.locals.movieId = foundMovieId;
  }
  next();
}
///////////////////
async function list(req, res, next) {
  const { movieId } = res.locals;
  const theaters = await service.list();
  if (movieId !== {}) {//if there's a movie ID, filter out the matching theaters
    const data = theaters.filter((theater) => theater.movies.filter((movie) => movie.movie_id == movieId));
    return res.json({ data });
  } else{
      return res.json({ theaters });
  }
  
}

module.exports = {
  list: [validateMovie, list],
};
