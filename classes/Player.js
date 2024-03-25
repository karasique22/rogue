export default class Player {
	constructor(x, y, map) {
		this.x = x;
		this.y = y;
		this.health = 100;
		// this.attack = 10;
		this.attack = 100;
		this.map = map;
	}
	move(keyCode) {
		let dx = 0;
		let dy = 0;

		switch (keyCode) {
			case "w":
				dy = -1;
				break;
			case "s":
				dy = 1;
				break;
			case "a":
				dx = -1;
				break;
			case "d":
				dx = 1;
				break;
		}

		const newX = this.x + dx;
		const newY = this.y + dy;
		if (this.map.isTileEmpty(newX, newY)) {
			this.x = newX;
			this.y = newY;
			this.map.displayPlayer(this);
		}
	}
	attackNearbyEnemies() {
		this.map.enemies.forEach((enemy, index) => {
			if (
				Math.abs(this.x - enemy.x) <= 1 &&
				Math.abs(this.y - enemy.y) <= 1
			) {
				enemy.health -= this.attack;
				if (enemy.health <= 0) {
					this.map.enemies.splice(index, 1);
					this.map.removeEntity(`enemy-${enemy.id}`);
				}
			}
		});
	}

	receiveDamage(amount) {
		this.health -= amount;
		if (this.health <= 0) {
			this.die();
		}
	}
}
