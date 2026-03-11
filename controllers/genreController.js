const db = require('../db/queries');

exports.newGenrePost = async (req, res, next) => {
	try {
		const genre = req.body.genre;
		await db.addGenre(genre);
		res.redirect('/');
	} catch(err) {
		next(err);
	}
};

exports.allGenresGet = async (req, res, next) => {
	try {
		const genres = await db.getAllGenres();
		res.render('genres/genres', {genres});
	} catch(err) {
		next(err);
	}
};

exports.deleteGenrePost = async (req, res, next) => {
	try {
		const genreId = req.params.id;
		await db.deleteGenre(genreId);
		res.redirect('/');
	} catch(err) {
		next(err);
	}
};

exports.updateGenrePost = async (req, res, next) => {
	try {
		const genreId = req.params.id;
		const name = req.body.name;
		await db.updateGenre(genreId, name);
		res.redirect('/genres');
	} catch(err) {
		next(err);
	}
};