const db = require('../db/queries');

exports.allGamesGet = async (req, res, next) => {
	try {
		const genres = await db.getAllGenres();
		const games = await db.getAllGames();
		res.render('games/games', { genres, games });
	} catch(err) {
		next(err);
	}
};

exports.newGamePost = async (req, res, next) => {
	try {
		const title = req.body.title;
		const release_year = req.body.release_year;
		const price = req.body.price;
		let genres = req.body.genres;
		if (!Array.isArray(genres)) genres = [genres];
		await db.addGame(title, release_year, price, genres);
		res.redirect('/');
	} catch(err) {
		next(err);
	}
};

exports.deleteGamePost = async (req, res, next) => {
	try {
		const id = req.params.id;
		await db.deleteGame(id);
		res.redirect('/');
	} catch(err) {
		next(err);
	}
};

exports.gameDetailsGet = async (req, res, next) => {
	try {
		const game = await db.getGame(req.params.id);
		const genres = await db.getAllGenres();
		res.render('games/gameDetail', {game, genres});
	} catch(err) {
		next(err);
	}
};

exports.gameEditPost = async (req, res, next) => {
	try {
		const id = req.params.id;
		const title = req.body.title;
		const release_year = req.body.release_year;
		const price = req.body.price;
		let genres = req.body.genres;
		if (!Array.isArray(genres)) genres = [genres];
		await db.updateGame(id, title, release_year, price, genres);
		res.redirect('/');
	} catch(err) {
		next(err);
	}
};