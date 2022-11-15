// Constants
const btn = document.querySelector(".btn"),
  reBtn = document.querySelector(".restart_btn"),
  introScreen = document.querySelector(".intro"),
  screen = document.querySelector(".game"),
  gameScreen = document.querySelector("#game_area"),
  gameOn = new Audio("music/start-game.mp3"),
  gameOver = new Audio("music/game-over,mp3"),
  scoreEle = document.querySelector(".score"),
  bSize = 25; //Div in each row and coloumn

// Variables
const control = {
  left: "ArrowLeft",
  right: "ArrowRight",
  up: "ArrowUp",
  down: "ArrowDown",
};

const snakeColor = {
  snakeHead: "#072152",
  snakeBody: "#fbb325",
  cvsColor: "#c9e16d",
  foodColor: "#d44293",
};
let snake = [
  { x: 15, y: 1 },
  { x: 14, y: 1 },
  { x: 13, y: 1 },
];

let score = 0,
  initialPosition = { x: 0, y: 0 },
  food = { x: 6, y: 10 };

// Enter game screeen ...
btn.addEventListener("click", displayGameScreen);

function displayGameScreen() {
  gameOn.play();
  screen.classList.add("active");
  introScreen.classList.add("active");
  gameLoop = setInterval(startGame, f);
}

reBtn.addEventListener("click", reStartGame);

// Back to home screen
function reStartGame() {
  screen.classList.remove("active");
  introScreen.classList.remove("active");
}

let f = 1000 / 15,
  gameLoop;

const startGame = () => {
  if (snake[0].y === food.y && snake[0].x === food.x) {
    score += 1;
    scoreEle.innerHTML = score;
    snake.unshift({
      x: snake[0].x + initialPosition.x,
      y: snake[0].y + initialPosition.y,
    });

    food = {
      x: Math.round(Math.random() * bSize - 3),
      y: Math.round(Math.random() * bSize - 3),
    };
  }

  // Moving the snake

  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] };
  }

  snake[0].x += initialPosition.x;
  snake[0].y += initialPosition.y;

  // Draw snake to display
  gameScreen.innerHTML = "";
  snake.forEach((e, index) => {
    snakeBody = document.createElement("div");
    snakeBody.style.gridRowStart = e.y;
    snakeBody.style.gridColumnStart = e.x;
    snakeBody.classList.add("snake_body");
    snakeBody.style.border = `1px solid ${snakeColor.cvsColor}`;
    snakeBody.style.borderRadius = "7px";

    index === 0
      ? (snakeBody.style.backgroundColor = snakeColor.snakeHead)
      : (snakeBody.style.backgroundColor = snakeColor.snakeBody);

    let n = snake.length - 1;

    if (index === n) {
      snakeBody.classList.add("tail");
    }
    gameScreen.appendChild(snakeBody);
  });

  // Draw food
  apple = document.createElement("div");
  apple.style.gridRowStart = food.y;
  apple.style.gridColumnStart = food.x;
  apple.style.height = "20px";
  apple.style.width = "20px";
  apple.classList.add("food");
  apple.style.backgroundColor = snakeColor.foodColor;
  apple.style.borderRadius = "50%";
  gameScreen.appendChild(apple);

  const head = snake[0];

  if (head.y < 0 || head.y >= bSize || head.x < 0 || head.x >= bSize) {
    clearInterval(gameLoop);
    gameOver.play();
    alert("you hit something. please click replay to restart the game");
  }
};

// Controls

window.addEventListener("keydown", (e) => {
  initialPosition = { x: 0, y: 1 };
  switch (e.key) {
    case control.up:
      console.log(control.up);
      initialPosition.x = 0;
      initialPosition.y = -1;
      break;

    case control.down:
      console.log(control.down);
      initialPosition.x = 0;
      initialPosition.y = 1;
      break;

    case control.left:
      console.log(control.left);
      initialPosition.x = -1;
      initialPosition.y = 0;
      break;

    case control.right:
      console.log(control.right);
      initialPosition.x = 1;
      initialPosition.y = 0;
      break;
    default:
      break;
  }
});
