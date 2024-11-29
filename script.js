const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton"); // botón de "Finalizar Juego"
const pauseButton = document.getElementById("pauseButton");
const cellSize = 20; //Modifica el tamaño de los objetos(casillas)
const snake = [{ x: 5, y: 5 }];
//arreglo vacio
const enemies = [];
let food = { x: 10, y: 10 };
let direction = "right";
// Variable para mantener la dirección actual
let currentDirection = "right";
let score = 0; // Inicializa el marcador en 0
// Variable para las vidas del jugador
let lives = 3;
let gameOver = false;
// Variable para controlar el estado de la animación
let isAnimating = false;
//Variable para boton de pausa
let isPaused = false;
let isGameStopped = false;
let gameInterval = null; // Declara variable gameInterval 
//variables para los niveles
let currentLevel = 1;
let foodsEaten = 0;

var img = new Image();
img.src = "cuadros.png"; // Ruta de la imagen del escenario
var escena = 0;
var M = [
    [[2, 15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44],
    [2, 15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44],
    [15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24],
    [15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24],
    [2, 15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44],
    [2, 15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44],
    [15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24],
    [15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24],
    [2, 15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44],
    [2, 15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44],
    [15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24],
    [15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24],
    [2, 15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44],
    [2, 15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44],
    [15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24],
    [15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24],
    [2, 15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44],
    [2, 15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44],
    [15, 44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24]],
    //INICIA SEGUNDO ESCENARIO
    [[41, 41, 74, 74, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75],
    [41, 41, 74, 74, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75],
    [74, 74, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41],
    [74, 74, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41],
    [41, 41, 74, 74, 41, 41, 74, 74, 41, 41, 74, 74, 41, 41, 75, 75, 41, 41, 75],
    [41, 41, 74, 74, 41, 41, 74, 74, 41, 41, 74, 74, 41, 41, 75, 75, 41, 41, 75],
    [74, 74, 41, 41, 74, 74, 41, 41, 74, 74, 41, 41, 75, 74, 41, 41, 74, 75, 41],
    [74, 74, 41, 41, 74, 74, 41, 41, 74, 74, 41, 41, 75, 74, 41, 41, 74, 75, 41],
    [41, 41, 74, 74, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75],
    [41, 41, 74, 74, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75],
    [74, 74, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41],
    [74, 74, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41],
    [41, 41, 74, 74, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75],
    [41, 41, 74, 74, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75],
    [74, 74, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41],
    [74, 74, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41],
    [41, 41, 74, 74, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75],
    [41, 41, 74, 74, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75],
    [74, 74, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41, 41, 75, 75, 41]],
    //INICIA ILTIMU ESCENARIO
    [[44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 14, 44],
    [14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 14, 44, 24],
    [44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 24, 44, 24, 44, 24, 44],
    [24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 24, 44, 24, 44, 24],
    [44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 14, 44],
    [14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 14, 44, 24],
    [44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 24, 44, 24, 44, 24, 44],
    [24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 24, 44, 24, 44, 24],
    [44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 14, 44],
    [14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 14, 44, 24],
    [44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 24, 44, 24, 44, 24, 44],
    [24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 24, 44, 24, 44, 24],
    [44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 14, 44],
    [14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 14, 44, 24],
    [44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 24, 44, 24, 44, 24, 44],
    [24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 24, 44, 24, 44, 24],
    [44, 14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 14, 44],
    [14, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 14, 44, 24],
    [44, 24, 44, 24, 44, 24, 44, 24, 44, 24, 44, 14, 44, 24, 44, 24, 44, 24, 44]]]

//Funcion encargada de dibujar el escenario
dibujaEscenario();
function dibujaEscenario() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < 19; j++) {
        for (let i = 0; i < 19; i++) {
            if (M[escena][j][i] != -1) {
                ctx.drawImage(img,
                    (M[escena][j][i] % 10) * 32, Math.floor((M[escena][j][i] / 10)) * 32,
                    32, 32,
                    i * 32, j * 32,
                    32, 32);//(en donde empieza, ancho y alto, a donde, ancho y alto)
            }
        }
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Detener el intervalo del juego si existe
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }

    // Restablece todas las variables del juego
    gameOver = false;
    score = 0;
    currentLevel = 1;
    lives = 3;
    direction = "right";
    snake.length = 1;
    snake[0] = { x: 5, y: 5 };
    generateFood();
    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = lives;
    document.getElementById("lives").style.color = "white";
    ocultarMensaje();
    clearCanvas(); // Limpia el cuadro de juego
    startButton.disabled = false; // Habilita el botón de iniciar juego
}


// Función para mostrar mensaje en pantalla
function mostrarMensaje(mensaje) {
    const gameMessage = document.getElementById("game-message");
    gameMessage.textContent = mensaje;
    gameMessage.style.display = "block";
}

