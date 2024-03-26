import Player from "./Player.js";
import Enemy from "./Enemy.js";

let enemyIdCounter = 0;

export default class Map {
	constructor() {
		this.width = 40;
		this.height = 24;
		this.tileSize = 25;
		this.emptyTiles = [];
		this.player = null;
		this.enemies = [];
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
			this
		);

		this.enemiesCoordinates.forEach(({ x, y }, index) => {
			this.enemies.push(new Enemy(x, y, index, this));
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

		this.swordsCoordinates.forEach(({ x, y }) => {
			const sword = document.createElement("div");
			sword.classList.add("tile", "tileSW");
			sword.style.left = x * this.tileSize + "px";
			sword.style.top = y * this.tileSize + "px";
			mapContainer.appendChild(sword);
		});

		this.potionsCoordinates.forEach(({ x, y }) => {
			const potion = document.createElement("div");
			potion.classList.add("tile", "tileHP");
			potion.style.left = x * this.tileSize + "px";
			potion.style.top = y * this.tileSize + "px";
			mapContainer.appendChild(potion);
		});

		this.displayPlayer(this.player);
		this.enemies.forEach(enemy => {
			this.displayEnemy(enemy);
		});

		mapContainer.style.width = this.width * this.tileSize + "px";
		mapContainer.style.height = this.height * this.tileSize + "px";
	}

	displayPlayer(player) {
		let playerElement = document.querySelector(".tileP");

		if (!playerElement) {
			playerElement = document.createElement("div");
			playerElement.classList.add("tile", "tileP");
			const mapContainer = document.querySelector(".field");
			mapContainer.appendChild(playerElement);
		}

		playerElement.style.left = player.x * this.tileSize + "px";
		playerElement.style.top = player.y * this.tileSize + "px";
	}

	displayEnemy(enemy) {
		let enemyElement = document.getElementById(`enemy-${enemy.id}`);

		if (!enemyElement) {
			enemyElement = document.createElement("div");
			enemyElement.id = `enemy-${enemy.id}`;
			enemyElement.classList.add("tile", "tileE");
			const mapContainer = document.querySelector(".field");
			mapContainer.appendChild(enemyElement);
		}

		enemyElement.style.left = enemy.x * this.tileSize + "px";
		enemyElement.style.top = enemy.y * this.tileSize + "px";
	}

	removeEntity(id) {
		const entity = document.getElementById(id);
		entity.remove();
	}

	pickEmptyTile() {
		return this.emptyTiles[
			Math.floor(Math.random() * this.emptyTiles.length)
		];
	}

	isTileEmpty(x, y) {
		return this.map[y][x] === 0;
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
