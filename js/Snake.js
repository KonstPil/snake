const SNAKE_START_LENGTH = 3,
  SNAKE_START_SPEED = 2;//лимит 20

class Snake {
  constructor() {
    this.col = 5;
    this.row = 5;
    this.x = this.col * TILE_SIZE;
    this.y = this.row * TILE_SIZE;
    this.length = SNAKE_START_LENGTH;
    this.speed = SNAKE_START_SPEED;
    this.snakeArr = [];
    this.upButtonHold = false;
    this.downButtonHold = false;
    this.leftButtonHold = false;
    this.rightButtonHold = true;
    //рандомное место
    this.randomOpenSpot;
    this.isRandomSpotFinded = false;
  }

  draw() {
    let boxWidth = TILE_SIZE - TILE_GAP;
    let boxHeight = TILE_SIZE - TILE_GAP;
    this.snakeArr.forEach(el => {
      let partOfSnake = this.indexToTile(el);
      let topLeftX = partOfSnake.col * TILE_SIZE + TILE_GAP / 2;
      let topLeftY = partOfSnake.row * TILE_SIZE + TILE_GAP / 2;
      colorRect(topLeftX, topLeftY, boxWidth, boxHeight, 'yellow');
    })

    this.randomSpotForSnakePart();
    let randomPartOfSnake = this.indexToTile(this.randomOpenSpot);
    let topLeftX = randomPartOfSnake.col * TILE_SIZE + TILE_GAP / 2;
    let topLeftY = randomPartOfSnake.row * TILE_SIZE + TILE_GAP / 2;
    colorRect(topLeftX, topLeftY, boxWidth, boxHeight, 'red');
  }


  randomSpotForSnakePart() {
    if (!this.isRandomSpotFinded) {
      let openspotsArr = [];
      for (let i = 0; i < tileGrid.length; i++) {
        if (tileGrid[i] === 0) {
          openspotsArr.push(i);
        }
      }
      let random = Math.floor(Math.random() * openspotsArr.length);
      this.randomOpenSpot = openspotsArr[random];
      this.isRandomSpotFinded = true;
    }
  }

  move() {
    this.prevCol = this.col;
    this.prevRow = this.row;
    if (this.upButtonHold) {
      this.y -= this.speed;
    } else if (this.downButtonHold) {
      this.y += this.speed;
    } else if (this.leftButtonHold) {
      this.x -= this.speed;
    } else if (this.rightButtonHold) {
      this.x += this.speed;
    }
    console.log(this.length, this.speed);


    this.findOutColAndRow();

    if (this.prevCol !== this.col || this.prevRow !== this.row) {
      this.tileToZeroAndOne();
    }


    if (this.x > canvas.width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = canvas.width;
    } else if (this.y > canvas.height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = canvas.height;
    }


  }

  findOutColAndRow() {
    this.col = Math.floor(this.x / TILE_SIZE);
    this.row = Math.floor(this.y / TILE_SIZE);
    if (this.col > 19) {
      this.col = 19
    } else if (this.col < 0) {
      this.col = 0
    }
    if (this.row > 14) {
      this.row = 14
    } else if (this.row < 0) {
      this.row = 0
    }

  }


  tileToZeroAndOne() {
    let tileIndex = this.col + TILE_COLLS * this.row;
    if (tileIndex === this.randomOpenSpot) {
      this.length++;
      tileGrid[tileIndex] = 1;
      this.isRandomSpotFinded = false;
      this.upSpeed()
    }
    if (this.length === 0) {
      let snailsTail = this.snakeArr.shift();
      tileGrid[snailsTail] = 0;
      this.length++;
    }
    if (this.length > 0) {
      this.snakeArr.push(tileIndex);
      tileGrid[tileIndex] = 1;
      this.length--;
    }
  }


  upSpeed() {
    let length = this.snakeArr.length;
    if (length === 5) {
      this.speed = 4;
    } else if (length === 10) {
      this.speed = 6;
    } else if (length === 15) {
      this.speed = 8;
    } else if (length === 25) {
      this.speed = 9;
    } else if (length === 45) {
      this.speed = 10;
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


