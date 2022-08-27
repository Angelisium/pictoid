import { Request, Response } from 'express';

export async function route(req: Request, res: Response) {
	let locale = req.params.locale || "fr";

	// if bad game => 404

	return res.render('game.njk', {
		locale,
		game: { // temp dev data
			name: "AlphaBounce",
			stats: [{
				id: "escorp",
				name: "Grade ESCORP atteint",
				description: null,
				icon: "http://www.alphabounce.com/img/icons/rank_1.gif",
				rare: true,
				achievement: [{
					type: "icon",
					url: "http://www.alphabounce.com/img/icons/rank_1.gif",
					npoints: 7.2992700729927,
					description: "Grade ESCORP atteint x1",
					score: 1,
					id: "57_escorp_0"
				}, {
					type: "icon",
					url: "http://www.alphabounce.com/img/icons/rank_2.gif",
					npoints: 7.2992700729927,
					description: "Grade ESCORP atteint x2",
					score: 2,
					id: "57_escorp_1"
				}, {
					type: "icon",
					url: "http://www.alphabounce.com/img/icons/rank_3.gif",
					npoints: 7.2992700729927,
					description: "Grade ESCORP atteint x3",
					score: 3,
					id: "57_escorp_2"
				}, {
					type: "icon",
					url: "http://www.alphabounce.com/img/icons/rank_4.gif",
					npoints: 7.2992700729927,
					description: "Grade ESCORP atteint x4",
					score: 4,
					id: "57_escorp_3"
				}, {
					type: "icon",
					url: "http://www.alphabounce.com/img/icons/rank_5.gif",
					npoints: 7.2992700729927,
					description: "Grade ESCORP atteint x5",
					score: 5,
					id: "57_escorp_4"
				}, {
					type: "icon",
					url: "http://www.alphabounce.com/img/icons/rank_6.gif",
					npoints: 7.2992700729927,
					description: "Grade ESCORP atteint x6",
					score: 6,
					id: "57_escorp_5"
				}, {
					type: "icon",
					url: "http://www.alphabounce.com/img/icons/rank_7.gif",
					npoints: 7.2992700729927,
					description: "Grade ESCORP atteint x7",
					score: 7,
					id: "57_escorp_6"
				}, {
					type: "icon",
					url: "http://www.alphabounce.com/img/icons/rank_8.gif",
					npoints: 7.2992700729927,
					description: "Grade ESCORP atteint x8",
					score: 8,
					id: "57_escorp_7"
				}]
			}, {
				id: "map",
				name: "niveaux réussis",
				description: null,
				rare: false,
				achievement: []
			}, {
				id: "planets",
				name: "Planètes explorées",
				description: null,
				icon: "http://www.alphabounce.com/img/icons/small_forum_read.gif",
				rare: false,
				achievement: []
			}, {
				id: "mission",
				name: "missions accomplies",
				description: null,
				icon: "http://www.alphabounce.com/img/icons/small_fuel_free.gif",
				rare: true,
				achievement: []
			}]
		},
		user: req.session.twinoidId ? {
			username: req.session.username,
			avatar: req.session.avatarUrl
		} : false
	});
}