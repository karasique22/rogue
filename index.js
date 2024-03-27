import Map from "./classes/Map.js";

class Game {
	init() {
		this.map = new Map(this);
		this.map.init();
		this.player = this.map.player;
		this.enemies = this.map.enemies;
	}

	gameOver(kills) {
		let gameOverElement = document.createElement("div");
		gameOverElement.classList.add("game-over");

		let button = document.createElement("button");
		button.classList.add("restart-button");
		button.innerText = "Начать заново";
		button.setAttribute("onclick", "onClickRestart()");

		let text = document.createElement("p");
		text.innerText = `Игра окончена! Вы убили ${kills} противников`;

		gameOverElement.appendChild(text);
		gameOverElement.appendChild(button);

		document.body.appendChild(gameOverElement);
		document.querySelector(".overlay").style.opacity = "1";

		game.player = null;
	}
}

let game;

const initGame = () => {
	game = new Game();
	game.init();
};

document.addEventListener("DOMContentLoaded", initGame);

document.addEventListener("keydown", event => {
	if (game.player) {
		const key = event.key.toLowerCase();
		if (["w", "a", "s", "d"].includes(key)) {
			game.player.move(key);
		}
	}
});

document.addEventListener("keydown", event => {
	if (game.player) {
		if (event.code === "Space") {
			game.player.attackNearbyEnemies();
		}
	}
});

setInterval(() => {
	game.enemies.forEach(enemy => {
		enemy.move();
	});
}, 2000);

window.onClickRestart = () => {
	const gameOverElement = document.querySelector(".game-over");
	gameOverElement.remove();
	document.querySelector(".overlay").style.opacity = "0";

	initGame();
};
