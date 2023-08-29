const moviesService = require("./movies.service");

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

module.exports = {
    list,
}