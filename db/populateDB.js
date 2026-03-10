require('dotenv').config();

const { Client } = require('pg');

const SQL = `
DROP TABLE IF EXISTS game_genre;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS genres;

CREATE TABLE IF NOT EXISTS games (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 255 ) NOT NULL UNIQUE,
    release_year INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS genres (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS game_genre (
    game_id INT,
    genre_id INT,
    PRIMARY KEY (game_id, genre_id),
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);
`;

async function main() {
	console.log('seeding...');
	const client = new Client({
		host: 'localhost',
		user: process.env.USER,
		database: process.env.DATABASE,
		password: process.env.PASSWORD,
		port: 5432,
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log('done');
}

main();
