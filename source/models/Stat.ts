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
	id: string,
	name: string,
	icon: string | null,
	description: string,
	rare: number,

	achivement: string,
}