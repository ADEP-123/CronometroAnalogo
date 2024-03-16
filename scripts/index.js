import variables from "./modules/variables.js";
import dibujarBase from "./modules/dibujarBase.js";
variables.init();

//Dibujar base del cronometro
dibujarBase();


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

