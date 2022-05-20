const grid = document.querySelector(".grid");
// console.log(grid);

class GameBoard {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.element = null;
    this.cells = this._createCells();
  }
  _createCells() {
    // iteration 1
    const size = this.width * this.height;
    const cells = [];
    for (let i = 0; i < size; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      cells.push(cell);
      grid.appendChild(cell);
    }
    return cells;
  }
}

const board = new GameBoard(10, 10);
// console.log(board.cells);

function fisherYatesShuffle(arr) {
  for (let i = arr.length; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = arr[j];
    arr[j] = arr[i - 1];
    arr[i - 1] = temp;
  }
}

function getRandomSelection(n, array) {
  const cloned = Array.from(array);
  fisherYatesShuffle(cloned);
  const selected = cloned.slice(0, n);
  return selected;
}

const inventory = {
  element: null,
  add() {
    // iteration 3
  },
  clear() {
    // iteration 3 (reset behaviour)
  },
};

class Collectible {
  constructor(className) {
    this.className = className;
    this.cell = null;
    this.isCollected = false;
  }
  hide() {
    // reset behaviour
  }
  collect() {
    // iteration 4
  }
  display() {
    // iteration 2

    if (this.cell) {
      this.cell.classList.add(this.className);
    }
  }
}
const collectibles = [
  "carte-vitale",
  "titre-de-sejour",
  "sim-card",
  "compte-bancaire",
  "apartment",
  "job",
].map((c) => new Collectible(c));

// console.log(distributeCollectibles());

// console.log(collectibles.cell);

function distributeCollectibles() {
  // iteration 2
  const selection = getRandomSelection(collectibles.length, board.cells);
  for (let i = 0; i < selection.length; i++) {
    collectibles[i].cell = selection[i];
    collectibles[i].display();
  }
}

// console.log(collectibles.cell);

function getRandomUnoccupiedCell() {
  // iteration 3
  let randIndex = Math.floor(Math.random() * board.cells.length);
  for (let i = 0; i < board.cells.length; i++) {
    for (let j = 0; j < collectibles.length; j++) {
      if (!board.cells[i].classList.contains(collectibles[j].className)) {
        return board.cells[randIndex];
      }
    }
  }
}

const player = {
  className: "player",
  cell: getRandomUnoccupiedCell(),
  show() {
    // iteration 3
    this.cell.classList.add(this.className);
  },
  hide() {
    // iteration 3
    this.cell.classList.remove(this.className);
  },
  move(direction) {
    // iteration 3
    let newIndex = +this.cell.dataset.index;
    if (direction === "down") {
      newIndex += 10;
    }
    if (direction === "up") {
      newIndex -= 10;
    }
    if (direction === "left") {
      newIndex -= 1;
    }
    if (direction === "right") {
      newIndex += 1;
    }
    this.hide();
    this.cell = board.cells[newIndex];
    console.log(this.cell);
    this.show();
  },
  canMove(direction) {
    // hint for iteration 3: make move behaviour conditional
    // if (+this.cell.dataset.index > 10){
    //   canMove direction;
    // }
  },
  _detectCollisions() {
    // iteration 4
    // how do we detect collisions with items
    // when do we call this?
  },
};

const game = {
  isStarted: false,
  isWon: false,
  isLost: false,
  // iteration 5
  winAudio: null,
  win() {
    // iteration 4
  },
  start() {
    // iteration 2
    game.isStarted = true;
    // distribute the items
    distributeCollectibles();
    // iteration 3
    // show the player
    player.show();
    // iteration 4
    // reset the inventory
    // iteration 5
    // reset the music
  },
};

const startButton = document.querySelector("button#start");
startButton.addEventListener("click", () => {
  // iteration 2
  // start the game
  if (!game.isStarted) {
    game.start();
  }
});

document.addEventListener("keydown", (event) => {
  if (!game.isStarted) {
    return;
  }

  switch (event.code) {
    case "ArrowUp":
      player.move("up");
      break;
    case "ArrowDown":
      player.move("down");
      break;
    case "ArrowLeft":
      player.move("left");
      break;
    case "ArrowRight":
      player.move("right");
      break;
  }
});
