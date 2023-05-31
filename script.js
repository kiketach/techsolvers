/* INICIAMOS VARIABLES */
const roadarea = document.querySelector(".road");
let player = { step: 5 };
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};
let gameRunning = false;
let startButton = document.getElementById("startButton");
let resetButton = document.getElementById("resetButton");
let playerCar;

/* EVENTO QUE ESCUCHA EL BOTON PARA INICIAR EL JUEGO O REINICIARLO */
startButton.addEventListener("click", () => {
  if (gameRunning) {
    resetGame();
  } else {
    startGame();
  }
});
resetButton.addEventListener("click", () => {
  location.reload();
});

/* FUNCIONES PARA LAS KEYS */
function keyDown(event) {
  keys[event.key] = true;
}

function keyUp(event) {
  keys[event.key] = false;
}

/* FUNCION PARA LAS LINEAS BLANCAS DE LA PISTA */
function movelines() {
  let roadlines = document.querySelectorAll(".line");
  roadlines.forEach(function (item) {
    if (item.y >= 700) {
      item.y = item.y - 750;
    }
    item.y = item.y + player.step;
    item.style.top = item.y + "px";
  });
}

/* FUNCION PARA LAS COLISIONES DE LOS VEHICULOS */
function movevehicles() {
  let playerCarBounds = playerCar.getBoundingClientRect();
  let vehicles = document.querySelectorAll(".vehicle");

  vehicles.forEach(function (item) {
    let vehicleBounds = item.getBoundingClientRect();

    if (
      playerCarBounds.top < vehicleBounds.bottom &&
      playerCarBounds.bottom > vehicleBounds.top &&
      playerCarBounds.left < vehicleBounds.right &&
      playerCarBounds.right > vehicleBounds.left
    ) {
      stopGame();
      return;
    }

    if (item.offsetTop > 750) {
      item.style.top = -300 + "px";
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.style.top = item.offsetTop + player.step + "px";
  });
}

/* FUNCION PARA LA PISTA */
function playarea() {
  let road = roadarea.getBoundingClientRect();
  if (gameRunning) {
    movelines();
    movevehicles();
    if (keys.ArrowUp && player.y > road.top + 80) {
      player.y = player.y - player.step;
    }
    if (keys.ArrowDown && player.y < road.top + road.height - 80) {
      player.y = player.y + player.step;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x = player.x - player.step;
    }
    if (keys.ArrowRight && player.x < road.width - 64) {
      player.x = player.x + player.step;
    }
    playerCar.style.top = player.y + "px";
    playerCar.style.left = player.x + "px";
    if (gameRunning) {
      window.requestAnimationFrame(playarea);
    } else {
      console.log("Game over");
    }
  }
}

/* INICIAMOS EL JUEGO */
function startGame() {
  player.start = true;
  gameRunning = true;
  startButton.textContent = "Reiniciar juego";

  playerCar = document.createElement("div");
  playerCar.setAttribute("class", "car");
  roadarea.appendChild(playerCar);
  player.x = playerCar.offsetLeft;
  player.y = playerCar.offsetTop;

  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

  for (let x = 0; x < 5; x++) {
    let roadlines = document.createElement("div");
    roadlines.setAttribute("class", "line");
    roadlines.y = x * 150;
    roadlines.style.top = roadlines.y + "px";
    roadarea.appendChild(roadlines);
  }

  for (let x = 0; x < 4; x++) {
    let vehicle = document.createElement("div");
    vehicle.setAttribute("class", "vehicle");
    vehicle.style.top = (x + 1) * 300 * -1 + "px";
    vehicle.style.left = Math.floor(Math.random() * 350) + "px";
    roadarea.appendChild(vehicle);
  }

  playarea();
}

/* PARAMOS EL JUEGO */
function stopGame() {
  gameRunning = false;
  startButton.textContent = "Iniciar juego";

  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Perdiste! Eres Muy Mal Conductor. Intenta nuevamente :)",
  });
}

function resetGame() {
  roadarea.innerHTML = "";
  stopGame();
  init();
}

function init() {
  player.start = false;
  playerCar = null;
}

init();
