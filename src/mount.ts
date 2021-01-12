import {IncomingMessage, ServerResponse} from "http";
import * as T from "fp-ts/Task";
import {parseBody} from "./parse_body";
import {parseCookies} from "./parse_cookies";
import {parseURL} from "./parse_url";
import {pipe} from "fp-ts/lib/function";
import {FunkyHandler, FunkyRequest} from "./types";

type MountArgs = {
	app: FunkyHandler;
};

export function mount({app}: MountArgs) {
	return (req: IncomingMessage, res: ServerResponse) => {
		pipe(
			T.Do,
			T.bind("request", () => T.of(req)),
			T.bind("response", () => T.of(res)),
			T.bind("body", () => parseBody(req)),
			T.map((v) => ({...v, parsedURL: parseURL(v.request)})),
			T.map((v) => ({...v, cookies: parseCookies(v.request)})),
			T.map(
				({body, cookies, parsedURL, request, response}): FunkyRequest => ({
					body: body,
					cookies: cookies,
					headers: request.headers,
					method: request.method || "GET",
					params: {},
					request: request,
					response: response,
					url: req.url!,
					...parsedURL,
				}),
			),
			T.chain(app),
			T.map((response) =>
				typeof response.body === "object" ? {...response, body: JSON.stringify(response.body)} : response,
			),
			T.chainFirst((response) => T.fromIO(() => res.writeHead(response.status, response.headers))),
			T.chainFirst((response) => T.fromIO(() => res.write(response.body))),
			T.chainFirst(() => T.fromIO(() => res.end())),
		)();
	};
}
