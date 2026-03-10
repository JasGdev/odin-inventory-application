const db = require('../db/queries');


exports.newGenrePost = async (req, res) => {
    console.log(req.body.genre)
    console.log(await db.getAllGenres())
    const genre = req.body.genre;
    await db.addGenre(genre)
    res.redirect('/genres')
}

exports.allGenresGet = async (req, res) => {
    const genres = await db.getAllGenres();
    res.render('genres/genres', {genres})
}

exports.deleteGenrePost = async (req, res ) => {
    const genreId = req.params.id
    await db.deleteGenre(genreId)
    res.redirect("/genres")
}