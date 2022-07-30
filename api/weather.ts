import { ServerRequest } from "../deps.ts";

export default async (req: ServerRequest): Promise<Response> => {
	const apiKey = "75c739eaf47f79ff08daf1edbaa12036";
	let _jsonData;

	try {
		console.log("METHOD:", req.method);
		console.log("URL:", req.url);
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
		return new Response(_jsonData, {
			status: 200,
			headers: { "content-type": "application/json; charset=utf-8" },
		});
	} catch (error) {
		console.log(`Something went wrong: ${error}`);
		return new Response(`Something went wrong: ${error}`);
	}
};
