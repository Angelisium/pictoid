function applyGameFilter(filtre, target) {
	let current = document.querySelector('a[data-game].selected'),
		games = document.querySelectorAll('.games .game');
	for(let game of games) {
		if(filtre === "all" || game.dataset.locale === filtre) {
			game.removeAttribute('style');
		} else {
			game.setAttribute('style', 'display:none');
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