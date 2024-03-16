const variables = {
    // Canvas info
    canvas: document.querySelector(".chrono"),
    canvasManecillas: document.querySelector(".manecillas"),
    contextManecillas: null,
    context: null,
    // Colores
    radio: null,
    black: "#1e2025",
    darkRed: "#bb0000",
    white: "#ffffff",
    //Botones inicio pausa y estado del cronometro
    butStartPause: document.querySelector(".startPauseButton"),
    butReset: document.querySelector(".resetButton"),
    cronInterval: null,
    //manesillas
    angS: 0,
    manecillaLength: null,
    contador: 0,
    //contador
    countP: document.querySelector("#cuenta"),
    countStarted: false,
    //Fecha y hora
    fecha: document.querySelector("#fecha"),
    reloj: document.querySelector("#reloj"),
    //Funcion de inicializacion
    init: function () {
        this.contextManecillas = this.canvasManecillas.getContext("2d");
        this.context = this.canvas.getContext("2d");
        this.radio = this.canvas.width / 2;
        this.manecillaLength = this.radio * 0.8;
    }

}

export default variables;