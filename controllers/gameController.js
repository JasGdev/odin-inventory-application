const db = require('../db/queries');

exports.allGamesGet = async (req, res) => {
    const genres = await db.getAllGenres()
    const games = await db.getAllGames()
    res.render('games/games',{genres})
}

exports.newGameGet =async (req, res) => {
    const genres = await db.getAllGenres()

    res.render('games/newGame', {genres})
}

exports.newGamePost = (req, res) => {
    const title = req.body.title;
    const release_year = req.body.release_year;
    const price = req.body.price;
    // implement genres selection from form
    db.addGame()
    console.log(title + release_year + price)
    res.redirect('/')
}
