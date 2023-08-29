const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
})

function list() {
    return knex("reviews as r")
    .join('critics as c', 'r.critic_id', 'c.critic_id')
    .select("r.*", 'c.*')
    .then(rows => rows.map(addCritic))
}

function read(reviewId){
    return knex("reviews")
        .select("*")
        .where({review_id: reviewId})
        .first()
}
module.exports = {
    list,
    read
};