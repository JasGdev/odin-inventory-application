const { Router } = require('express');
const genreRouter = Router();
const genreController = require("../controllers/genreController");

genreRouter.get('/new', genreController.newGenreGet)
genreRouter.post('/new', genreController.newGenrePost)

module.exports = genreRouter;