// Función para ocultar el mensaje
function ocultarMensaje() {
    const gameMessage = document.getElementById("game-message");
    gameMessage.style.display = "none";
    gameMessage.textContent = ""; // Limpia el contenido del mensaje
}

// Función para limpiar el cuadro de dibujo
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Función para finalizar el juego
function stopGame() {
    if (!gameOver) {
        gameOver = true;
        clearInterval(gameInterval);
        clearCanvas(); // Limpia el cuadro de dibujo
        mostrarMensaje("Juego Finalizado. Puntaje: " + score);
        startButton.disabled = false; // Habilita el botón de iniciar juego
        dibujaEscenario();
        setTimeout(function () {
            reiniciarJuego();
            ocultarMensaje();
        }, 3000);
    }
}

// Agregar un evento al botón de "Finalizar Juego"
stopButton.addEventListener("click", stopGame);

// Función para incrementar el puntaje con un efecto de parpadeo
function increaseScore(increment) {
    if (!isAnimating) {
        isAnimating = true;
        score += increment;
        foodsEaten++; // Incrementa el contador de alimentos comidos
        const currentLevelConfig = levels[currentLevel - 1];
        if (foodsEaten >= currentLevelConfig.foodsToNextLevel) {
            advanceToNextLevel(); // Llama a la función para avanzar al siguiente nivel
        }
        const scoreElement = document.getElementById("score");
        scoreElement.textContent = score;
        scoreElement.style.color = "#07fb07";
        setTimeout(() => {
            scoreElement.style.color = "white";
            isAnimating = false;
        }, 500);

        // Habilitar o deshabilitar los botones de pausa y finalizar según las características del nivel actual
        pauseButton.disabled = !levels[currentLevel - 1].pauseButtonEnabled;
        stopButton.disabled = !levels[currentLevel - 1].stopButtonEnabled;
    }
}

// Función para mover la serpiente
function moveSnake() {
    if (!isPaused) { //verificamos si no esta pausado
        const head = { ...snake[0] }; //crea copia del objeto (head) para modificar posicion de head 
        switch (direction) { //determinar en que direccion se movera
            //uso coordenadas x y de la copia head
            case "up":
                head.y--;
                break;
            case "down":
                head.y++;
                break;
            case "left":
                head.x--;
                break;
            case "right":
                head.x++;
                break;
        }
        snake.unshift(head); //se actualizado pos de head, agrega copia de head al inicio de snake[0]. Esto simula que la serpiente se ha movido un paso en la dirección determinada.
        if (head.x === food.x && head.y === food.y) { //verifica si la cabeza a alcanzado la posicion de la comida(a comido)
            generateFood(); //se genera nueva comida en una nueva posicion
            increaseScore(10); //aumentamos score
        } else {
            snake.pop(); //no alcanzo la comida (ultimo segmento se elimina(pop))
        }
    }
}

// Función para generar la comida
function generateFood() { //nueva ubicacion de la comida
    //Math.floor redondea valor hacia abajo al número entero más cercano. Esto asegura que la posición de la comida esté alineada con la cuadrícula.
    //Math.random genera un número decimal aleatorio entre 0 y 1
    food.x = Math.floor(Math.random() * (canvas.width / cellSize)); //Esta línea calcula una nueva posición en el eje X para la comida
    food.y = Math.floor(Math.random() * (canvas.height / cellSize));
}

function generateRandomEnemy() {
    let enemyX, enemyY;
    do {
        enemyX = Math.floor(Math.random() * (canvas.width / cellSize));
        enemyY = Math.floor(Math.random() * (canvas.height / cellSize));
    } while (isCollisionWithSnakeOrFood(enemyX, enemyY));
    enemies.push({ x: enemyX, y: enemyY });
}

// Evento para presionar teclas de flechas
function handleKeyPress(event) {
    switch (event.key) {
        case "ArrowUp":
            if (direction !== "down") direction = "up";
            break;
        case "ArrowDown":
            if (direction !== "up") direction = "down";
            break;
        case "ArrowLeft":
            if (direction !== "right") direction = "left";
            break;
        case "ArrowRight":
            if (direction !== "left") direction = "right";
            break;
    }
}

