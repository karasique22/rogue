import Player from "./Player.js";
import Enemy from "./Enemy.js";

export default class Map {
	constructor(game) {
		this.width = 40;
		this.height = 24;
		this.tileSize = 25;
		this.emptyTiles = [];
		this.player = null;
		this.enemies = [];
		this.swords = [];
		this.potions = [];
		this.game = game;
	}

	init() {
		this.map = this.generateMap();
		this.playerCoordinates = this.placePlayer();
		this.enemiesCoordinates = this.placeEnemies(10);
		this.swordsCoordinates = this.placeSwords(2);
		this.potionsCoordinates = this.placePotions(10);

		this.player = new Player(
			this.playerCoordinates.x,
			this.playerCoordinates.y,
			this.game,
			this
		);

		// TODO: refactor
		this.enemiesCoordinates.forEach(({ x, y }, index) => {
			this.enemies.push(new Enemy(x, y, index, this));
		});

		this.swordsCoordinates.forEach(({ x, y }, index) => {
			this.swords.push({ x, y, index });
		});

		this.potionsCoordinates.forEach(({ x, y }, index) => {
			this.potions.push({ x, y, index });
		});

		this.displayMap();
	}

	generateMap() {
		let map = [];

		for (let i = 0; i < this.height; i++) {
			map[i] = [];
			for (let j = 0; j < this.width; j++) {
				map[i][j] = 1;
			}
		}

		// Generate rooms
		const numRooms = Math.floor(Math.random() * 6) + 5;
		const minRoomSize = Math.floor(Math.random() * 6) + 3;
		const maxRoomSize = Math.floor(Math.random() * 6) + 3;

		for (let r = 0; r < numRooms; r++) {
			const roomWidth =
				Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1)) +
				minRoomSize;
			const roomHeight =
				Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1)) +
				minRoomSize;
			let startX, startY;
			let failedIterations = 0;
			do {
				startX = Math.floor(Math.random() * (this.width - roomWidth));
				startY = Math.floor(Math.random() * (this.height - roomHeight));
				const isOverlap = this.checkRoomOverlap(
					map,
					startX,
					startY,
					roomWidth,
					roomHeight
				);
				if (!isOverlap) {
					for (let i = startY; i < startY + roomHeight; i++) {
						for (let j = startX; j < startX + roomWidth; j++) {
							map[i][j] = 0;
							this.emptyTiles.push({ x: j, y: i });
						}
					}
					break;
				}
				failedIterations++;
			} while (failedIterations < 50);
		}

		const numVerticalPassages = Math.floor(Math.random() * 3) + 3;
		for (let v = 0; v < numVerticalPassages; v++) {
			const passageX = Math.floor(Math.random() * (this.width - 2)) + 1;
			for (let y = 0; y < this.height; y++) {
				map[y][passageX] = 0;
				this.emptyTiles.push({ x: passageX, y: y });
			}
		}

		const numHorizontalPassages = Math.floor(Math.random() * 3) + 3;
		for (let h = 0; h < numHorizontalPassages; h++) {
			const passageY = Math.floor(Math.random() * (this.height - 2)) + 1;
			for (let x = 0; x < this.width; x++) {
				map[passageY][x] = 0;
				this.emptyTiles.push({ x: x, y: passageY });
			}
		}

		return map;
	}

	checkRoomOverlap(map, x, y, width, height) {
		for (let i = y - 1; i < y + height + 1; i++) {
			for (let j = x - 1; j < x + width + 1; j++) {
				if (map[i] && map[i][j] === 0) {
					return true;
				}
			}
		}
		return false;
	}

	displayMap() {
		const mapContainer = document.querySelector(".field");
		mapContainer.innerHTML = "";

		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				const tile = document.createElement("div");
				tile.classList.add("tile");

				if (this.map[i][j] === 0) {
					tile.classList.add("tile");
				} else if (this.map[i][j] === 1) {
					tile.classList.add("tileW");
				}

				tile.style.left = j * this.tileSize + "px";
				tile.style.top = i * this.tileSize + "px";

				mapContainer.appendChild(tile);
			}
		}

		// TODO: refactor
		this.displayPlayer(this.player);
		this.enemies.forEach(enemy => {
			this.displayEnemy(enemy);
		});
		this.swords.forEach(sword => {
			this.displaySword(sword);
		});
		this.potions.forEach(potion => {
			this.displayPotion(potion);
		});

		mapContainer.style.width = this.width * this.tileSize + "px";
		mapContainer.style.height = this.height * this.tileSize + "px";
	}

	displayPlayer(player) {
		let playerElement = document.querySelector(".tileP");
		let healthElement = document.querySelector(".health");

		if (!playerElement) {
			playerElement = document.createElement("div");
			playerElement.classList.add("tile", "tileP");
			playerElement.id = "player";
			const mapContainer = document.querySelector(".field");
			mapContainer.appendChild(playerElement);

			healthElement = document.createElement("div");
			healthElement.classList.add("health");
			playerElement.appendChild(healthElement);
		}

		playerElement.style.left = player.x * this.tileSize + "px";
		playerElement.style.top = player.y * this.tileSize + "px";

		healthElement.style.width = player.health / 2 + "px";
	}

	displayEnemy(enemy) {
		let enemyElement = document.getElementById(`enemy-${enemy.id}`);
		let healthElement = document.getElementById(`enemyHealth-${enemy.id}`);

		if (!enemyElement) {
			enemyElement = document.createElement("div");
			enemyElement.id = `enemy-${enemy.id}`;
			enemyElement.classList.add("tile", "tileE");
			const mapContainer = document.querySelector(".field");
			mapContainer.appendChild(enemyElement);

			healthElement = document.createElement("div");
			healthElement.classList.add("health");
			healthElement.id = `enemyHealth-${enemy.id}`;
			enemyElement.appendChild(healthElement);
		}

		enemyElement.style.left = enemy.x * this.tileSize + "px";
		enemyElement.style.top = enemy.y * this.tileSize + "px";

		healthElement.style.width = enemy.health / 2 + "px";
	}

	displaySword(sword) {
		const id = sword.index;
		let swordElement = document.getElementById(`sword-${id}`);

		if (!swordElement) {
			swordElement = document.createElement("div");
			swordElement.id = `sword-${id}`;
			swordElement.classList.add("tile", "tileSW");
			const mapContainer = document.querySelector(".field");
			mapContainer.appendChild(swordElement);
		}

		swordElement.style.left = sword.x * this.tileSize + "px";
		swordElement.style.top = sword.y * this.tileSize + "px";
	}

	displayPotion(potion) {
		const id = potion.index;
		let potionElement = document.getElementById(`potion-${id}`);

		if (!potionElement) {
			potionElement = document.createElement("div");
			potionElement.id = `potion-${id}`;
			potionElement.classList.add("tile", "tileHP");
			const mapContainer = document.querySelector(".field");
			mapContainer.appendChild(potionElement);
		}

		potionElement.style.left = potion.x * this.tileSize + "px";
		potionElement.style.top = potion.y * this.tileSize + "px";
	}

	removeEntity(id) {
		const entity = document.getElementById(id);
		entity.remove();
	}

	// FIXME: deleting used empty tiles
	pickEmptyTile() {
		return this.emptyTiles[
			Math.floor(Math.random() * this.emptyTiles.length)
		];
	}

	isTileEmpty(x, y) {
		return this.map[y][x] === 0;
	}

	isTileItem(x, y) {
		const isSword = this.swords.some(
			sword => sword.x === x && sword.y === y
		);
		const isPotion = this.potions.some(
			potion => potion.x === x && potion.y === y
		);
		return isSword || isPotion;
	}

	placePlayer() {
		const { x, y } = this.pickEmptyTile();
		return { x, y };
	}

	// TODO: refactor placing in one function
	placeEnemies(count) {
		const enemies = [];

		for (let i = 0; i < count; i++) {
			const { x, y } = this.pickEmptyTile();
			enemies.push({ x, y });
		}

		return enemies;
	}

	placeSwords(count) {
		const swords = [];

		for (let i = 0; i < count; i++) {
			const { x, y } = this.pickEmptyTile();
			swords.push({ x, y });
		}

		return swords;
	}

	placePotions(count) {
		const potions = [];

		for (let i = 0; i < count; i++) {
			const { x, y } = this.pickEmptyTile();
			potions.push({ x, y });
		}

		return potions;
	}
}
