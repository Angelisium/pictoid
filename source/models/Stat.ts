/*
	Stat {
		id: String,
		score : Int,
		name: String,
		icon: Null<String>,
		description: String,
		rare: Int,
		social: Bool
	}
*/
export interface Stat {
	_id: string, // gameId_statId
	id: string,
	name: string,
	icon?: string,
	description: string,
	rare: number,

	gameId: number,
}