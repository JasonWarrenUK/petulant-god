/* ----- SETUP ----- */
/* Imports */
const express = require("express");
const server = express();
const staticHandler = express.static("public");
const bodyParser = express.urlencoded();

/* Functions */
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
	next();
}

/* Use */
server.use(staticHandler);
server.use(logger);

/* Exports */
module.exports = server;

/* ----- REQUESTS ----- */
/* Home */
server.get("/", (req, res) => {
	const year = new Date().getFullYear();
	res.send(`<!doctype html>
		<html>
			<head>
				<meta charset="utf-8">
				<title>THE OLD ONE</title>
        <link rel="stylesheet" href="/style.css">
			</head>
			<body>
				<h1>HELLO HUMAN OF THE DECADENT YEAR ${year}</h1>
			</body>
		</html>
	`)
});

/* Colour */
server.get("/colour", (req, res) => {
	const hex = req.query.hex || `ffffff`;
  res.send(`
		<style>
			body {
				background-color: #${hex};
			}
		</style>

		<form>
			<h2>Background Changer</h2>
			<p>Enter 6 Characters</p>
			<pre>Acceptable Characters: 0-9 & a-f</pre>
			<label for="hex">Hex Code</label>
			<input name="hex" value="${hex}"></input>
			<p>Then hit the return key</p>
		</form>
	`);
});

/* Cheese */
let cheeses = [];

server.get("/cheese", (req, res) => {
	const form = `<form action="/cheese" method="POST">
		<h2>Cheese? Cheese.</h2>
		
		<div>
			<label for="cheeseName">Name</label>
			<input name="name" value="name"></input>
		</div>

		<div>
			<label for="cheeseScore">Score</label>
			<input type="range" name="rating" value="cheeseScore" min="0" max="5"/>
		</div>

		<button>Cheese</button>
	</form>`;
	const table = `<table>
		<tr>
			<th>Cheese</th> <th>Score</th>
		</tr>
		${cheeses.map((cheese) => `<tr>
			<td>${cheese.name}</td> <td>${cheese.score}</td>
		</tr>`)}
	</table>`
	const listItems = cheeses.map((cheese) => `
		<li>${cheese.name} | ${cheese.score}</li>
	`);
	const list = `<ul>${listItems.join("")}</ul>`;

	res.send(`${form} ${list} ${table}`);
});

server.post("/cheese", bodyParser, (req, res) => {
	cheeses.push({name: req.body.name, score: req.body.rating,});
	res.redirect(`/cheese`);
});

/* Heresy */
server.get(`/heresy`, (req, res) => {
	res.status(500).send(`<h1>THE DIVINE BALANCE HATH BEEN TRIFLED WITH</h1>`);
});

/* Pray */
server.get("/pray", (req, res) => {
  const desire = req.query.keyword.toUpperCase();
  res.send(`<H1>YOU PRAYED FOR ${desire}. I DECLINE</H1>`);
});

/* Judgement */
server.get("/judge/:name", (req, res) => {
	const name = req.params.name.toUpperCase();
	res.send(`<h1>${name} HAS BEEN WEIGHED AND FOUND WANTING</h1>`)
});

/* Submission Form */
server.post("/submit", bodyParser, (req, res) => {
	const name = req.body.name;
	res.redirect(`/submit/success?name=${name}`);
});

server.get("/submit/success", (req, res) => {
	const name = req.query.name.toUpperCase();
	res.send(`<h1>I HEAR YOUR INSIGNIFICANT BURBLINGS, ${name}</h1>`)
})

/* 404 */
server.use((req, res) => {
	res.status(404).send(`<h1>BRING NOT THESE TRIFLES TO ME</h1>`)
})