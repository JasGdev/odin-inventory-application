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
        SELECT games.*, array_agg(genres.name) AS genres
		FROM games
		LEFT JOIN game_genre ON games.id = game_genre.game_id
		LEFT JOIN genres ON genres.id = game_genre.genre_id
		GROUP by games.id
        `);
	return rows;
};

exports.getAllGamesFiltered = async (genresFilter) => {
	const { rows } = await pool.query(`
        SELECT games.*, array_agg(genres.name) AS genres
		FROM games
		LEFT JOIN game_genre ON games.id = game_genre.game_id
		LEFT JOIN genres ON genres.id = game_genre.genre_id
		GROUP by games.id
		HAVING array_agg(genres.name) @> ($1)
        `, [genresFilter]);
	return rows;
};

exports.getAllGenres = async () => {
	// display how many games are in the genre
	const { rows } = await pool.query(`
		SELECT * FROM genres
		ORDER BY id	`
		
	);
	return rows;
};

exports.getGame = async (gameId) => {
	const { rows } = await pool.query(
		`
		SELECT games.*, array_agg(genres.name) AS genres
		FROM games
		LEFT JOIN game_genre ON games.id = game_genre.game_id
		LEFT JOIN genres ON genres.id = game_genre.genre_id
		WHERE games.id = $1
		GROUP BY games.id
		`,
		[gameId],
	);

	return rows[0];
};

exports.getAllGamesInGenre = async (genreId) => {
	const { rows } = await pool.query(
		`
		SELECT games.* AS games
		FROM games
		LEFT JOIN game_genre ON games.id = game_genre.game_id
		WHERE game_genre.genre_id = $1
		`,
		[genreId],
	);

	return rows;
};

// UPDATE
exports.updateGame = async (
	id,
	title,
	release_year,
	price,
	genres,
) => {
	await pool.query(
		`
		UPDATE games
		SET title = $2, release_year = $3, price = $4
		WHERE id = $1;	
		`,
		[id, title, release_year, price],
	);

	// remove game_genre not specified in genres
	await pool.query(
		`
		DELETE FROM game_genre
		WHERE game_id=$1
		AND genre_id NOT IN (
			SELECT id FROM genres WHERE name = ANY($2)
		)`,
		[id, genres],
	);

	// Add genre game relationship

	await Promise.all(
		genres.map(async (genre) => {
			const { rows } = await pool.query(
				`
			SELECT id FROM genres
			WHERE genres.name = $1`,
				[genre],
			);
			const genreID = rows[0].id;
			await pool.query(
				`
			INSERT INTO game_genre (game_id, genre_id)
			VALUES ($1, $2)
			ON CONFLICT DO NOTHING
			`,
				[id, genreID],
			);
		}),
	);
};

exports.updateGenre = async (genreId, name) => {
	console.log(genreId)
	console.log(name)
	await pool.query(`
		UPDATE genres
		SET name = $2
		WHERE id = $1
		`, [genreId, name])
}

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
