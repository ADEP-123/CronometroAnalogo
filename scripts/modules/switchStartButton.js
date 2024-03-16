import variables from "./variables.js";
const switchStartButton = () => {
    variables.butStartPause.classList.toggle("unpulsedStartPause");
    variables.butStartPause.classList.toggle("pulseStartPause");
}
export default switchStartButton