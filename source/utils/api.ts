import { Fields, TokenResponse, User } from "./apiTypes";

type WithError<T> = {
	error?: string;
} & T;

export async function getToken(code: string): Promise<string | undefined> {
	const params = new URLSearchParams()
	params.append("client_id", process.env.CLIENT_ID!);
	params.append("client_secret", process.env.CLIENT_SECRET!);
	params.append("grant_type", "authorization_code");
	params.append("code", code);
	params.append("redirect_uri", process.env.APP_URL + "/oauth/callback");

	const response: TokenResponse = await fetch("https://twinoid.com/oauth/token", {
		method: "POST",
		headers: {
			"Content-type": "application/x-www-form-urlencoded"
		},
		body: params
	}).then(res => res.json());

	return response?.access_token;
}

export async function fetchTwinoidApi(token: string, url: string, fields: Fields<any> = true): Promise<any> {
	const f = computeFields(fields);
	const fullUrl = "https://twinoid.com/graph/" + url + "?access_token=" + token + (f ? "&fields=" + f : "")
	console.log("fetchTwinoidApi", fullUrl);
	return fetch(fullUrl).then(res => res.json());
}

// TODO: filters ?
function computeFields(fields: Fields<any>): string | undefined {
	const f: string[] = []
	if (fields === true) return undefined; // = all fields.

	for (const key in fields) {
		const v = fields[key];
		if (v === undefined) continue;
		if (v === true) {
			f.push(key);
		} else {
			const subFields = computeFields(v);
			f.push(key + (subFields ? ".fields(" + subFields + ")" : ""));
		}
	}
	return f.join(',')
}

export async function getUserInfos(token: string, userId?: string, fields: Fields<User> = true): Promise<WithError<User>> {

	return await fetchTwinoidApi(token, userId ? "user/" + userId : "me", fields);
}