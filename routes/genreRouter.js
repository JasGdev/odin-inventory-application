const { Router } = require('express');
const genreRouter = Router();
const genreController = require("../controllers/genreController");

genreRouter.get('/', genreController.allGenresGet)
genreRouter.post('/new', genreController.newGenrePost)
genreRouter.post('/delete/:id', genreController.deleteGenrePost)

module.exports = genreRouter;