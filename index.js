import Map from "./classes/Map.js";

class Game {
	init() {
		this.map = new Map();
		this.map.init();
		this.player = this.map.player;
		this.enemies = this.map.enemies;
		this.gameOver = false;
	}
}

const game = new Game();
game.init();

document.addEventListener("keydown", event => {
	if (!game.player.health <= 0) {
		const key = event.key.toLowerCase();
		if (["w", "a", "s", "d"].includes(key)) {
			game.player.move(key);
		}
	}
});

document.addEventListener("keydown", event => {
	if (event.code === "Space") {
		game.player.attackNearbyEnemies();
	}
});

setInterval(() => {
	game.enemies.forEach(enemy => {
		enemy.move(game.player.x, game.player.y);
	});
}, 2000);
