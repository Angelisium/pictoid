/*
	Achievement {
		id: String,           // siteId_statId_index
		name: String,
		stat: String,         // statId
		score: Int,           // required stat score to obtain this achievement
		points: Int,
		npoints: Float,
		description: String,
		data: {
			type: String,
			?title: String,
			?url: String,
			?prefix: Bool,
			?suffix: Bool
		},
		date: Date,
		index: Int
	}
*/

export interface Achievement {
	data: {
		type: string,           // know type : title, image, ???
		// type title :
		title?: string,
		prefix?: boolean,       // false if not define else true
		suffix?: boolean        // idem
		// type image :
		url?: string,
	},
	// date:string
	name: string,        // The name of the reward category
	npoints: number,     // float.. ???
	description: string, // The description of the reward category
	points: number,      // int.. 
	score: number,       // Score to be reached in the reward category to obtain this reward
	_id: string,          // unique id composed of : siteId_statId_index
	index: number,       // 

	statId: string,      // The reward category id (statId)
	gameId: number,
}