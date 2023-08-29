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

const addCriticToUpdate = mapProperties({
    organization_name: "critic.organization_name",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
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

function update(updatedReview){
    return knex("reviews as r")
    .where({review_id:updatedReview.review_id})
    .update(updatedReview, "*")
    .then(() => {
        return knex("reviews as r")
        .select("r.*", "c.*")
        .join('critics as c', 'r.critic_id', 'c.critic_id')
        .where({ "r.review_id": updatedReview.review_id })
        .then(rows => rows.map(addCriticToUpdate))
    })
}
module.exports = {
    list,
    read,
    update
};
