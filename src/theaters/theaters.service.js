const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    created_at: ["movies", null, "created_at"],
    updated_at: ["movies", null, "updated_at"],
    is_showing: ["movies", null, "is_showing"],
    theater_id: ["movies", null, "theater_id"],
  });

// const addMovies = mapProperties({
//     movie_id: "movies[0].movie_id",
//     title: "movies[0].title",
//     rating: "movies[0].rating",
//   });

function list() {
    return knex("theaters as t")
        .join('movies_theaters as mt', 't.theater_id', 'mt.theater_id')
        .join('movies as m', 'mt.movie_id', 'm.movie_id')
        // .then((rows => rows.map(addMovies)))
        .then(reduceMovies)

}

module.exports = {
    list,
}