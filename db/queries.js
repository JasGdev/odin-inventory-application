const pool = require('./pool');

// CREATE
exports.addGame = async (
	title,
	release_year,
	price,
	genres,
) => {
	// insert game
	const { rows } = await pool.query(
		`
        INSERT INTO games (title, release_year, price)
        VALUES ($1, $2, $3)
        RETURNING id
        `,
		[title, release_year, price],
	);

	const gameId = rows[0].id;

	// insert genres
	await Promise.all(
		genres.map(async (genre) => {
			const { rows } = await pool.query(
				`
            INSERT INTO genres (name)
            VALUES ($1)
			ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
            RETURNING id
            `,
				[genre],
			);
			const genreId = rows[0].id;

			await pool.query(
				`
            INSERT INTO game_genre (game_id, genre_id)
            VALUES ($1, $2)   
            `,
				[gameId, genreId],
			);
		}),
	);
};

exports.addGenre = async (genre) => {
	await pool.query(
		`
        INSERT INTO genres (name)
        VALUES ($1)
        `,
		[genre],
	);
};

// READ

exports.getAllGames = async () => {
	const { rows } = await pool.query(`
        SELECT * FROM games
        `);
	return rows;
};

exports.getAllGenres = async () => {
	const { rows } = await pool.query(`
		SELECT * FROM genres`);
	return rows;
};

exports.getGame = async (gameId) => {
	await pool.query(`
		SELECT * FROM games 
		WHERE id = $1
		`, [gameId])
}

// UPDATE

// DELETE
exports.deleteGame = async (gameId) => {
	await pool.query(
		`
		DELETE FROM games
		WHERE id = $1`,
		[gameId],
	);
};

exports.deleteGenre = async (genreId) => {
	await pool.query(
		`
		DELETE FROM genres
		WHERE id = $1
		`,
		[genreId],
	);
};
