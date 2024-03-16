import variables from "./variables.js";
import movMan from "./movManecillas.js";
import formatCount from "./formatCounter.js";

const aumAng = () => {
    if (variables.countStarted == false) {
        movMan(variables.angS)
    } else {
        variables.contador++;
        // Aumentar el ángulo en un cierto incremento (en radianes) por segundo
        variables.angS += Math.PI / 3000;
        movMan(variables.angS)
        formatCount(variables.contador)
    }
}
export default aumAng;