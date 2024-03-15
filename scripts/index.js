const canvas = document.querySelector(".chrono");
const canvasManecillas = document.querySelector(".manecillas")
const contextManecillas = canvasManecillas.getContext("2d")
const context = canvas.getContext("2d");
const radio = canvas.width / 2;
const black = "#1e2025"
const darkRed = "#bb0000"
const white = "#ffffff"
const butStartPause = document.querySelector(".startPauseButton");
const butReset = document.querySelector(".resetButton");

// Dibujar primer circulo externo
context.beginPath();
context.fillStyle = darkRed
context.arc(radio, radio, radio, 0, 2 * Math.PI);
context.fill();

context.beginPath();
context.fillStyle = black
context.arc(radio, radio, radio - 5, 0, 2 * Math.PI);
context.fill();

//Dibujar segundo circulo externo
context.beginPath();
context.fillStyle = darkRed
context.arc(radio, radio, radio - 8, 0, 2 * Math.PI);
context.fill();

context.beginPath();
context.fillStyle = black
context.arc(radio, radio, radio - 10, 0, 2 * Math.PI);
context.fill();

//Dibujar eje interno
context.beginPath();
context.fillStyle = white
context.arc(radio, radio, 10, 0, 2 * Math.PI);
context.fill();

//Dibujar numeros e indicadores
context.font = radio / 10 + "px arial";
context.textAlign = "center";
context.textBaseline = "middle";
for (let i = 0; i < 60; i++) {
    context.strokeStyle = white;
    //Calcular coordenadas de inicio de linea de segundos
    let x2 = radio + (radio - 12) * Math.sin(i * 2 * Math.PI / 60);
    let y2 = radio - (radio - 12) * Math.cos(i * 2 * Math.PI / 60);
    let x1 = 0;
    let y1 = 0;
    if (i % 5 == 0) {
        //Dibujar numeros cada 5 segundos
        context.fillText(i, radio + (radio - 30) * 0.9 * Math.sin(i * 2 * Math.PI / 60), radio - ((radio - 30) * 0.9 * Math.cos(i * 2 * Math.PI / 60)));

        // Calcular coordenadas de final de linea de segundos multiplos de 5
        context.lineWidth = 3;
        x1 = radio + (radio - 27) * Math.sin(i * 2 * Math.PI / 60);
        y1 = radio - (radio - 27) * Math.cos(i * 2 * Math.PI / 60);
    } else {
        // Calcular coordenadas de final de linea de otros segundos
        context.lineWidth = 2;
        y1 = radio - (radio - 22) * Math.cos(i * 2 * Math.PI / 60);
        x1 = radio + (radio - 22) * Math.sin(i * 2 * Math.PI / 60);
    }
    // Dibujar las lineas de los segundos
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
};

//manesillas
let angS = 0;
let manecillaLength = radio * 0.8;
//funcion para mover la manecilla
let aumAng = () => {
    angS += Math.PI / 30;
    // Aumentar el ángulo en un cierto incremento (en radianes) por segundo
    movMan(angS)
}
let movMan = (angS) => {
    contextManecillas.clearRect(0, 0, canvasManecillas.width, canvasManecillas.height); // Limpiar el lienzo antes de redibujar
    // Dibujar la manecilla
    contextManecillas.beginPath();
    contextManecillas.strokeStyle = white;
    contextManecillas.moveTo(radio, radio);
    // Calcular las coordenadas finales de la línea de la manecilla
    let xFin = radio + manecillaLength * Math.sin(angS);
    let yFin = radio - manecillaLength * Math.cos(angS);
    contextManecillas.lineTo(xFin, yFin);
    contextManecillas.lineWidth = 3;
    contextManecillas.stroke();
}
movMan(angS)

let cronInterval = null;
butStartPause.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    let status = butStartPause.classList[1]
    butStartPause.classList.toggle("unpulsedStartPause");
    butStartPause.classList.toggle("pulseStartPause");
    if (status == "unpulsedStartPause") {
        cronInterval = setInterval(aumAng, 1000);
    } else {
        clearInterval(cronInterval)
        cronInterval = null
    }

});