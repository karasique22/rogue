/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./classes/Enemy.js":
/*!**************************!*\
  !*** ./classes/Enemy.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Enemy)\n/* harmony export */ });\nclass Enemy {\n\tconstructor(x, y, id, map) {\n\t\tthis.x = x;\n\t\tthis.y = y;\n\t\tthis.id = id;\n\t\tthis.map = map;\n\t\tthis.health = 100;\n\t\tthis.attack = 20;\n\t}\n\n\t// TODO: add finding path to the player algorithm\n\tmove() {\n\t\tconst dx = Math.random() < 0.5 ? 1 : -1;\n\t\tconst dy = Math.random() < 0.5 ? 1 : -1;\n\n\t\tconst newX = this.x + dx;\n\t\tconst newY = this.y + dy;\n\n\t\tif (this.map.isTileEmpty(newX, newY)) {\n\t\t\tthis.x = newX;\n\t\t\tthis.y = newY;\n\t\t\tthis.map.displayEnemy(this);\n\t\t}\n\t}\n}\n\n\n//# sourceURL=webpack:///./classes/Enemy.js?");

/***/ }),

/***/ "./classes/Map.js":
/*!************************!*\
  !*** ./classes/Map.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Map)\n/* harmony export */ });\n/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player.js */ \"./classes/Player.js\");\n/* harmony import */ var _Enemy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Enemy.js */ \"./classes/Enemy.js\");\n\n\n\nclass Map {\n\tconstructor(game) {\n\t\tthis.width = 40;\n\t\tthis.height = 24;\n\t\tthis.tileSize = 25;\n\t\tthis.emptyTiles = [];\n\t\tthis.player = null;\n\t\tthis.enemies = [];\n\t\tthis.swords = [];\n\t\tthis.potions = [];\n\t\tthis.game = game;\n\t}\n\n\tinit() {\n\t\tthis.map = this.generateMap();\n\n\t\tthis.playerCoordinates = this.placeEntities(1)[0];\n\t\tthis.enemiesCoordinates = this.placeEntities(10);\n\t\tthis.swordsCoordinates = this.placeEntities(2);\n\t\tthis.potionsCoordinates = this.placeEntities(10);\n\n\t\tthis.player = new _Player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n\t\t\tthis.playerCoordinates.x,\n\t\t\tthis.playerCoordinates.y,\n\t\t\tthis.game,\n\t\t\tthis\n\t\t);\n\n\t\tthis.addEntitiesToCollection(\n\t\t\tthis.enemiesCoordinates,\n\t\t\tthis.enemies,\n\t\t\t_Enemy_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n\t\t);\n\t\tthis.addEntitiesToCollection(this.swordsCoordinates, this.swords, null);\n\t\tthis.addEntitiesToCollection(\n\t\t\tthis.potionsCoordinates,\n\t\t\tthis.potions,\n\t\t\tnull\n\t\t);\n\n\t\tthis.displayMap();\n\t}\n\n\tgenerateMap() {\n\t\tlet map = [];\n\n\t\tfor (let i = 0; i < this.height; i++) {\n\t\t\tmap[i] = [];\n\t\t\tfor (let j = 0; j < this.width; j++) {\n\t\t\t\tmap[i][j] = 1;\n\t\t\t}\n\t\t}\n\n\t\t// FIXME:fix unreachable rooms\n\t\tconst numRooms = Math.floor(Math.random() * 6) + 5;\n\t\tconst minRoomSize = Math.floor(Math.random() * 6) + 3;\n\t\tconst maxRoomSize = Math.floor(Math.random() * 6) + 3;\n\n\t\tfor (let r = 0; r < numRooms; r++) {\n\t\t\tconst roomWidth =\n\t\t\t\tMath.floor(Math.random() * (maxRoomSize - minRoomSize + 1)) +\n\t\t\t\tminRoomSize;\n\t\t\tconst roomHeight =\n\t\t\t\tMath.floor(Math.random() * (maxRoomSize - minRoomSize + 1)) +\n\t\t\t\tminRoomSize;\n\t\t\tlet startX, startY;\n\t\t\tlet failedIterations = 0;\n\t\t\tdo {\n\t\t\t\tstartX = Math.floor(Math.random() * (this.width - roomWidth));\n\t\t\t\tstartY = Math.floor(Math.random() * (this.height - roomHeight));\n\t\t\t\tconst isOverlap = this.checkRoomOverlap(\n\t\t\t\t\tmap,\n\t\t\t\t\tstartX,\n\t\t\t\t\tstartY,\n\t\t\t\t\troomWidth,\n\t\t\t\t\troomHeight\n\t\t\t\t);\n\t\t\t\tif (!isOverlap) {\n\t\t\t\t\tfor (let i = startY; i < startY + roomHeight; i++) {\n\t\t\t\t\t\tfor (let j = startX; j < startX + roomWidth; j++) {\n\t\t\t\t\t\t\tmap[i][j] = 0;\n\t\t\t\t\t\t\tthis.emptyTiles.push({ x: j, y: i });\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t\tfailedIterations++;\n\t\t\t} while (failedIterations < 50);\n\t\t}\n\n\t\tconst numVerticalPassages = Math.floor(Math.random() * 3) + 3;\n\t\tfor (let v = 0; v < numVerticalPassages; v++) {\n\t\t\tconst passageX = Math.floor(Math.random() * (this.width - 2)) + 1;\n\t\t\tfor (let y = 0; y < this.height; y++) {\n\t\t\t\tmap[y][passageX] = 0;\n\t\t\t\tthis.emptyTiles.push({ x: passageX, y: y });\n\t\t\t}\n\t\t}\n\n\t\tconst numHorizontalPassages = Math.floor(Math.random() * 3) + 3;\n\t\tfor (let h = 0; h < numHorizontalPassages; h++) {\n\t\t\tconst passageY = Math.floor(Math.random() * (this.height - 2)) + 1;\n\t\t\tfor (let x = 0; x < this.width; x++) {\n\t\t\t\tmap[passageY][x] = 0;\n\t\t\t\tthis.emptyTiles.push({ x: x, y: passageY });\n\t\t\t}\n\t\t}\n\n\t\treturn map;\n\t}\n\n\tcheckRoomOverlap(map, x, y, width, height) {\n\t\tfor (let i = y - 1; i < y + height + 1; i++) {\n\t\t\tfor (let j = x - 1; j < x + width + 1; j++) {\n\t\t\t\tif (map[i] && map[i][j] === 0) {\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn false;\n\t}\n\n\tdisplayMap() {\n\t\tconst mapContainer = document.querySelector(\".field\");\n\t\tmapContainer.innerHTML = \"\";\n\n\t\tfor (let i = 0; i < this.height; i++) {\n\t\t\tfor (let j = 0; j < this.width; j++) {\n\t\t\t\tconst tile = document.createElement(\"div\");\n\t\t\t\ttile.classList.add(\"tile\");\n\n\t\t\t\tif (this.map[i][j] === 0) {\n\t\t\t\t\ttile.classList.add(\"tile\");\n\t\t\t\t} else if (this.map[i][j] === 1) {\n\t\t\t\t\ttile.classList.add(\"tileW\");\n\t\t\t\t}\n\n\t\t\t\ttile.style.left = j * this.tileSize + \"px\";\n\t\t\t\ttile.style.top = i * this.tileSize + \"px\";\n\n\t\t\t\tmapContainer.appendChild(tile);\n\t\t\t}\n\t\t}\n\n\t\tthis.displayEntities([this.player], this.displayPlayer.bind(this));\n\t\tthis.displayEntities(this.enemies, this.displayEnemy.bind(this));\n\t\tthis.displayEntities(this.swords, this.displaySword.bind(this));\n\t\tthis.displayEntities(this.potions, this.displayPotion.bind(this));\n\n\t\tmapContainer.style.width = this.width * this.tileSize + \"px\";\n\t\tmapContainer.style.height = this.height * this.tileSize + \"px\";\n\t}\n\n\tdisplayEntities(entities, displayFunction) {\n\t\tentities.forEach(entity => {\n\t\t\tdisplayFunction(entity);\n\t\t});\n\t}\n\n\taddEntitiesToCollection(coordinates, collection, constructor) {\n\t\tcoordinates.forEach(({ x, y }, index) => {\n\t\t\tif (constructor) {\n\t\t\t\tcollection.push(new constructor(x, y, index, this));\n\t\t\t} else {\n\t\t\t\tcollection.push({ x, y, index });\n\t\t\t}\n\t\t});\n\t}\n\n\tcreateOrUpdateElement(id, className, x, y, tileSize, parentElement) {\n\t\tlet element = document.getElementById(id);\n\t\tif (!element) {\n\t\t\telement = document.createElement(\"div\");\n\t\t\telement.id = id;\n\t\t\tif (className === \"health\") {\n\t\t\t\telement.classList.add(className);\n\t\t\t} else {\n\t\t\t\telement.classList.add(\"tile\", className);\n\t\t\t\telement.style.left = x * tileSize + \"px\";\n\t\t\t\telement.style.top = y * tileSize + \"px\";\n\t\t\t}\n\t\t\tparentElement.appendChild(element);\n\t\t} else if (className !== \"health\") {\n\t\t\telement.style.left = x * tileSize + \"px\";\n\t\t\telement.style.top = y * tileSize + \"px\";\n\t\t}\n\n\t\treturn element;\n\t}\n\n\tdisplayPlayer(player) {\n\t\tconst mapContainer = document.querySelector(\".field\");\n\t\tlet playerElement = this.createOrUpdateElement(\n\t\t\t\"player\",\n\t\t\t\"tileP\",\n\t\t\tplayer.x,\n\t\t\tplayer.y,\n\t\t\tthis.tileSize,\n\t\t\tmapContainer\n\t\t);\n\t\tlet healthElement = this.createOrUpdateElement(\n\t\t\t\"playerHealth\",\n\t\t\t\"health\",\n\t\t\tplayer.x,\n\t\t\tplayer.y,\n\t\t\tthis.tileSize,\n\t\t\tplayerElement\n\t\t);\n\t\thealthElement.style.width = player.health / 2 + \"px\";\n\t}\n\n\tdisplayEnemy(enemy) {\n\t\tconst mapContainer = document.querySelector(\".field\");\n\t\tlet enemyElement = this.createOrUpdateElement(\n\t\t\t`enemy-${enemy.id}`,\n\t\t\t\"tileE\",\n\t\t\tenemy.x,\n\t\t\tenemy.y,\n\t\t\tthis.tileSize,\n\t\t\tmapContainer\n\t\t);\n\t\tlet healthElement = this.createOrUpdateElement(\n\t\t\t`enemyHealth-${enemy.id}`,\n\t\t\t\"health\",\n\t\t\tenemy.x,\n\t\t\tenemy.y,\n\t\t\tthis.tileSize,\n\t\t\tenemyElement\n\t\t);\n\t\thealthElement.style.width = enemy.health / 2 + \"px\";\n\t}\n\n\tdisplaySword(sword) {\n\t\tconst mapContainer = document.querySelector(\".field\");\n\t\tthis.createOrUpdateElement(\n\t\t\t`sword-${sword.index}`,\n\t\t\t\"tileSW\",\n\t\t\tsword.x,\n\t\t\tsword.y,\n\t\t\tthis.tileSize,\n\t\t\tmapContainer\n\t\t);\n\t}\n\n\tdisplayPotion(potion) {\n\t\tconst mapContainer = document.querySelector(\".field\");\n\t\tthis.createOrUpdateElement(\n\t\t\t`potion-${potion.index}`,\n\t\t\t\"tileHP\",\n\t\t\tpotion.x,\n\t\t\tpotion.y,\n\t\t\tthis.tileSize,\n\t\t\tmapContainer\n\t\t);\n\t}\n\n\tremoveEntity(id) {\n\t\tconst entity = document.getElementById(id);\n\t\tentity.remove();\n\t}\n\n\tpickEmptyTile() {\n\t\tconst randomIndex = Math.floor(Math.random() * this.emptyTiles.length);\n\t\tconst selectedTile = this.emptyTiles[randomIndex];\n\n\t\tthis.emptyTiles.splice(randomIndex, 1);\n\n\t\treturn selectedTile;\n\t}\n\n\tisTileEmpty(x, y) {\n\t\treturn this.map[y][x] === 0;\n\t}\n\n\tisTileItem(x, y) {\n\t\tconst isSword = this.swords.some(\n\t\t\tsword => sword.x === x && sword.y === y\n\t\t);\n\t\tconst isPotion = this.potions.some(\n\t\t\tpotion => potion.x === x && potion.y === y\n\t\t);\n\t\treturn isSword || isPotion;\n\t}\n\n\tplaceEntities(count) {\n\t\tconst entities = [];\n\n\t\tfor (let i = 0; i < count; i++) {\n\t\t\tconst { x, y } = this.pickEmptyTile();\n\t\t\tentities.push({ x, y });\n\t\t}\n\n\t\treturn entities;\n\t}\n}\n\n\n//# sourceURL=webpack:///./classes/Map.js?");

