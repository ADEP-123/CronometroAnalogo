const canvas = document.querySelector(".chrono");
const canvasManecillas = document.querySelector(".manecillas")
const contextManecillas = canvasManecillas.getContext("2d")
const context = canvas.getContext("2d");
const radio = canvas.width / 2;
const black = "#1e2025"
const darkRed = "#bb0000"
const white = "#ffffff"
const butStartPause = document.querySelector(".startPauseButton");
const butReset = document.querySelector(".resetButton");