//funcion dibuja pantalla para el juego
function drawBoard() {
    //color de fondo
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    dibujaEscenario();
    // Determinar qué imagen de la cabeza usar según la dirección actual
    let headImage;
    switch (direction) {
        case "up":
            headImage = "head-up.png";
            break;
        case "down":
            headImage = "head-down.png";
            break;
        case "left":
            headImage = "head-left.png";
            break;
        case "right":
            headImage = "head-right.png";
            break;
        default:
            headImage = "head-up.png"; // Imagen predeterminada para arriba
    }
    // Cargar la imagen de la cabeza de la serpiente
    const image = new Image();
    image.src = headImage;
    // Cargar la imagen del cuerpo de la serpiente
    const bodyImage = new Image();
    bodyImage.src = "cuerpoo.png";
    // Dibujar la imagen de la cabeza de la serpiente
    const headWidth = cellSize * 1.5; // Ancho de la cabeza
    const headHeight = cellSize * 1.5; // Alto de la cabeza
    //dibuja cabez de la serpiente en lienzo canvas
    ctx.drawImage(image, snake[0].x * cellSize - (headWidth - cellSize) / 2, snake[0].y * cellSize - (headHeight - cellSize) / 2, headWidth, headHeight);
    // Dibujar el resto del cuerpo de la serpiente
    for (let i = 1; i < snake.length; i++) {
        ctx.drawImage(bodyImage, snake[i].x * cellSize, snake[i].y * cellSize, cellSize, cellSize);
    }
    const ratonImage = new Image();
    // Cambia el valor de la variable para ajustar el tamaño del ratón
    const ratonSize = cellSize * 2;
    ratonImage.src = "food.png"; //Imagen del ratón
    ctx.drawImage(ratonImage, food.x * cellSize - (ratonSize - cellSize) / 2, food.y * cellSize - (ratonSize - cellSize) / 2, ratonSize, ratonSize);
    const enemyImage = new Image();
    const enemySize = cellSize * 1.5;
    enemyImage.src = "enemy.png"; // Reemplaza "enemy.png" con la ruta correcta a la imagen de tu enemigo
    for (const enemy of enemies) {
        ctx.drawImage(enemyImage, enemy.x * cellSize - (enemySize - cellSize) / 2, enemy.y * cellSize - (enemySize - cellSize) / 2, enemySize, enemySize);
    }
    // Actualiza el marcador en la pantalla
    document.getElementById("score").textContent = score;
}

//verifica si una posición está ocupada por la serpiente o la comida
function isCollisionWithSnakeOrFood(x, y) {
    for (const segment of snake) {
        if (segment.x === x && segment.y === y) {
            return true;
        }
    }
    if (x === food.x && y === food.y) {
        return true;
    }
    for (const enemy of enemies) {
        if (enemy.x === x && enemy.y === y) {
            return true;
        }
    }
    return false;
}

// Función para verificar colisiones
function checkCollisions() {
    const head = snake[0];
    //verifica la coordenada de la cabeza < 0 cruzo borde izq,. >= ancho de area de juego entre cuadricula cellSize cruzo borde der
    //head.y < 0: coordenada < 0. Si es cierto,la cabeza ha cruzado el borde superior del área de juego.
    //head.y >= canvas.height / cellSize: coordenada de cabeza de la serpiente >= altura de drawboard dividida por gridZise significa la cabeza cruzo borde inferior.
    if (head.x < 0 || head.x >= canvas.width / cellSize || head.y < 0 || head.y >= canvas.height / cellSize) {
        if (!gameOver) { //verifica si el juego a terminado
            lives--; // Reducir vidas
            document.getElementById("lives").textContent = lives;
            document.getElementById("lives").style.color = "red";

            if (lives <= 0) { //si ya no hay vidas
                gameOver = true;
                mostrarMensaje("Game Over. Puntaje: " + score);
                clearInterval(gameInterval);
                clearCanvas();
                startButton.disabled = false;
                setTimeout(function () {
                    reiniciarJuego();
                    ocultarMensaje();
                }, 3000);
                return;
            } else {
                // Reubicar la serpiente en el centro
                snake[0] = { x: Math.floor(canvas.width / cellSize / 2), y: Math.floor(canvas.height / cellSize / 2) };
                return; // Detener la función para evitar colisiones adicionales
            }
        }
    }

    for (const enemy of enemies) {
        if (head.x === enemy.x && head.y === enemy.y) {
            lives--;
            document.getElementById("lives").textContent = lives;
            document.getElementById("lives").style.color = "red";
            if (lives <= 0) {
                gameOver = true;
                mostrarMensaje("Game Over. Puntaje: " + score);
                clearInterval(gameInterval);
                clearCanvas();
                startButton.disabled = false;
                setTimeout(function () {
                    reiniciarJuego();
                    ocultarMensaje();
                }, 3000);
                return;
            } else {
                enemies.splice(enemies.indexOf(enemy), 1); // Elimina el enemigo
                return;
            }
        }
    }
    // Verificar colisión con el cuerpo de la serpiente
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            lives--; // Reducir vidas
            document.getElementById("lives").textContent = lives;
            document.getElementById("lives").style.color = "red";

            if (lives <= 0) {
                gameOver = true;
                mostrarMensaje("Game Over. Puntaje: " + score);
                clearInterval(gameInterval);
                clearCanvas();
                startButton.disabled = false;
                setTimeout(function () {
                    reiniciarJuego();
                    ocultarMensaje();
                }, 3000);
                return;
            } else {
                // Reubicar la serpiente en el centro
                snake[0] = { x: Math.floor(canvas.width / cellSize / 2), y: Math.floor(canvas.height / cellSize / 2) };
                return; // Detener la función para evitar colisiones adicionales
            }
        }
    }
}

