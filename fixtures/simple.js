const {createServer} = require("http");
const T = require("fp-ts/Task");
const {mount} = require("../dist/mount");

const app = () => {
	return T.of({body: {hello: "world"}, headers: {"Content-Type": "application/json"}, status: 200});
};

createServer(mount({app})).listen(3000);
