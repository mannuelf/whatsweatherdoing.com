import { ServerRequest } from "https://deno.land/std@0.89.0/http/server.ts";

/**
 * Interface of HTTP server response.
 * If body is a Reader, response would be chunked.
 * If body is a string, it would be UTF-8 encoded by default.
 */
export interface Response {
	status?: number;
	headers?: Headers;
	body?: Uint8Array | Deno.Reader | string;
	trailers?: () => Promise<Headers> | Headers;
}

export default (req: ServerRequest) =>
	req.respond({
		body: "whatsweatherdoing API",
	});
