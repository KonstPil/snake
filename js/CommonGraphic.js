function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContent.fillStyle = fillColor;
  canvasContent.fillRect(topLeftX, topLeftY, boxWidth, boxHeight)
}

function gameOverAndScore() {
  canvasContent.font = "50px Arial";
  canvasContent.fillStyle = "orange";
  canvasContent.fillText('Ты проиграл!', canvas.width / 2 - 200, canvas.height / 2 - 100);
  canvasContent.fillText('Длина твоей змейки: ' + snake.snakeArr.length, canvas.width / 2 - 200, canvas.height / 2 - 50);
  canvasContent.font = "26px Arial";
  canvasContent.fillText('Нажми чтобы начать сначала', canvas.width / 2 - 200, canvas.height / 2);
}