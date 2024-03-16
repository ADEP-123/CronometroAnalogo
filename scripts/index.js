import variables from "./modules/variables.js";
variables.init();

// Dibujar primer circulo externo
variables.context.beginPath();
variables.context.fillStyle = variables.darkRed
variables.context.arc(variables.radio, variables.radio, variables.radio, 0, 2 * Math.PI);
variables.context.fill();

variables.context.beginPath();
variables.context.fillStyle = variables.black
variables.context.arc(variables.radio, variables.radio, variables.radio - 5, 0, 2 * Math.PI);
variables.context.fill();

//Dibujar segundo circulo externo
variables.context.beginPath();
variables.context.fillStyle = variables.darkRed
variables.context.arc(variables.radio, variables.radio, variables.radio - 8, 0, 2 * Math.PI);
variables.context.fill();

variables.context.beginPath();
variables.context.fillStyle = variables.black
variables.context.arc(variables.radio, variables.radio, variables.radio - 10, 0, 2 * Math.PI);
variables.context.fill();

//Dibujar eje interno
variables.context.beginPath();
variables.context.fillStyle = variables.white
variables.context.arc(variables.radio, variables.radio, 10, 0, 2 * Math.PI);
variables.context.fill();

//Dibujar numeros e indicadores
variables.context.font = variables.radio / 10 + "px arial";
variables.context.textAlign = "center";
variables.context.textBaseline = "middle";
for (let i = 0; i < 60; i++) {
    variables.context.strokeStyle = variables.white;
    //Calcular coordenadas de inicio de linea de segundos
    let x2 = variables.radio + (variables.radio - 12) * Math.sin(i * 2 * Math.PI / 60);
    let y2 = variables.radio - (variables.radio - 12) * Math.cos(i * 2 * Math.PI / 60);
    let x1 = 0;
    let y1 = 0;
    if (i % 5 == 0) {
        //Dibujar numeros cada 5 segundos
        variables.context.fillText(i, variables.radio + (variables.radio - 30) * 0.9 * Math.sin(i * 2 * Math.PI / 60), variables.radio - ((variables.radio - 30) * 0.9 * Math.cos(i * 2 * Math.PI / 60)));

        // Calcular coordenadas de final de linea de segundos multiplos de 5
        variables.context.lineWidth = 3;
        x1 = variables.radio + (variables.radio - 27) * Math.sin(i * 2 * Math.PI / 60);
        y1 = variables.radio - (variables.radio - 27) * Math.cos(i * 2 * Math.PI / 60);
    } else {
        // Calcular coordenadas de final de linea de otros segundos
        variables.context.lineWidth = 2;
        y1 = variables.radio - (variables.radio - 22) * Math.cos(i * 2 * Math.PI / 60);
        x1 = variables.radio + (variables.radio - 22) * Math.sin(i * 2 * Math.PI / 60);
    }
    // Dibujar las lineas de los segundos
    variables.context.beginPath();
    variables.context.moveTo(x1, y1);
    variables.context.lineTo(x2, y2);
    variables.context.stroke();
};


//funcion para mover la manecilla
let aumAng = () => {
    variables.contador++;
    // Aumentar el ángulo en un cierto incremento (en radianes) por segundo
    variables.angS += Math.PI / 3000;
    movMan(variables.angS)
    formatCount(variables.contador)
}

let movMan = (angS) => {
    variables.contextManecillas.clearRect(0, 0, variables.canvasManecillas.width, variables.canvasManecillas.height); // Limpiar el lienzo antes de redibujar
    // Dibujar la manecilla
    variables.contextManecillas.beginPath();
    variables.contextManecillas.strokeStyle = variables.white;
    variables.contextManecillas.moveTo(variables.radio, variables.radio);
    // Calcular las coordenadas finales de la línea de la manecilla
    let xFin = variables.radio + variables.manecillaLength * Math.sin(angS);
    let yFin = variables.radio - variables.manecillaLength * Math.cos(angS);
    variables.contextManecillas.lineTo(xFin, yFin);
    variables.contextManecillas.lineWidth = 3;
    variables.contextManecillas.stroke();
}
movMan(variables.angS)

const switchStartButton = () => {
    variables.butStartPause.classList.toggle("unpulsedStartPause");
    variables.butStartPause.classList.toggle("pulseStartPause");
}

const switchResetButton = () => {
    variables.butReset.classList.toggle("unpulsedReset");
    variables.butReset.classList.toggle("pulsedReset");
    setTimeout(() => {
        variables.butReset.classList.toggle("unpulsedReset");
        variables.butReset.classList.toggle("pulsedReset");
    }, 400)
}

const formatCount = (data) => {
    let min = 0
    let sec = 0
    let milSec = data * 10;
    if (milSec >= 1000) {
        sec = Math.trunc(milSec / 1000)
        milSec = milSec - (sec * 1000)
        if (sec > 60) {
            min = Math.trunc(sec)
            sec = sec - (min * 60)
        }
    }
    let formatMin = min < 10 ? `0${min}` : `${min}`;
    let formatSec = sec < 10 ? `0${sec}` : `${sec}`;
    let formatMilSec = milSec === 0 ? '00' : `${milSec}`
    variables.countP.innerHTML = `${formatMin}:${formatSec}:${formatMilSec}`;
}

variables.butStartPause.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    let status = variables.butStartPause.classList[1]
    switchStartButton()
    if (status == "unpulsedStartPause") {
        variables.cronInterval = setInterval(aumAng, 10);
    } else {
        clearInterval(variables.cronInterval)
        variables.cronInterval = null
    }
});



variables.butReset.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    let status = variables.butStartPause.classList[1]
    if (status == "unpulsedStartPause") {
        switchResetButton()
    } else {
        switchResetButton()
        switchStartButton();
    }
    if (variables.cronInterval != null) {
        clearInterval(variables.cronInterval)
        variables.cronInterval = null
    }
    variables.countP.innerHTML = "00:00:000"
    variables.contador = 0;
    variables.angS = 0;
    movMan(0);
})

