"use strict";
start();
//just for listener
function start() {
  const input = document.querySelector("#selector input");
  input.addEventListener("input", getUserInput);
}

//get base color value
function getUserInput(e) {
  const color = e.target.value;
  changeColor(color);
}

//delegator
function changeColor(hexValue) {
  //convert hex to rgb
  const rgb = hexToRgb(hexValue);
  //convert rgb to hsl function
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  //delegator for all harmony calculations
  calculateHarmony(hsl.h, hsl.s, hsl.l);
}

function hexToRgb(hex) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  console.log({ r, g, b });
  return { r, g, b };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log("hsl(%f,%f%,%f%)", h, s, l);

  h = Math.floor(h);
  s = Math.floor(s);
  l = Math.floor(l);
  return { h, s, l };
}

//another delegator that calls functions based on selected value
function calculateHarmony(h, s, l) {
  console.log(h, s, l);
  let selected = document.querySelector(".selected");
  let selectedValue = selected.value;
  console.log(selectedValue);
  let newHSL;
  if (selectedValue == "analogous") {
    console.log("hi");
    newHSL = getAnalogues(h, s, l);
  } else if (selectedValue == "monochromatic") {
    newHSL = getMonochromatic(h, s, l);
  } else if (selectedValue == "triad") {
    newHSL = getTriad(h, s, l);
  } else if (selectedValue == "complementary") {
    newHSL = getComplementary(h, s, l);
  } else if (selectedValue == "compound") {
    newHSL = getCompound(h, s, l);
  } else if (selectedValue == "shades") {
    newHSL = getShades(h, s, l);
  }
}

//basecolor square
// function colorBox(colorValue) {
//   const colorSquare1 = document.querySelector(".colorsquare1");
//   colorSquare1.style.background = colorValue;
// }

// function writeHex(value) {
//   let hexTxt = document.querySelector(".hex");
//   hexTxt.innerHTML = `HEX: ${value}`;
// }

// function writeRgB(red, blue, green) {
//   // console.log(red, blue, green);
//   let rgbTxt = document.querySelector(".rgb");
//   rgbTxt.innerHTML = `RGB: ${red} ${blue} ${green}`;
// }

function writeHsl(Hvalue, Svalue, Lvalue) {
  console.log(Hvalue, Svalue, Lvalue);
  let hslTxt = document.querySelector(".hsl");
  hslTxt.innerHTML = `HSL: ${Hvalue} ${Svalue}% ${Lvalue}% `;
}

function rgbToCSS(rgb) {
  // converts rgb object to CSS color string
  let cssStr = "rgb" + "(" + `${rgb.r},${rgb.g},${rgb.b}` + ")";
  console.log(cssStr);
  return cssStr;
}

function rgbToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  if (r.length < 2 || g.length < 2 || b.length < 2) {
    r = r.padStart(2, "0");
    g = g.padStart(2, "0");
    b = b.padStart(2, "0");
  }
  const hex = "#" + `${r}${g}${b}`;

  console.log(hex);
  return hex;
}
