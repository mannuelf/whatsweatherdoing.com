import { ServerRequest } from "https://deno.land/std@0.89.0/http/server.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

config();

export default async (req: ServerRequest): Promise<Response> => {
	const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
	const apiKey = Deno.env.get("OPEN_WEATHER_API_KEY");
	let _jsonData;

	try {
		const params = new URLSearchParams(req.url);
		for (const param of params) {
			const url = new URL(
				`${baseUrl}?q=${param[1]}&appid=${apiKey}&units=metric`
			);

			console.log(url.toString());

			const response = await fetch(url);
			const jsonData = await response.json();
			_jsonData = jsonData;
			console.log("response.statusText", response.statusText);
			console.log("response.status", response.status);
			console.log("response.url", response.url);
			console.log(jsonData);
		}
		return new Response(JSON.stringify(_jsonData), {
			status: 200,
			headers: {
				"content-type": "application/json; charset=utf-8",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Origin": "whatsweatherdoing.com",
				"Access-Control-Allow-Headers":
					"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
			},
		});
	} catch (error) {
		console.log(`Something went wrong: ${error}`);
		return new Response(`Something went wrong: ${error}`);
	}
};
