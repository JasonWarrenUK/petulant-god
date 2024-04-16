const express = require("express");
const server = express();
module.exports = server;

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
	next();
};

const staticHandler = express.static("public");
const bodyParser = express.urlencoded();

server.use(logger);
server.use(staticHandler);

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

server.get(`/heresy`, (req, res) => {
	res.status(500).send(`<h1>THE DIVINE BALANCE HATH BEEN TRIFLED WITH</h1>`);
});

server.get("/pray", (req, res) => {
  const desire = req.query.keyword.toUpperCase();
  res.send(`<H1>YOU PRAYED FOR ${desire}. I DECLINE</H1>`);
});

server.get("/judge/:name", (req, res) => {
	const name = req.params.name.toUpperCase();
	res.send(`<h1>${name} HAS BEEN WEIGHED AND FOUND WANTING</h1>`)
});

server.post("/submit", bodyParser, (req, res) => {
	const name = req.body.name;
	res.redirect(`/submit/success?name=${name}`);
});

server.get("/submit/success", (req, res) => {
	const name = req.query.name.toUpperCase();
	res.send(`<h1>I HEAR YOUR INSIGNIFICANT BURBLINGS, ${name}</h1>`)
})

server.use((req, res) => {
	res.status(404).send(`<h1>BRING NOT THESE TRIFLES TO ME</h1>`)
})