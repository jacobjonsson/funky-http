import {IncomingHttpHeaders, IncomingMessage, OutgoingHttpHeaders, ServerResponse} from "http";
import * as T from "fp-ts/Task";

export type Cookies = Record<string, string>;
export type Params = Record<string, any>;
export type Query = Record<string, any>;

export type FunkyRequest = {
	body: string;
	cookies: Cookies;
	headers: IncomingHttpHeaders;
	method: string;
	params: Record<string, any>;
	pathname: string;
	query: Record<string, any>;
	request: IncomingMessage;
	response: ServerResponse;
	url: string;
};

export type FunkyResponsePayload = {status: number; body: string | object; headers: OutgoingHttpHeaders};

export type FunkyResponse = T.Task<FunkyResponsePayload>;

export type FunkyHandler = (request: FunkyRequest) => FunkyResponse;
