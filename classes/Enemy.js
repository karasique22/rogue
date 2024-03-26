export default class Enemy {
	constructor(x, y, id, map) {
		this.x = x;
		this.y = y;
		this.id = id;
		this.map = map;
		this.health = 100;
	}

	// TODO: add finding path to the player algorithm
	move(playerX, playerY) {
		const dx = Math.random() < 0.5 ? 1 : -1;
		const dy = Math.random() < 0.5 ? 1 : -1;

		const newX = this.x + dx;
		const newY = this.y + dy;

		if (this.map.isTileEmpty(newX, newY)) {
			this.x = newX;
			this.y = newY;
			this.map.displayEnemy(this);
		}
	}
}
