import { ServerRequest } from "https://deno.land/std@0.89.0/http/server.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

oakCors();
config();

export default async (req: ServerRequest): Promise<Response> => {
	const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
	const apiKey = Deno.env.get("OPEN_WEATHER_API_KEY");

	const urlSplit = req.url.split("?")[1].split("&");

	const _lat = urlSplit[0];
	const _lon = urlSplit[1];

	const url = new URL(
		`${baseUrl}?${_lat}&${_lon}&appid=${apiKey}&units=metric`
	);

	const response = await fetch(url);
	const jsonData = await response.json();

	req.headers.append("Access-Control-Allow-Origin", "*");
	req.headers.append("Access-Control-Allow-Methods", "GET");
	console.log("req.headers", req.headers);

	req.respond({
		body: JSON.stringify(jsonData),
		status: 200,
	});
	return new Response(JSON.stringify(jsonData), {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET",
			"content-type": "application/json; charset=utf-8",
		},
	});
};
