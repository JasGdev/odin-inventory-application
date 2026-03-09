const db = require('../db/queries');

exports.gamesGet = async (req, res) => {
    const games = await db.getAllGames()
    res.render('games/games', )
}

exports.newGameGet = (req, res) => {
    db.getAllGenres()

    res.render('games/newGame')
}

exports.newGamePost = (req, res) => {
    const title = req.body.title;
    const release_year = req.body.release_year;
    const price = req.body.price;
    db.addGame()
    console.log(title + release_year + price)
    res.redirect('/')
}