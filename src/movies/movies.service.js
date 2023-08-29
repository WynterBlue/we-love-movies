const knex = require("../db/connection")

function list() {
    return knex("movies").select("*")
}
function listActive(){
    return knex('movies as m')
        .distinct('m.*')
        .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
        .where('mt.is_showing', true)
        .select('m.*')
}

function read(movieId){
    return knex("movies")
        .select("*")
        .where({movie_id: movieId})
        .first()
}

module.exports = {
    list,
    listActive,
    read
}