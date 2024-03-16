import variables from "./variables.js";
const movMan = (angS) => {
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
export default movMan