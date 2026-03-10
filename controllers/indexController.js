const db = require('../db/queries');

exports.homePageGet = async (req, res) => {
    let genresFilter = req.query.genres;
    if (!Array.isArray(genresFilter)) genresFilter = [genresFilter]
    let games = await db.getAllGames();
    if (genresFilter[0] !== undefined) {
        games = await db.getAllGamesFiltered(genresFilter)
    }
    const genres = await db.getAllGenres();


    res.render('index', {games, genres, genresFilter})
}