import { ServerRequest } from "https://deno.land/std@0.89.0/http/server.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

config();
export default async (req: ServerRequest): Promise<Response> => {
	const apiKey = Deno.env.get("OPEN_WEATHER_API_KEY");
	let _jsonData;

	try {
		const params = new URLSearchParams(req.url);
		for (const param of params) {
			const url = new URL(
				`https://api.openweathermap.org/data/2.5/weather?q=${param[1]}&units=metric&appid=${apiKey}`
			);

			const response = await fetch(url);
			const jsonData = await response.json();
			_jsonData = jsonData;

			console.log(jsonData);
		}
		return new Response(JSON.stringify(_jsonData), {
			status: 200,
			headers: { "content-type": "application/json; charset=utf-8" },
		});
	} catch (error) {
		console.log(`Something went wrong: ${error}`);
		return new Response(`Something went wrong: ${error}`);
	}
};
