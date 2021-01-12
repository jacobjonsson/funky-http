const {createServer} = require("http");
const T = require("fp-ts/Task");
const {mount} = require("../dist/mount");
const {routes} = require("../dist/routes");

const app = routes({
	"/users": () => T.of({body: "Hello world from /users", headers: {}, status: 200}),
	"/posts": () => T.of({body: "Hello world from /posts", headers: {}, status: 200}),
});

createServer(mount({app})).listen(3000);
