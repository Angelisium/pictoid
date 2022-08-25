import { TokenResponse, User } from "./apiTypes";

type WithError<T> = {
	error?: string;
} & T;

export async function getToken(code: string): Promise<string | undefined> {
	console.log(code)
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

export async function fetchTwinoidApi(token: string, url: string): Promise<any> {
	return fetch("https://twinoid.com/graph/" + url + "?access_token=" + token).then(res => res.json());
}

export async function getBasicInfos(token: string, userId?: string): Promise<WithError<User>> {
	return await fetchTwinoidApi(token, userId ? "user/" + userId : "me");
}