/***/ }),

/***/ "./classes/Player.js":
/*!***************************!*\
  !*** ./classes/Player.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\nclass Player {\n\tconstructor(x, y, game, map) {\n\t\tthis.x = x;\n\t\tthis.y = y;\n\t\tthis.health = 100;\n\t\tthis.attack = 20;\n\t\tthis.map = map;\n\t\tthis.game = game;\n\t\tthis.kills = 0;\n\t}\n\tmove(keyCode) {\n\t\tlet dx = 0;\n\t\tlet dy = 0;\n\n\t\tswitch (keyCode) {\n\t\t\tcase \"w\":\n\t\t\t\tdy = -1;\n\t\t\t\tbreak;\n\t\t\tcase \"s\":\n\t\t\t\tdy = 1;\n\t\t\t\tbreak;\n\t\t\tcase \"a\":\n\t\t\t\tdx = -1;\n\t\t\t\tbreak;\n\t\t\tcase \"d\":\n\t\t\t\tdx = 1;\n\t\t\t\tbreak;\n\t\t}\n\n\t\tconst newX = this.x + dx;\n\t\tconst newY = this.y + dy;\n\n\t\tif (this.map.isTileEmpty(newX, newY)) {\n\t\t\tthis.x = newX;\n\t\t\tthis.y = newY;\n\n\t\t\tfunction handleEntityInteractions(\n\t\t\t\tmap,\n\t\t\t\tentityArray,\n\t\t\t\tentityType,\n\t\t\t\tplayerX,\n\t\t\t\tplayerY,\n\t\t\t\tuseFunction\n\t\t\t) {\n\t\t\t\treturn entityArray.filter(entity => {\n\t\t\t\t\tif (playerX === entity.x && playerY === entity.y) {\n\t\t\t\t\t\tmap.removeEntity(`${entityType}-${entity.index}`);\n\t\t\t\t\t\tuseFunction();\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t\treturn true;\n\t\t\t\t});\n\t\t\t}\n\n\t\t\tthis.map.swords = handleEntityInteractions(\n\t\t\t\tthis.map,\n\t\t\t\tthis.map.swords,\n\t\t\t\t\"sword\",\n\t\t\t\tthis.x,\n\t\t\t\tthis.y,\n\t\t\t\tthis.useSword.bind(this)\n\t\t\t);\n\t\t\tthis.map.potions = handleEntityInteractions(\n\t\t\t\tthis.map,\n\t\t\t\tthis.map.potions,\n\t\t\t\t\"potion\",\n\t\t\t\tthis.x,\n\t\t\t\tthis.y,\n\t\t\t\tthis.usePotion.bind(this)\n\t\t\t);\n\n\t\t\tthis.map.enemies.forEach(enemy => {\n\t\t\t\tif (\n\t\t\t\t\tMath.abs(this.x - enemy.x) <= 1 &&\n\t\t\t\t\tMath.abs(this.y - enemy.y) <= 1\n\t\t\t\t) {\n\t\t\t\t\tthis.receiveDamage(enemy.attack);\n\t\t\t\t}\n\t\t\t});\n\n\t\t\tif (this.health > 0) {\n\t\t\t\tthis.map.displayPlayer(this);\n\t\t\t}\n\t\t}\n\t}\n\tattackNearbyEnemies() {\n\t\tthis.map.enemies.forEach((enemy, index) => {\n\t\t\tif (\n\t\t\t\tMath.abs(this.x - enemy.x) <= 1 &&\n\t\t\t\tMath.abs(this.y - enemy.y) <= 1\n\t\t\t) {\n\t\t\t\tenemy.health -= this.attack;\n\t\t\t\tthis.map.displayEnemy(enemy);\n\t\t\t\tif (enemy.health <= 0) {\n\t\t\t\t\tthis.map.enemies.splice(index, 1);\n\t\t\t\t\tthis.map.removeEntity(`enemy-${enemy.id}`);\n\t\t\t\t\tthis.kills++;\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t}\n\n\tuseSword() {\n\t\tthis.attack += 30;\n\t\tconst playerELement = document.querySelector(\".tileP\");\n\t\tconst timer = document.createElement(\"div\");\n\t\ttimer.classList.add(\"timer\");\n\t\tplayerELement.appendChild(timer);\n\n\t\tlet time = 10;\n\t\tconst interval = setInterval(() => {\n\t\t\ttimer.innerText = time;\n\t\t\tif (time <= 0) {\n\t\t\t\tclearInterval(interval);\n\t\t\t\ttimer.remove();\n\t\t\t\tthis.attack -= 30;\n\t\t\t}\n\t\t\ttime--;\n\t\t}, 1000);\n\t}\n\n\tusePotion() {\n\t\tthis.health += 20;\n\t\tif (this.health > 100) {\n\t\t\tthis.health = 100;\n\t\t}\n\t}\n\n\treceiveDamage(amount) {\n\t\tthis.health -= amount;\n\t\tif (this.health <= 0) {\n\t\t\tthis.die();\n\t\t}\n\t}\n\n\tdie() {\n\t\tthis.map.player = null;\n\t\tthis.map.removeEntity(\"player\");\n\t\tthis.game.gameOver(this.kills);\n\t}\n}\n\n\n//# sourceURL=webpack:///./classes/Player.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_Map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Map.js */ \"./classes/Map.js\");\n\n\nclass Game {\n\tinit() {\n\t\tthis.map = new _classes_Map_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\n\t\tthis.map.init();\n\t\tthis.player = this.map.player;\n\t\tthis.enemies = this.map.enemies;\n\t}\n\n\tgameOver(kills) {\n\t\tlet gameOverElement = document.createElement(\"div\");\n\t\tgameOverElement.classList.add(\"game-over\");\n\n\t\tlet button = document.createElement(\"button\");\n\t\tbutton.classList.add(\"restart-button\");\n\t\tbutton.innerText = \"Начать заново\";\n\t\tbutton.setAttribute(\"onclick\", \"onClickRestart()\");\n\n\t\tlet text = document.createElement(\"p\");\n\t\ttext.innerText = `Игра окончена! Вы убили ${kills} противников`;\n\n\t\tgameOverElement.appendChild(text);\n\t\tgameOverElement.appendChild(button);\n\n\t\tdocument.body.appendChild(gameOverElement);\n\t\tdocument.querySelector(\".overlay\").style.opacity = \"1\";\n\n\t\tgame.player = null;\n\t}\n}\n\nlet game;\n\nconst initGame = () => {\n\tgame = new Game();\n\tgame.init();\n};\n\ndocument.addEventListener(\"DOMContentLoaded\", initGame);\n\ndocument.addEventListener(\"keydown\", event => {\n\tif (game.player) {\n\t\tconst key = event.key.toLowerCase();\n\t\tif ([\"w\", \"a\", \"s\", \"d\"].includes(key)) {\n\t\t\tgame.player.move(key);\n\t\t}\n\t}\n});\n\ndocument.addEventListener(\"keydown\", event => {\n\tif (game.player) {\n\t\tif (event.code === \"Space\") {\n\t\t\tgame.player.attackNearbyEnemies();\n\t\t}\n\t}\n});\n\nsetInterval(() => {\n\tgame.enemies.forEach(enemy => {\n\t\tenemy.move();\n\t});\n}, 2000);\n\nwindow.onClickRestart = () => {\n\tconst gameOverElement = document.querySelector(\".game-over\");\n\tgameOverElement.remove();\n\tdocument.querySelector(\".overlay\").style.opacity = \"0\";\n\n\tinitGame();\n};\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;