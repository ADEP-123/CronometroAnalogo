import variables from "./modules/variables.js";
import dibujarBase from "./modules/dibujarBase.js";
import aumAng from "./modules/aumAngulo.js";
import switchStartButton from "./modules/switchStartButton.js";
import switchResetButton from "./modules/switchResetButton.js";
variables.init();

//Dibujar base del cronometro
dibujarBase();

//funcionamiento manecillas
aumAng();

variables.butStartPause.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    let status = variables.butStartPause.classList[1]
    switchStartButton()
    if (status == "unpulsedStartPause") {
        variables.cronInterval = setInterval(aumAng, 10);
        variables.countStarted = true;
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
    if (variables.countStarted == true) {
        variables.countStarted = false;
    }
    variables.countP.innerHTML = "00:00:000"
    variables.contador = 0;
    variables.angS = 0;
    aumAng();
})

