import { Request, Response } from 'express';

const temp_game_data = [
	{
		lang: "all",
		cover: "http://data.twinoid.com/file/356_cf63.png",
		name: "AlphaBounce",
		stat: 6,
		achievement: 86,
		score: 1043,
		player: 445
	},
	{
		lang: "all",
		cover: "http://data.twinoid.com/file/536_058b.png",
		name: "Arkadeo",
		stat: 48,
		achievement: 133,
		score: 1000,
		player: 495
	},
	{
		lang: "all",
		cover: "http://data.twinoid.com/file/608_0346.png",
		name: "Braziball Puzzle",
		stat: 0,
		achievement: 0,
		score: 0,
		player: 56
	},
	{
		lang: "fr",
		cover: "http://data.twinoid.com/file/52_891e.png",
		name: "CroqueMotel",
		stat: 11,
		achievement: 39,
		score: 1000,
		player: 427
	},
	{
		lang: "de",
		cover: "http://data.twinoid.com/file/471_8c8b.png",
		name: "Die Verdammten",
		stat: 79,
		achievement: 248,
		score: 867,
		player: 47
	},
	{
		lang: "en",
		cover: "http://data.twinoid.com/file/105_e90c.png",
		name: "Die2Nite",
		stat: 80,
		achievement: 285,
		score: 881,
		player: 162
	},
	{
		lang: "fr",
		cover: "http://data.twinoid.com/file/7_efd4.png",
		name: "DinoRPG",
		stat: 25,
		achievement: 203,
		score: 1000,
		player: 411
	},
	{
		lang: "en",
		cover: "http://data.twinoid.com/file/7_efd4.png",
		name: "DinoRPG",
		stat: 25,
		achievement: 173,
		score: 971,
		player: 63
	},
	{
		lang: "de",
		cover: "http://data.twinoid.com/file/7_efd4.png",
		name: "DinoRPG",
		stat: 23,
		achievement: 139,
		score: 734,
		player: 24
	},
	{
		lang: "es",
		cover: "http://data.twinoid.com/file/7_efd4.png",
		name: "DinoRPG",
		stat: 24,
		achievement: 163,
		score: 942,
		player: 44
	},
	{
		lang: "es",
		cover: "http://data.twinoid.com/file/72_720c.png",
		name: "El Bruto",
		stat: 13,
		achievement: 15,
		score: 1000,
		player: 48
	},
	{
		lang: "es",
		cover: "http://data.twinoid.com/file/88_80cf.png",
		name: "Fever",
		stat: 37,
		achievement: 45,
		score: 671,
		player: 24
	},
	{
		lang: "en",
		cover: "http://data.twinoid.com/file/88_80cf.png",
		name: "Fever",
		stat: 38,
		achievement: 47,
		score: 694,
		player: 18
	},
	{
		lang: "de",
		cover: "http://data.twinoid.com/file/88_80cf.png",
		name: "Fever",
		stat: 30,
		achievement: 35,
		score: 529,
		player: 2
	},
	{
		lang: "fr",
		cover: "http://data.twinoid.com/file/88_80cf.png",
		name: "Fever!",
		stat: 44,
		achievement: 68,
		score: 932,
		player: 409
	},
	{
		lang: "fr",
		cover: "http://data.twinoid.com/file/9_8956.png",
		name: "Hordes",
		stat: 90,
		achievement: 449,
		score: 953,
		player: 486
	},
	{
		lang: "fr",
		cover: "http://data.twinoid.com/file/89_165c.png",
		name: "Intrusion",
		stat: 20,
		achievement: 52,
		score: 1000,
		player: 415
	},
	{
		lang: "all",
		cover: "http://data.twinoid.com/file/426_2326.png",
		name: "KadoKado",
		stat: 106,
		achievement: 565,
		score: 963,
		player: 467
	},
	{
		lang: "fr",
		cover: "http://data.twinoid.com/file/50_305b.png",
		name: "Kingdom",
		stat: 8,
		achievement: 14,
		score: 1000,
		player: 415
	},
	{
		lang: "en",
		cover: "http://data.twinoid.com/file/50_305b.png",
		name: "Kingdom",
		stat: 8,
		achievement: 13,
		score: 914,
		player: 34
	},
	{
		lang: "es",
		cover: "http://data.twinoid.com/file/50_305b.png",
		name: "Kingdom",
		stat: 8,
		achievement: 14,
		score: 1000,
		player: 29
	},
	{
		lang: "de",
		cover: "http://data.twinoid.com/file/50_305b.png",
		name: "Kingdom",
		stat: 7,
		achievement: 7,
		score: 553,
		player: 4
	},
	{
		lang: "fr",
		cover: "http://data.twinoid.com/file/87_8b36.png",
		name: "Kube",
		stat: 10,
		achievement: 18,
		score: 1000,
		player: 361
	},
	{
		lang: "en",
		cover: "http://data.twinoid.com/file/87_8b36.png",
		name: "Kube",
		stat: 9,
		achievement: 12,
		score: 530,
		player: 15
	},
	{
		lang: "es",
		cover: "http://data.twinoid.com/file/87_8b36.png",
		name: "Kube",
		stat: 10,
		achievement: 14,
		score: 653,
		player: 34
	},
	{
		lang: "de",
		cover: "http://data.twinoid.com/file/87_8b36.png",
		name: "Kube",
		stat: 4,
		achievement: 2,
		score: 71,
		player: 5
	},
	{
		lang: "fr",
		cover: "http://data.twinoid.com/file/74_2c04.png",
		name: "La Brute",
		stat: 13,
		achievement: 15,
		score: 1000,
		player: 437
	},
	{
		lang: "fr",
		cover: "http://data.twinoid.com/file/93_1674.png",
		name: "Majority",
		stat: 16,
		achievement: 13,
		score: 1000,
		player: 448
	},
	{
		lang: "de",
		cover: "http://data.twinoid.com/file/335_a392.png",
		name: "Mein Brutalo",
		stat: 9,
		achievement: 9,
		score: 562,
		player: 16
	},
	{
		lang: "es",
		cover: "http://data.twinoid.com/file/205_cb26.png",
		name: "Minitroopers",
		stat: 0,
		achievement: 0,
		score: 0,
		player: 0
	},
	{
		lang: "all",
		cover: "http://data.twinoid.com/file/680_be33.png",
		name: "Monster Hotel",
		stat: 123,
		achievement: 229,
		score: 1000,
		player: 442
	},
	{
		lang: "en",
		cover: "http://data.twinoid.com/file/77_727e.png",
		name: "Monster Motel",
		stat: 11,
		achievement: 39,
		score: 1000,
		player: 49
	},
	{
		lang: "de",
		cover: "http://data.twinoid.com/file/390_d6d2.png",
		name: "MonsterHotel",
		stat: 11,
		achievement: 20,
		score: 393,
		player: 8
	},
	{
		lang: "es",
		cover: "http://data.twinoid.com/file/77_727e.png",
		name: "MonstruHotel",
		stat: 11,
		achievement: 37,
		score: 885,
		player: 43
	},
	{
		lang: "fr",
		cover: "http://data.twinoid.com/file/71_7ec3.png",
		name: "MotionBall 2",
		stat: 37,
		achievement: 37,
		score: 1000,
		player: 379
	},
	{
		lang: "fr",
		cover: "http://data.twinoid.com/file/520_699a.png",
		name: "Mush",
		stat: 107,
		achievement: 281,
		score: 788,
		player: 485
	},
	{
		lang: "es",
		cover: "http://data.twinoid.com/file/520_699a.png",
		name: "Mush",
		stat: 98,
		achievement: 239,
		score: 666,
		player: 94
	},
	{
		lang: "en",
		cover: "http://data.twinoid.com/file/520_699a.png",
		name: "Mush",
		stat: 101,
		achievement: 250,
		score: 749,
		player: 178
	},
	{
		lang: "en",
		cover: "http://data.twinoid.com/file/73_ab78.png",
		name: "MyBrute",
		stat: 12,
		achievement: 14,
		score: 937,
		player: 48
	},
	{
		lang: "fr",
		cover: "http://data.twinoid.com/file/57_a81a.png",
		name: "Naturalchimie 2",
		stat: 70,
		achievement: 251,
		score: 977,
		player: 448
	},
	{
		lang: "fr",
		cover: "http://data.twinoid.com/file/115_5ab4.png",
		name: "Odyssey",
		stat: 138,
		achievement: 140,
		score: 978,
		player: 408
	},
	{
		lang: "all",
		cover: "http://data.twinoid.com/file/655_e7b9.png",
		name: "Rockfaller Journey",
		stat: 38,
		achievement: 503,
		score: 1000,
		player: 479
	},
	{
		lang: "es",
		cover: "http://data.twinoid.com/file/8_0ce3.png",
		name: "Snake",
		stat: 301,
		achievement: 117,
		score: 456,
		player: 26
	},
	{
		lang: "en",
		cover: "http://data.twinoid.com/file/8_0ce3.png",
		name: "Snake",
		stat: 301,
		achievement: 108,
		score: 432,
		player: 26
	},
	{
		lang: "fr",
		cover: "http://data.twinoid.com/file/8_0ce3.png",
		name: "Snake",
		stat: 304,
		achievement: 313,
		score: 1000,
		player: 422
	},
	{
		lang: "de",
		cover: "http://data.twinoid.com/file/8_0ce3.png",
		name: "Snake",
		stat: 301,
		achievement: 94,
		score: 395,
		player: 4
	},
	{
		lang: "all",
		cover: "http://data.twinoid.com/file/611_c5fb.png",
		name: "Street Writer",
		stat: 42,
		achievement: 51,
		score: 1000,
		player: 443
	},
	{
		lang: "fr",
		cover: "http://data.twinoid.com/file/43_6e39.png",
		name: "Studio Quiz",
		stat: 53,
		achievement: 46,
		score: 954,
		player: 437
	},
	{
		lang: "all",
		cover: "http://data.twinoid.com/file/501_f9b5.png",
		name: "Teacher Story",
		stat: 287,
		achievement: 491,
		score: 998,
		player: 499
	},
	{
		lang: "all",
		cover: "http://data.twinoid.com/file/393_b591.png",
		name: "Twinoid",
		stat: 36,
		achievement: 23,
		score: 0,
		player: 541
	},
	{
		lang: "all",
		cover: "http://data.twinoid.com/file/606_2c2d.png",
		name: "Uppercup Football",
		stat: 1,
		achievement: 1,
		score: 11,
		player: 103
	},
	{
		lang: "es",
		cover: "http://data.twinoid.com/file/280_7f21.png",
		name: "Zombinoia",
		stat: 77,
		achievement: 244,
		score: 844,
		player: 99
	}
];

export async function route(req: Request, res: Response) {
	let locale = req.params?.locale || "fr", // tmp default locale = fr
		games = await mongo.collection("game").find({ locale }).toArray();

	res.render('home.njk', {
		locale, // games,
		games: temp_game_data,
		user: req.session.twinoidId ? {
			username: req.session.username,
			avatar: req.session.avatarUrl
		} : req.query?.user ? {
			username: "Angelisium",
			avatar: "//imgup.motion-twin.com//twinoid/2/7/38ff77a6_696209.jpg"
		} : false
	});
}