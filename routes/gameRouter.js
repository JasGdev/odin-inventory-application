const { Router } = require('express');
const gameRouter = Router();
const gameController = require("../controllers/gameController");

gameRouter.get('/', gameController.gamesGet)
gameRouter.get('/new', gameController.newGameGet)
gameRouter.post('/new', gameController.newGamePost)

module.exports = gameRouter;