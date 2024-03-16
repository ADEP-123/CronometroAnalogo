import variables from "./variables.js";
const switchResetButton = () => {
    variables.butReset.classList.toggle("unpulsedReset");
    variables.butReset.classList.toggle("pulsedReset");
    setTimeout(() => {
        variables.butReset.classList.toggle("unpulsedReset");
        variables.butReset.classList.toggle("pulsedReset");
    }, 400)
}
export default switchResetButton