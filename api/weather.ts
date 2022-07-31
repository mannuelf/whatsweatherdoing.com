import { ServerRequest } from "https://deno.land/std@0.89.0/http/server.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

config();

export default async (req: ServerRequest): Promise<Response> => {
	const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
	const apiKey = Deno.env.get("OPEN_WEATHER_API_KEY");
	let _jsonData;
	let _lat;
	let _lon;

	try {
		const urlSplit = req.url.split("?")[1].split("&");
		console.log(">>> urlSplit", urlSplit);
		_lat = urlSplit[0];
		_lon = urlSplit[1];

		console.log("lat-long", _lat, _lon);

		const url = new URL(`${baseUrl}?${_lat}&${_lon}&appid=${apiKey}`);
		console.log(url.toString());

		const response = await fetch(url);
		const jsonData = await response.json();
		_jsonData = jsonData;

		console.log("response.statusText", response.statusText);
		console.log("response.status", response.status);
		console.log("response.url", response.url);
		console.log(jsonData);

		return new Response(JSON.stringify(_jsonData), {
			status: 200,
			headers: { "content-type": "application/json; charset=utf-8" },
		});
	} catch (error) {
		console.log(`Something went wrong: ${error}`);
		return new Response(`Something went wrong: ${error}`);
	}
};
