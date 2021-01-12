import {IncomingMessage} from "http";
import * as T from "fp-ts/Task";

export function parseBody(req: IncomingMessage): T.Task<string> {
	return () =>
		new Promise((res) => {
			let body = "";
			req.on("data", (chunk) => (body += chunk));
			req.on("end", () => res(body));
		});
}
