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

		this.playerCoordinates = this.placeEntities(1)[0];
		this.enemiesCoordinates = this.placeEntities(10);
		this.swordsCoordinates = this.placeEntities(2);
		this.potionsCoordinates = this.placeEntities(10);

		this.player = new Player(
			this.playerCoordinates.x,
			this.playerCoordinates.y,
			this.game,
			this
		);

		this.addEntitiesToCollection(
			this.enemiesCoordinates,
			this.enemies,
			Enemy
		);
		this.addEntitiesToCollection(this.swordsCoordinates, this.swords, null);
		this.addEntitiesToCollection(
			this.potionsCoordinates,
			this.potions,
			null
		);

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

		// FIXME:fix unreachable rooms
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

		this.displayEntities([this.player], this.displayPlayer.bind(this));
		this.displayEntities(this.enemies, this.displayEnemy.bind(this));
		this.displayEntities(this.swords, this.displaySword.bind(this));
		this.displayEntities(this.potions, this.displayPotion.bind(this));

		mapContainer.style.width = this.width * this.tileSize + "px";
		mapContainer.style.height = this.height * this.tileSize + "px";
	}

	displayEntities(entities, displayFunction) {
		entities.forEach(entity => {
			displayFunction(entity);
		});
	}

	addEntitiesToCollection(coordinates, collection, constructor) {
		coordinates.forEach(({ x, y }, index) => {
			if (constructor) {
				collection.push(new constructor(x, y, index, this));
			} else {
				collection.push({ x, y, index });
			}
		});
	}

	createOrUpdateElement(id, className, x, y, tileSize, parentElement) {
		let element = document.getElementById(id);
		if (!element) {
			element = document.createElement("div");
			element.id = id;
			if (className === "health") {
				element.classList.add(className);
			} else {
				element.classList.add("tile", className);
				element.style.left = x * tileSize + "px";
				element.style.top = y * tileSize + "px";
			}
			parentElement.appendChild(element);
		} else if (className !== "health") {
			element.style.left = x * tileSize + "px";
			element.style.top = y * tileSize + "px";
		}

		return element;
	}

	displayPlayer(player) {
		const mapContainer = document.querySelector(".field");
		let playerElement = this.createOrUpdateElement(
			"player",
			"tileP",
			player.x,
			player.y,
			this.tileSize,
			mapContainer
		);
		let healthElement = this.createOrUpdateElement(
			"playerHealth",
			"health",
			player.x,
			player.y,
			this.tileSize,
			playerElement
		);
		healthElement.style.width = player.health / 2 + "px";
	}

	displayEnemy(enemy) {
		const mapContainer = document.querySelector(".field");
		let enemyElement = this.createOrUpdateElement(
			`enemy-${enemy.id}`,
			"tileE",
			enemy.x,
			enemy.y,
			this.tileSize,
			mapContainer
		);
		let healthElement = this.createOrUpdateElement(
			`enemyHealth-${enemy.id}`,
			"health",
			enemy.x,
			enemy.y,
			this.tileSize,
			enemyElement
		);
		healthElement.style.width = enemy.health / 2 + "px";
	}

	displaySword(sword) {
		const mapContainer = document.querySelector(".field");
		this.createOrUpdateElement(
			`sword-${sword.index}`,
			"tileSW",
			sword.x,
			sword.y,
			this.tileSize,
			mapContainer
		);
	}

	displayPotion(potion) {
		const mapContainer = document.querySelector(".field");
		this.createOrUpdateElement(
			`potion-${potion.index}`,
			"tileHP",
			potion.x,
			potion.y,
			this.tileSize,
			mapContainer
		);
	}

	removeEntity(id) {
		const entity = document.getElementById(id);
		entity.remove();
	}

	pickEmptyTile() {
		const randomIndex = Math.floor(Math.random() * this.emptyTiles.length);
		const selectedTile = this.emptyTiles[randomIndex];

		this.emptyTiles.splice(randomIndex, 1);

		return selectedTile;
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

	placeEntities(count) {
		const entities = [];

		for (let i = 0; i < count; i++) {
			const { x, y } = this.pickEmptyTile();
			entities.push({ x, y });
		}

		return entities;
	}
}
