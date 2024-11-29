# Game-Snake 🐍  

Este proyecto es una implementación del clásico juego **Snake**, desarrollado utilizando **HTML**, **CSS** y **JavaScript**. Está diseñado para ser un proyecto simple pero interactivo, ideal para practicar y mejorar habilidades de desarrollo web.

Si solo quieres ver su funcionalidad sin necesidad de descargar código entra: https://perezcortes.github.io/Game-Snake/

## Características 🎮

- **Control del jugador**: Controla la serpiente con las teclas de dirección del teclado.
- **Interfaz dinámica**: 
  - Botones para iniciar, pausar y finalizar el juego.
  - Sistema de puntaje y vidas visibles durante la partida.
- **Diseño adaptable**: Uso de **Flexbox** para alinear y organizar los elementos.
- **Estética personalizable**: Incluye estilos modernos con colores interactivos y animaciones en los botones.
- **Indicadores de estado**: Mensajes visuales cuando el juego termina o al reiniciar la partida.

---

## Contenido del proyecto 📂

El proyecto incluye los siguientes archivos:

1. **HTML**: Estructura del juego y elementos interactivos.
   - Archivo: `index.html`

2. **CSS**: Diseño visual del juego, incluyendo colores, fuentes y diseño del lienzo.
   - Archivo: `styles.css`

3. **JavaScript**: Lógica del juego, control de la serpiente, detección de colisiones y manejo del puntaje.
   - Archivo: `script.js`

---

## Cómo jugar 🕹️

1. **Inicio del juego**:
   - Haz clic en el botón **"Iniciar Juego"** para comenzar.
2. **Control de la serpiente**:
   - Usa las **teclas de dirección** (`← ↑ → ↓`) para mover la serpiente.
3. **Objetivo**:
   - **Recolecta comida** para que la serpiente crezca y aumenta tu puntaje.
   - Evita chocar con los bordes del área de juego o contigo mismo.
4. **Pausa o Finalizar**:
   - Puedes pausar el juego con el botón **"Pausar Juego"** o finalizarlo con **"Finalizar Juego"**.
5. **Game Over**:
   - Si pierdes todas tus vidas, aparecerá un mensaje indicando que el juego ha terminado y un botón para reiniciarlo.

---

## Estructura del código ⚙️

### HTML (Estructura principal)
- Botones: `#startButton`, `#pauseButton`, `#stopButton`.
- Lienzo para el juego: `<canvas id="gameCanvas">`.
- Contenedor de puntaje y vidas: `#scoreContainer`.

### CSS (Estilo y diseño)
- **Flexbox**: Utilizado en `#gameContainer` para alinear y organizar los elementos.
- **Estilo visual**:
  - Bordes, colores y tipografía moderna.
  - Animaciones suaves para los botones al interactuar.
- **Mensajes de estado**:
  - Ventana emergente para **"Game Over"** con un diseño centrado y llamativo.

### JavaScript (Lógica del juego)
- Control de la serpiente: Movimiento con las teclas de dirección.
- Detección de colisiones:
  - Con los bordes del área de juego.
  - Con el propio cuerpo de la serpiente.
- Sistema de puntaje y vidas:
  - Incremento del puntaje al recolectar comida.
  - Reducción de vidas al cometer errores.
- Reinicio del juego: Funcionalidad para volver a comenzar desde cero.

---

## Estilo del proyecto 🌟

- **Fondo del juego**: Color oscuro para enfocar la atención en el área de juego.
- **Barra de desplazamiento personalizada**: Diseño delgado y minimalista en el lienzo.
- **Mensajes visuales**: Ventanas emergentes bien diseñadas para estados como **"Game Over"**.
- **Interactividad**: Botones animados con colores cambiantes al pasar el cursor.
  
---

## Tecnologías utilizadas 🛠️

- **HTML5**: Para la estructura de la interfaz y el lienzo del juego.
- **CSS3**: Para los estilos visuales, diseño y animaciones de botones.
- **JavaScript (ES6)**: Para implementar la lógica interactiva del juego.

---

## Cómo probar el juego 💻

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tuusuario/game-snake.git
   cd game-snake
   ```

2. **Abrir el archivo `index.html`**:
   - Abre el archivo `index.html` en tu navegador preferido.

---

## Próximas mejoras 🚀

- Añadir niveles de dificultad.
- Soporte para dispositivos móviles (táctil).
- Efectos de sonido y música de fondo.
- Implementar un sistema de almacenamiento del puntaje más alto (high score).

---

## Autor ✍️

Creado por **José Alberto Pérez Cortes**  
Encuentra más proyectos en https://github.com/Perezcortes.

---
