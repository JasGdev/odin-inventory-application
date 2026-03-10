const { Router } = require('express');
const gameRouter = Router();
const gameController = require("../controllers/gameController");

gameRouter.get('/', gameController.allGamesGet)
gameRouter.post('/new', gameController.newGamePost)

module.exports = gameRouter;