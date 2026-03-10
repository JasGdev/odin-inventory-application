const db = require('../db/queries');

exports.allGamesGet = async (req, res) => {
    const genres = await db.getAllGenres()
    const games = await db.getAllGames()
    res.render('games/games',{genres, games})
}

exports.newGamePost = async (req, res) => {
    const title = req.body.title;
    const release_year = req.body.release_year;
    const price = req.body.price;
    let genres = req.body.genres;
    if (!Array.isArray(genres)) genres = [genres]
    // implement genres selection from form
    await db.addGame(title, release_year, price, genres)
    res.redirect('/games')
}

exports.deleteGamePost = async (req, res ) => {
    const id = req.params.id
    await db.deleteGame(id)
    res.redirect('/games')
}
