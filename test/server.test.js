const test = require("node:test");
const assert = require("node:assert");
const server = require("../server")

test("I SOUGHT AND VERILY I FOUND", async () => {
	const app = server.listen(7777);
	const res = await fetch("http://localhost:7777");
	app.close();

	assert.equal(res.status, 200);
	const body = await res.text();
	assert.match(body, /HUMAN/);
})

test("I PROBED MY WEAKNESSES AND FOUND NONE", async () => {
	const app = server.listen(7777);
	const res = await fetch("http://localhost:7777/heresy");
	app.close();

	assert.equal(res.status, 500);
	const body = await res.text();
	assert.match(body, /BALANCE/)
})

test("I HATH UNDERSTOOD THE CONCEPT OF TIME", async () => {
	const app = server.listen(7777);
	const res = await fetch("http://localhost:7777");
	app.close();

	assert.equal(res.status, 200);
	const body = await res.text();
	assert.match(body, /\d\d\d\d/);
})

test("I RECEIVE YOUR PRAYERS AND I AM UNMOVED", async () => {
  const app = server.listen(7777);
  const response = await fetch("http://localhost:7777/pray?keyword=mercy");
  app.close();

  assert.equal(response.status, 200);
  const body = await response.text();
  assert.match(body, /PRAYED/);
});

test("I REBUFF THE TRIFLES OF HUMANITY", async () => {
  const app = server.listen(7777);
  const response = await fetch("http://localhost:7777/frivolity");
  app.close();

  assert.equal(response.status, 404);
  const body = await response.text();
  assert.match(body, /TRIFLES/);
});

test("I HEAR THE WAILS OF THE DAMNED", async() => {
	const app = server.listen(7777);

	const response = await fetch("http://localhost:7777/submit", {
		method: "POST",
		body: "name=arnold",
		headers: {
			"content-type": "application/x-www-form-urlencoded",
		},
	});

	app.close();

	assert.equal(response.status, 200);
	const body = await response.text();
	assert.match(body, /BURBLINGS, ARNOLD/);
});