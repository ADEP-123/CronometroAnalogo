import variables from "./variables.js";
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
export default formatCount