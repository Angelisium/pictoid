function applyGameFilter(filtre, target) {
	let current = document.querySelector('a[data-game].selected'),
		games = document.querySelectorAll('.game[data-locale]');
	const visibleGame = document.querySelector('.games');
	const hiddenGame = document.querySelector('.hgames');
	for(let game of games) {
		if(filtre === "all" || game.dataset.locale === filtre || game.dataset.locale === "all") {
			visibleGame.append(game);
		} else {
			hiddenGame.append(game);
		}
	}
	if(current) {
		current.classList.remove('selected');
	}
	target.classList.add('selected');
}

(async function() {
	"use strict";
	document.addEventListener('click', function(eve) {
		if(eve.target.dataset.hasOwnProperty("game")) {
			applyGameFilter(eve.target.dataset.game, eve.target);
		}
	});
})();