// Agregar evento al botón de "Pausar Juego"
pauseButton.addEventListener("click", () => {
    if (!gameOver) {
        if (isPaused) {
            isPaused = false;
            pauseButton.textContent = "Pausar Juego";
        } else {
            isPaused = true;
            pauseButton.textContent = "Reanudar Juego";
        }
    }
});

// Agregar evento al botón de "Finalizar Juego"
stopButton.addEventListener("click", () => {
    if (!gameOver) {
        gameOver = true;
        mostrarMensaje("Juego Finalizado. Puntaje: " + score);
        clearInterval(gameInterval); // Detiene el intervalo del juego
        // Otras acciones que quieras realizar al finalizar el juego
    }
});

function startGame() {
    is_escena();
    dibujaEscenario();
    if (!gameInterval) {
        startButton.disabled = true;
        // Configuración del nivel actual
        const currentLevelConfig = levels[currentLevel - 1];
        gameInterval = setInterval(() => {
            if (!isPaused) {
                moveSnake();
                checkCollisions();
                drawBoard();
            }
            if (enemies.length < 3) {
                generateRandomEnemy();
            }
        }, currentLevelConfig.speed); // Velocidad del nivel actual

        generateFood();
    }
}

function is_escena() {
    if (currentLevel >= 1 && currentLevel <= 4) {
        escena = 0;
    }
    if (currentLevel >= 4 && currentLevel <= 8) {
        escena = 1;
    }
    if (currentLevel >= 8 && currentLevel <= 10) {
        escena = 2;
    }
}

//Arreglo de niveles
const levels = [
    { speed: 150, foodsToNextLevel: 2, pauseButtonEnabled: true, stopButtonEnabled: true },
    { speed: 150, foodsToNextLevel: 2, pauseButtonEnabled: true, stopButtonEnabled: true },
    { speed: 150, foodsToNextLevel: 2, pauseButtonEnabled: true, stopButtonEnabled: true },
    { speed: 150, foodsToNextLevel: 2, pauseButtonEnabled: true, stopButtonEnabled: true },
    { speed: 150, foodsToNextLevel: 2, pauseButtonEnabled: true, stopButtonEnabled: true },
    { speed: 150, foodsToNextLevel: 2, pauseButtonEnabled: true, stopButtonEnabled: true },
    { speed: 150, foodsToNextLevel: 2, pauseButtonEnabled: true, stopButtonEnabled: true },
    { speed: 150, foodsToNextLevel: 2, pauseButtonEnabled: true, stopButtonEnabled: true },
    { speed: 150, foodsToNextLevel: 2, pauseButtonEnabled: true, stopButtonEnabled: true },
    { speed: 150, foodsToNextLevel: Infinity, pauseButtonEnabled: true, stopButtonEnabled: true },
];

function advanceToNextLevel() {
    if (currentLevel < levels.length) {
        currentLevel++;
        foodsEaten = 0;
        isPaused = false;
        isGameStopped = false;
        mostrarMensaje(`¡Felicidades! Has avanzado al nivel ${currentLevel}`);
        setTimeout(() => {
            ocultarMensaje(); // Oculta el mensaje después de medio segundo
            startGame(); // Inicia el siguiente nivel
        }, 1000); // 500 milisegundos (medio segundo)
        // Actualiza la velocidad del juego según el nuevo nivel
        const currentLevelConfig = levels[currentLevel - 1];
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            if (!isPaused) {
                moveSnake();
                checkCollisions();
                drawBoard();
            }
            if (enemies.length < 3) {
                generateRandomEnemy();
            }
        }, currentLevelConfig.speed); // Velocidad del nivel actual
        // Verifica si el nivel actual es el nivel 10
        if (currentLevel === levels.length) {
            lives = 3; // Restablece las vidas a 3
            if (currentLevel === levels.length) {
                lives = 3; // Restablece las vidas a 3
                document.getElementById("lives").textContent = lives; // Actualiza el número de vidas en el elemento HTML
            }

        }
    } else {
        // Has completado todos los niveles
        mostrarMensaje("¡Has completado todos los niveles!");
    }
}

// Evento para el botón de iniciar juego
startButton.addEventListener("click", () => {
    startGame();
});
// Evento para presionar las teclas de las flechas
document.addEventListener("keydown", handleKeyPress);
// Inicializa el juego
reiniciarJuego();