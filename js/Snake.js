const SNAKE_START_LENGTH = 3,
  SNAKE_START_SPEED = 0.5;

class Snake {
  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.x = this.col * TILE_SIZE;
    this.y = this.row * TILE_SIZE;
    this.length = SNAKE_START_LENGTH;
    this.upButtonHold = true;
    this.downButtonHold = false;
    this.leftButtonHold = false;
    this.rightButtonHold = false;

  }

  draw() {
    let topLeftX = this.col * TILE_SIZE + TILE_GAP / 2;
    let topLeftY = this.row * TILE_SIZE + TILE_GAP / 2;
    let boxWidth = TILE_SIZE - TILE_GAP;
    let boxHeight = TILE_SIZE - TILE_GAP;
    colorRect(topLeftX, topLeftY, boxWidth, boxHeight, 'yellow');
  }

  move() {
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
    if (this.col >= TILE_COLLS) {
      this.col = 0;
      this.x = 0;
    } else if (this.col < 0) {
      this.col = TILE_COLLS;
      this.x = canvas.width;
    } else if (this.row < 0) {
      this.row = TILE_ROWS;
      this.y = canvas.height;
    } else if (this.row >= TILE_ROWS) {
      this.row = 0;
      this.y = 0;
    }
  }




  initInput() {
    document.addEventListener('keydown', this.keyPressed.bind(this));
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


