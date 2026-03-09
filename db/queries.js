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
	await pool.query(
		`
        INSERT INTO games (title, release_year, price)
        VALUES ($1, $2, $3) ON CONFLICT DO NOTHING
        `,
		[title, release_year, price],
	);

    // insert genres
	await Promise.all(genres.map((genre) => {
		return pool.query(`
            INSERT INTO genres (name)
            VALUES ($1) ON CONFLICT DO NOTHING
            `, [genre]);
	}));

    // insert platforms
    await Promise.all(platforms.map((platform) => {
		return pool.query(`
            INSERT INTO platforms (name)
            VALUES ($1) ON CONFLICT DO NOTHING
            `, [platform]);
	}));

    const game_id = await pool.query(`
        SELECT id FROM games 
        WHERE title = $1
        `, [title])

}
