const db = require('../db/queries');

exports.newGenrePost = async (req, res) => {
    console.log(req.body.genre)
    console.log(await db.getAllGenres())
    const genre = req.body.genre;
    await db.addGenre(genre)
    res.redirect('/new')
}