import {FunkyHandler} from "./types";
import * as T from "fp-ts/Task";

type Handlers = {
	[method: string]: FunkyHandler;
};

export function methods(handlers: Handlers): FunkyHandler {
	return (request) => {
		const handler = handlers[request.method];
		if (handler) {
			return handler(request);
		}

		return T.of({
			status: 404,
			body: "Not found",
			headers: {},
		});
	};
}
