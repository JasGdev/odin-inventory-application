const { Router } = require('express');
const gameRouter = Router();
const gameController = require("../controllers/gameController");
const genreController = require("../controllers/genreController");

gameRouter.get('/', gameController.gamesGet)
gameRouter.get('/new', gameController.newGameGet)
gameRouter.post('/new', gameController.newGamePost)
gameRouter.post('/new-genre', genreController.newGenrePost)

module.exports = gameRouter;