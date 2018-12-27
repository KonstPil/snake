const SNAKE_START_LENGTH = 3,
  SNAKE_START_SPEED = 10;

class Snake {
  constructor() {
    this.col = 5;
    this.row = 5;
    this.x = this.col * TILE_SIZE;
    this.y = this.row * TILE_SIZE;
    this.length = SNAKE_START_LENGTH;
    this.snakeArr = [];
    this.upButtonHold = false;
    this.downButtonHold = false;
    this.leftButtonHold = false;
    this.rightButtonHold = true;

  }

  draw() {
    this.snakeArr.forEach(el => {
      let partOfSnake = this.indexToTile(el);
      let topLeftX = partOfSnake.col * TILE_SIZE + TILE_GAP / 2;
      let topLeftY = partOfSnake.row * TILE_SIZE + TILE_GAP / 2;
      let boxWidth = TILE_SIZE - TILE_GAP;
      let boxHeight = TILE_SIZE - TILE_GAP;
      colorRect(topLeftX, topLeftY, boxWidth, boxHeight, 'yellow');
    })

  }

  move() {
    this.prevCol = this.col;
    this.prevRow = this.row;
    if (this.upButtonHold) {
      this.y -= SNAKE_START_SPEED;
    } else if (this.downButtonHold) {
      this.y += SNAKE_START_SPEED;
    } else if (this.leftButtonHold) {
      this.x -= SNAKE_START_SPEED;
    } else if (this.rightButtonHold) {
      this.x += SNAKE_START_SPEED;
    }
    // console.log((this.y / TILE_SIZE), (this.y % TILE_SIZE));



    this.col = Math.floor(this.x / TILE_SIZE);
    this.row = Math.floor(this.y / TILE_SIZE);

    if (this.prevCol !== this.col || this.prevRow !== this.row) {
      this.tileToZeroAndOne();
    }

    if (this.x >= canvas.width - TILE_SIZE / 2) {
      this.x = 0;
    } else if (this.x <= 0) {
      this.x = canvas.width - TILE_SIZE / 2;
    } else if (this.y <= 0) {
      this.y = canvas.height - TILE_SIZE / 2;
    } else if (this.y >= canvas.height - TILE_SIZE / 2) {
      this.y = 0;
    }

  }

  tileToZeroAndOne() {
    if (this.length === 0) {
      let snailsTail = this.snakeArr.shift();
      tileGrid[snailsTail] = 0;
      this.length++;
    }
    if (this.length > 0) {
      let tileIndex = this.col + TILE_COLLS * this.row;
      this.snakeArr.push(tileIndex);
      tileGrid[tileIndex] = 1;
      this.length--;
    }
  }


  initInput() {
    document.addEventListener('keydown', this.keyPressed.bind(this));
  }

  reset() {
    let tileIndex = this.col + TILE_COLLS * this.row;
    let tail = tileIndex - this.length + 1;
    for (let i = tail; i <= tileIndex; i++) {
      this.snakeArr.push(i);
      tileGrid[i] = 1;
    }
    this.length = 0;
  }

  indexToTile(index) {
    let col = index % TILE_COLLS;
    let row = Math.floor(index / TILE_COLLS);
    return {
      col, row
    }

  }


  whichButtonHold(e) {
    switch (e.keyCode) {
      case 87:
        this.upButtonHold = true;
        break
      case 83:
        this.downButtonHold = true;
        break
      case 65:
        this.leftButtonHold = true;
        break;
      case 68:
        this.rightButtonHold = true;
        break;
    }
  }

  keyPressed(e) {
    e.preventDefault();
    this.eachFalse();
    this.whichButtonHold(e)
  }

  // keyReleased(e) {
  //   e.preventDefault();
  //   this.isButtonHold = false;
  // }

  eachFalse() {
    this.upButtonHold = false;
    this.downButtonHold = false;
    this.leftButtonHold = false;
    this.rightButtonHold = false;
  }
}


