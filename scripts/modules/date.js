import variables from "./variables.js";

const setDate = () => {
    const newFecha = new Date();
    variables.fecha.innerHTML = newFecha.toLocaleDateString('es-MX', { weekday: 'long', month: 'long', day: 'numeric' })
}
export default setDate
