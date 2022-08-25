/*
	Site {
		id: Int,
		name: String,
		host: String,
		icon: {url: String},
		lang: String, // null si multilingue
		like: Like
		infos : Array<SiteInfo>, // .filter(lang)
		me: SiteUser,
		status: String, // hide, soon, beta, open
	}
	SiteInfo {
		id: Int,
		site: Site,
		lang: String,
		cover: {url: String},
		tagLine: String,
		description: String,
		tid: String,
		icons: Array<{tag: String, altTag: Null<String>, url: String, type: String}> // type = icon|image
	}
*/
export class Game { }