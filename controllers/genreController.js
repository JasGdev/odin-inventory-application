const db = require('../db/queries');

exports.newGenreGet = async (req, res ) => {
    res.render('genres/newGenres')
}

exports.newGenrePost = async (req, res) => {
    console.log(req.body.genre)
    console.log(await db.getAllGenres())
    const genre = req.body.genre;
    await db.addGenre(genre)
    res.redirect('/new')
}