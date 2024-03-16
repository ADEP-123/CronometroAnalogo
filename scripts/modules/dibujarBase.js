import variables from "./variables.js"
const dibujarBase = () => {
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
}
export default dibujarBase