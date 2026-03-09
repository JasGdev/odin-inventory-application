const { Router } = require('express');
const genreRouter = Router();
const genreController = require("../controllers/genreController");

// genreRouter.get('/', genreController.genresGet)

module.exports = genreRouter;