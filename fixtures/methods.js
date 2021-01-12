const {createServer} = require("http");
const T = require("fp-ts/Task");
const {mount} = require("../dist/mount");
const {routes} = require("../dist/routes");
const {methods} = require("../dist/methods");

const app = routes({
	"/users": methods({
		GET: () => T.of({body: {message: "Hello world from GET /users"}, headers: {}, status: 200}),
		POST: () => T.of({body: {message: "Hello world from POST /users"}, headers: {}, status: 200}),
	}),
	"/users/:id": methods({
		GET: (request) =>
			T.of({body: {message: `Hello world from GET /users/${request.params.id}`}, headers: {}, status: 200}),
	}),
	"/posts": () => T.of({body: {message: "Hello world from /posts"}, headers: {}, status: 200}),
});

createServer(mount({app})).listen(3000);
