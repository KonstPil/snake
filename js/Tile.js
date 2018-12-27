const TILE_SIZE = 40,
  TILE_ROWS = canvas.height / TILE_SIZE,
  TILE_COLLS = canvas.width / TILE_SIZE,
  TILE_GAP = 2;

function drawTileMap() {
  for (let col = 0; col < TILE_COLLS; col++) {
    for (let row = 0; row < TILE_ROWS; row++) {
      let brickLeftEdgeX = col * TILE_SIZE;
      let brickTopEdgeY = row * TILE_SIZE;
      colorRect(brickLeftEdgeX + TILE_GAP / 2, brickTopEdgeY + TILE_GAP / 2, TILE_SIZE - TILE_GAP,
        TILE_SIZE - TILE_GAP, 'gray');
    }

  }
}

function resetTile() {
  let tileCount = TILE_ROWS * TILE_COLLS
  for (let i = 0; i < tileCount; i++) {
    tileGrid[i] = 0;
  }
}

function brickTileToIndex(tileCol, tileRow) {
  return (tileCol + TILE_COLLS * tileRow)
}

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
  let brickIndex = brickTileToIndex(brickTileCol, brickTileRow)
  return (tileGrid[brickIndex] === 1)
}
