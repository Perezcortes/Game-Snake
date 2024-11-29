const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const gridSize = 20;
const snake = [{ x: 5, y: 5 }];
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

//funcion dibuja pantalla para el juego
function drawBoard() {
    //color de fondo
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    bodyImage.src = "cuerpo.jpg";

    // Dibujar la imagen de la cabeza de la serpiente
    ctx.drawImage(image, snake[0].x * gridSize, snake[0].y * gridSize, gridSize, gridSize);

    // Dibujar el resto del cuerpo de la serpiente
    for (let i = 1; i < snake.length; i++) {
        ctx.drawImage(bodyImage, snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
    }    
    
    //Comida 
    ctx.fillStyle = "#e3e94a";
    ctx.beginPath();
    ctx.arc((food.x + 0.5) * gridSize, (food.y + 0.5) * gridSize, gridSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Actualiza el marcador en la pantalla
    document.getElementById("score").textContent = score;
}

// Evento para presionar teclas de flechas
document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
    switch (event.key) {
        case "ArrowUp":
            if (direction !== "down") {
                direction = "up";
            }
            break;
        case "ArrowDown":
            if (direction !== "up") {
                direction = "down";
            }
            break;
        case "ArrowLeft":
            if (direction !== "right") {
                direction = "left";
            }
            break;
        case "ArrowRight":
            if (direction !== "left") {
                direction = "right";
            }
            break;
    }
}

// Función para incrementar el puntaje con un efecto de parpadeo
function increaseScore(increment) {
    if (!isAnimating) {
        isAnimating = true; // Marcamos que la animación está en curso
        const scoreElement = document.getElementById("score");
        score += increment; // Incrementa el puntaje
        scoreElement.textContent = score; // Actualiza el marcador
        scoreElement.style.color = "#07fb07"; // Cambia el color a verde
        setTimeout(() => {
            scoreElement.style.color = "white"; // Restablece el color a blanco después de 500 milisegundos (0.5 segundos)
            isAnimating = false; // Marcamos que la animación ha terminado
        }, 500); // 500 milisegundos (0.5 segundos) para el efecto
    }
}

//Evento para la pausa
const pauseButton = document.getElementById("pauseButton");

pauseButton.addEventListener("click", () => {
    if (isPaused) {
        isPaused = false;
        pauseButton.textContent = "Pausar Juego";
    } else {
        isPaused = true;
        pauseButton.textContent = "Reanudar Juego";
    }
});

//Evento para terminar juego
const stopButton = document.getElementById("stopButton");

// Función para finalizar el juego
function stopGame() {
    gameOver = true;
    alert("Juego Finalizado. Puntaje: " + score);
    // Reiniciar el juego
    location.reload();
}

// Agregar un evento al botón de "Finalizar Juego"
stopButton.addEventListener("click", stopGame);


//Funcion para mover la serpiente
function moveSnake() {
    if (!isPaused) {
        const head = { ...snake[0] };

        // Verifica la dirección
        switch (direction) {
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

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            generateFood();
            increaseScore(10); // Incrementa el puntaje en 10 puntos
        } else {
            snake.pop();
        }
    }
}


//Funcion para generar la comida 
function generateFood() {
    //Generamos la comida de manera aleatoria en la pantalla del juego
    food.x = Math.floor(Math.random() * (canvas.width / gridSize));
    food.y = Math.floor(Math.random() * (canvas.height / gridSize));
}

//Evento para presionar teclas de flechas
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

//Funcion para colisiones
function checkCollisions() {
    const head = snake[0];

    // Colisión con las paredes
    if (
      //Lados X y Y alto y ancho
        head.x < 0 ||
        head.x >= canvas.width / gridSize ||
        head.y < 0 ||
        head.y >= canvas.height / gridSize
    ) {
        //Si choca con la pared se resta una vida
        if (!gameOver) {
            // Variable vidas resta una 
            lives--;

            // Actualiza el marcador de vidas en la pantalla
            document.getElementById("lives").textContent = lives;

            // Cambia el color de las vidas restantes a rojo
            document.getElementById("lives").style.color = "red";

            //Variable vidas verificacion
            if (lives <= 0) {
                // Si no quedan vidas, muestra el mensaje de "Game Over" en pantalla
                gameOver = true;
                alert("Game Over. Puntaje: " + score);
                // Reinicio del juego si se desea
                location.reload();
            } else {
                // Si quedan vidas, sigue jugando sin reiniciar la serpiente
                // Reubica la serpiente al centro del tablero
                snake[0] = { x: Math.floor(canvas.width / gridSize / 2), y: Math.floor(canvas.height / gridSize / 2) };
            }
        }
    }

    // Colisión con la serpiente misma
    for (let i = 1; i < snake.length; i++) {
        //Verificamos la cabeza de la serpiente
        if (head.x === snake[i].x && head.y === snake[i].y) {
            if (!gameOver) {
                // Resta una vida
                lives--;
                // Actualiza el marcador de vidas en la pantalla
                document.getElementById("lives").textContent = lives;

                // Cambia el color de las vidas restantes a rojo
                document.getElementById("lives").style.color = "red";

                if (lives <= 0) {
                    // Si no quedan vidas, muestra el mensaje de "Game Over"
                    gameOver = true;
                    alert("Game Over. Puntaje: " + score);
                    // Puedes reiniciar el juego aquí si lo deseas
                    location.reload();
                } else {
                    // Si quedan vidas, sigue jugando sin reiniciar la serpiente
                    // Reubica la serpiente al centro del tablero
                    snake[0] = { 
                        x: Math.floor(canvas.width / gridSize / 2), 
                        y: Math.floor(canvas.height / gridSize / 2) 
                    };
                }
            }
        }
    }
}

//Funcion para el boton de iniciar juego
function startGame() {
    startButton.disabled = true; //verifica si se presiono el boton de iniciar
    setInterval(() => { //Velocidad con la que se mueve la serpiente
        moveSnake(); //llamamos a la funcion para mover la serpiente
        checkCollisions(); //Funcion para verificar colisiones
        drawBoard(); //Dibujar el cuadro del juego
    }, 200);
    generateFood(); //Funcion para crear la comida
}

//Evento para saber si se presiono el boton de iniciar juego
startButton.addEventListener("click", () => {
    startGame();
});
//Evento para presionar las teclas de las flechas 
document.addEventListener("keydown", handleKeyPress);
