import qs from "qs";
import {IncomingMessage} from "http";
import {mergeRight} from "ramda";

type ParsedURL = {
	href: string;
	path: string;
	pathname: string;
	search: string;
	query: Record<string, any>;
};

export function parseURL(req: IncomingMessage): ParsedURL {
	let obj: ParsedURL = {
		href: req.url!,
		path: req.url!,
		pathname: req.url!,
		search: "",
		query: {},
	};

	let idx = req.url!.indexOf("?", 1);
	if (idx !== -1) {
		obj.search = req.url!.substring(idx);
		obj.query = qs.parse(obj.search.substring(1));
		obj.pathname = req.url!.substring(0, idx);
	}

	return obj;
}
