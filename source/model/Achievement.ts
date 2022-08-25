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

export class Achievement {
	constructor(
		public data: {
			type: string,           // know type : title, image, ???
			// type title :
			title?: string,
			prefix?: boolean,       // false if not define else true
			suffix?: boolean        // idem
			// type image :
			url?: string,
		},
		// date:string
		public name: string,        // The name of the reward category
		public stat: string,        // The reward category id (statId)
		public npoints: number,     // float.. ???
		public description: string, // The description of the reward category
		public points: number,      // int.. 
		public score: number,       // Score to be reached in the reward category to obtain this reward
		public id: string,          // unique id composed of : siteId_statId_index
		public index: number,       // 
		public game: number         // 
	) { }
}