// User {
// 	id: Int,
// 	name: String,
// 	picture: ?{url: String},
// 	locale: String,
// 	title: String,
// 	oldNames: Array<{name: String, until: Date}>,
// 	sites:  Array<SiteUser>, // .filter(siteId)
// 	like: Like,
// 	gender: String, // male, female, null
// 	birthday: String, // YYYY-MM-DD
// 	city: String, 
// 	country: String, 
// 	desc: String, // HTML
// 	status: String // HTML
// 	contacts: Array<Contact>, // .filter(userId), mine only, need scope contacts
// 	groups: Array<GroupMember>, // mine only, need scope groups
// 	devApps: Array<Application>, // mine only, need scope applications
// }	

export interface User {
	_id: number,
	name: string,
	picture?: string,
	locale: string,
	stats?: Array<{
		id: string,
		score: number,
	}>,
	achievements?: Array<string>,
	games?: Array<{
		id: string,
		npoints: number,
	}>,
	isLoading: boolean,
	lastUpdated: number,
}