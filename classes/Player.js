export default class Player {
	constructor(x, y, game, map) {
		this.x = x;
		this.y = y;
		this.health = 100;
		this.attack = 20;
		this.map = map;
		this.game = game;
		this.kills = 0;
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

			function handleEntityInteractions(
				map,
				entityArray,
				entityType,
				playerX,
				playerY,
				useFunction
			) {
				return entityArray.filter(entity => {
					if (playerX === entity.x && playerY === entity.y) {
						map.removeEntity(`${entityType}-${entity.index}`);
						useFunction();
						return false;
					}
					return true;
				});
			}

			this.map.swords = handleEntityInteractions(
				this.map,
				this.map.swords,
				"sword",
				this.x,
				this.y,
				this.useSword.bind(this)
			);
			this.map.potions = handleEntityInteractions(
				this.map,
				this.map.potions,
				"potion",
				this.x,
				this.y,
				this.usePotion.bind(this)
			);

			this.map.enemies.forEach(enemy => {
				if (
					Math.abs(this.x - enemy.x) <= 1 &&
					Math.abs(this.y - enemy.y) <= 1
				) {
					this.receiveDamage(enemy.attack);
				}
			});

			if (this.health > 0) {
				this.map.displayPlayer(this);
			}
		}
	}
	attackNearbyEnemies() {
		this.map.enemies.forEach((enemy, index) => {
			if (
				Math.abs(this.x - enemy.x) <= 1 &&
				Math.abs(this.y - enemy.y) <= 1
			) {
				enemy.health -= this.attack;
				this.map.displayEnemy(enemy);
				if (enemy.health <= 0) {
					this.map.enemies.splice(index, 1);
					this.map.removeEntity(`enemy-${enemy.id}`);
					this.kills++;
				}
			}
		});
	}

	useSword() {
		this.attack += 30;
		const playerELement = document.querySelector(".tileP");
		const timer = document.createElement("div");
		timer.classList.add("timer");
		playerELement.appendChild(timer);

		let time = 10;
		const interval = setInterval(() => {
			timer.innerText = time;
			if (time <= 0) {
				clearInterval(interval);
				timer.remove();
				this.attack -= 30;
			}
			time--;
		}, 1000);
	}

	usePotion() {
		this.health += 20;
		if (this.health > 100) {
			this.health = 100;
		}
	}

	receiveDamage(amount) {
		this.health -= amount;
		if (this.health <= 0) {
			this.die();
		}
	}

	die() {
		this.map.player = null;
		this.map.removeEntity("player");
		this.game.gameOver(this.kills);
	}
}
