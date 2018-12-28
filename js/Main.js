const canvas = document.getElementById('canvas');
const canvasContent = canvas.getContext('2d');

let tileGrid = [];
let snake = new Snake();


window.onload = function () {
  canvas.addEventListener('click', function () {
    if (snake.isGameOver) {
      snake.reset();
    }
  })
  resetTile();
  snake.reset();
  snake.initInput();
  window.requestAnimationFrame(loop);
}

function loop() {
  drawEverething();
  moveEverething();
  window.requestAnimationFrame(loop);
}


function drawEverething() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  drawTileMap();
  snake.draw();

  if (snake.isGameOver) {
    gameOverAndScore()
  }


}
function moveEverething() {
  snake.move();
}