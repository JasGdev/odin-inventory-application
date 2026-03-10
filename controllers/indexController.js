const db = require('../db/queries');

exports.homePageGet = async (req, res) => {
    const games = await db.getAllGames();
    const genres = await db.getAllGenres();
    res.render('index', {games, genres})
}