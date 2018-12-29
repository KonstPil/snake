const SNAKE_START_LENGTH = 3,
  SNAKE_START_SPEED = 3;
START_X = 5,
  START_Y = 5;

let pickPart = new Howl({ src: ['sound/Blip_Select.ogg', 'sound/Blip_Select.mp3'] });
let hitMyself = new Howl({ src: ['sound/Explosion.ogg', 'sound/Explosion.mp3'] });



class Snake {
  constructor() {
    this.col = START_X;
    this.row = START_Y;
    this.x = this.col * TILE_SIZE;
    this.y = this.row * TILE_SIZE;
    this.length = SNAKE_START_LENGTH;
    this.speed = SNAKE_START_SPEED;
    this.snakeArr = [];
    this.upButtonHold = false;
    this.downButtonHold = false;
    this.leftButtonHold = false;
    this.rightButtonHold = true;
    this.isXDirectionOpen = false;
    this.isYDirectionOpen = true;
    this.isGameOver = false;
    this.canITurn = false;//чтобы при быстром нажатии не врезаться в самого себя
    //рандомное место
    this.randomOpenSpot;
    this.isRandomSpotFinded = false;
  }

  draw() {
    this.snakeArr.forEach(el => {
      this.drawOneTile(el, 'yellow')
    })
    this.randomSpotForSnakePart();
    this.drawOneTile(this.randomOpenSpot, 'red');
  }


  drawOneTile(spotIndex, color) {
    let tile = this.indexToTile(spotIndex);
    let boxWidth = TILE_SIZE - TILE_GAP;
    let boxHeight = TILE_SIZE - TILE_GAP;
    let topLeftX = tile.col * TILE_SIZE + TILE_GAP / 2;
    let topLeftY = tile.row * TILE_SIZE + TILE_GAP / 2;
    colorRect(topLeftX, topLeftY, boxWidth, boxHeight, color);
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
      console.log(random);

      this.randomOpenSpot = openspotsArr[random];
      this.isRandomSpotFinded = true;
    }
  }

  move() {
    this.prevCol = this.col;
    this.prevRow = this.row;
    if (!this.isGameOver) {
      if (this.upButtonHold) {
        this.y -= this.speed;
      } else if (this.downButtonHold) {
        this.y += this.speed;
      } else if (this.leftButtonHold) {
        this.x -= this.speed;
      } else if (this.rightButtonHold) {
        this.x += this.speed;
      }
    }


    this.findOutColAndRow();
    if (this.prevCol !== this.col || this.prevRow !== this.row) {
      this.canITurn = true;
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
    if (this.col >= TILE_COLLS) {
      this.col = TILE_COLLS - 1;
    } else if (this.col < 0) {
      this.col = 0
    }
    if (this.row >= TILE_ROWS) {
      this.row = TILE_ROWS - 1;
    } else if (this.row < 0) {
      this.row = 0
    }

  }


  tileToZeroAndOne() {
    let tileIndex = this.findOutCurrentIndex();
    // console.log(tileIndex, this.snakeArr);
    // if (this.snakeArr.indexOf(tileIndex) !== -1) {
    //   this.isGameOver = true;
    // }

    if (tileIndex === this.randomOpenSpot) {
      this.length++;
      tileGrid[tileIndex] = 1;
      this.isRandomSpotFinded = false;
      pickPart.play();
      this.upSpeed()
    }
    if (this.length === 0) {
      let snailsTail = this.snakeArr.shift();
      //проверяем game over когда у нас нет хваотса т.е когда сдвигается голова, сдвигается всё 
      if (this.snakeArr.indexOf(tileIndex) !== -1) {
        this.isGameOver = true;
        hitMyself.play();
      }
      tileGrid[snailsTail] = 0;
      this.length++;
    }
    if (this.length > 0) {
      this.snakeArr.push(tileIndex);
      tileGrid[tileIndex] = 1;
      this.length--;
    }
    console.log(this.snakeArr);

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
    this.col = START_X;
    this.row = START_Y;
    this.x = this.col * TILE_SIZE;
    this.y = this.row * TILE_SIZE;
    this.length = SNAKE_START_LENGTH;
    this.speed = SNAKE_START_SPEED;
    this.snakeArr = [];
    this.upButtonHold = false;
    this.downButtonHold = false;
    this.leftButtonHold = false;
    this.rightButtonHold = true;
    this.isXDirectionOpen = false;
    this.isYDirectionOpen = true;
    this.isGameOver = false;
    this.canITurn = false;
    this.randomOpenSpot = 0;
    this.isRandomSpotFinded = false;
    ///
    let tileIndex = this.findOutCurrentIndex();
    let tail = tileIndex - this.length + 1;

    for (let i = tail; i <= tileIndex; i++) {
      console.log(this.length, this.snakeArr);
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

  findOutCurrentIndex() {
    return (this.col + TILE_COLLS * this.row)
  }

  whichDirectionYouCanGo(e) {
    if (e.keyCode === 87 && this.isYDirectionOpen && this.canITurn) {
      this.eachFalse();
      this.canITurn = false;
      this.upButtonHold = true;
      this.isYDirectionOpen = false;
      this.isXDirectionOpen = true;
    }
    if (e.keyCode === 83 && this.isYDirectionOpen && this.canITurn) {
      this.eachFalse();
      this.canITurn = false;
      this.downButtonHold = true;
      this.isYDirectionOpen = false;
      this.isXDirectionOpen = true;
    }
    if (e.keyCode === 65 && this.isXDirectionOpen && this.canITurn) {
      this.eachFalse();
      this.canITurn = false;
      this.leftButtonHold = true;
      this.isXDirectionOpen = false;
      this.isYDirectionOpen = true;
    }
    if (e.keyCode === 68 && this.isXDirectionOpen && this.canITurn) {
      this.eachFalse();
      this.canITurn = false;
      this.rightButtonHold = true;
      this.isXDirectionOpen = false;
      this.isYDirectionOpen = true;
    }

  }

  keyPressed(e) {
    e.preventDefault();
    this.whichDirectionYouCanGo(e)
  }


  eachFalse() {
    this.upButtonHold = false;
    this.downButtonHold = false;
    this.leftButtonHold = false;
    this.rightButtonHold = false;
  }
}


