const moviesService = require("./movies.service");

///////////////////
async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}
///////////////////

async function list(req, res, next) {
  const { is_showing } = req.query
  if(is_showing === "true"){
    const data = await moviesService.listActive()
    res.json({data})
  }else{
    const data = await moviesService.list();
    res.json({ data });
  }
}

async function read(req, res, next) {
  const data = res.locals.movie
  res.json({data})
}

module.exports = {
    list,
    read:[movieExists, read],
}