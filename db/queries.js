const pool = require('./pool');

// Create Read Update Delete
async function addGame(
	title,
	release_year,
	price,
	genres,
	platforms,
) {
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

	// insert platforms
	await Promise.all(
		platforms.map(async (platform) => {
			const { rows } = await pool.query(
				`
            INSERT INTO platforms (name)
            VALUES ($1)
            RETURNING id
            `,
				[platform],
			);
			const platformId = rows[0].id;

			await pool.query(
				`
            INSERT INTO game_platform (game_id, platform_id)
            VALUES ($1, $2)   
            `,
				[gameId, platformId],
			);
		}),
	);
}
