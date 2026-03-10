const { Router } = require('express');
const genreRouter = Router();
const genreController = require("../controllers/genreController");

genreRouter.get('/', genreController.allGenresGet)
genreRouter.post('/new', genreController.newGenrePost)

module.exports = genreRouter;