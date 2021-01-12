import {FunkyHandler} from "./types";
import {match, MatchFunction} from "path-to-regexp";
import * as T from "fp-ts/Task";
import {pipe} from "fp-ts/lib/function";
import {mergeRight} from "ramda";

type Handlers = {
	[route: string]: FunkyHandler;
};

export function routes(handlers: Handlers): FunkyHandler {
	const matchers: Array<{matcher: MatchFunction; handler: FunkyHandler}> = Object.entries(
		handlers,
	).map(([route, handler]) => ({matcher: match(route), handler}));

	return (request) => {
		for (const {matcher, handler} of matchers) {
			const params = matcher(request.pathname);
			if (params) {
				return pipe(mergeRight(request, params), handler);
			}
		}

		return T.of({
			status: 404,
			body: "Not found",
			headers: {},
		});
	};
}
