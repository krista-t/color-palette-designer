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
  convertColor(color);
}

//delegator
function convertColor(hexValue) {
  //convert hex to rgb
  const rgb = hexToRgb(hexValue);
  //convert rgb to hsl function
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  //rgb to hex
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  console.log(hex);
  //hsl to rgb
  const newRGB = hslToRgb(hsl.h, hsl.s, hsl.l);
  console.log(newRGB);
  //delegator for all harmony calculations
  const hslArr = calculateHarmony(hsl);
  showValues(hslArr);
}
function showValues(hslArr) {
  for (let i = 0; i < hslArr.lenght; i++) {
    //TREBA MI HEX value
  }
}

//covert hex to rgb
function hexToRgb(hex) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  console.log({ r, g, b });
  return { r, g, b };
}

// convert rgb to hsl
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
  console.log({ h, s, l });
  return { h, s, l };
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
  return hex;
}

function hslToRgb(h, s, l) {
  console.log(h, s, l);
  h = h;
  s = s / 100;
  l = l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

//another delegator that calls functions based on selected value
function calculateHarmony(hsl) {
  console.log(hsl);
  let selected = document.querySelector(".selected");
  let selectedValue = selected.value;
  let hslArr;
  if (selectedValue === "analogous") {
    hslArr = getAnalogues(hsl);
  } else if (selectedValue === "monochromatic") {
    hslArr = getMonochromatic(hsl);
  } else if (selectedValue === "triad") {
    hslArr = getTriad(hsl);
  } else if (selectedValue === "complementary") {
    hslArr = getComplementary(hsl);
  } else if (selectedValue === "compound") {
    hslArr = getCompound(hsl);
  } else if (selectedValue === "shades") {
    hslArr = getShades(hsl);
  }
  return hslArr;
}

//calculations
function getAnalogues(hsl) {
  const hslArr = new Array(5);
  hslArr[0] = { h: hsl.h, s: hsl.s, l: hsl.l };
  hslArr[1] = { h: hsl.h + 20, s: hsl.s, l: hsl.l + 10 };
  hslArr[2] = { h: hsl.h + 40, s: hsl.s, l: hsl.l + 20 };
  hslArr[3] = { h: hsl.h - 40, s: hsl.s, l: hsl.l };
  hslArr[4] = { h: hsl.h - 20, s: hsl.s, l: hsl.l + 20 };
  console.log(hslArr);
  return hslArr;
}

// function writeHex(value) {
//   let hexTxt = document.querySelector(".hex");
//   hexTxt.innerHTML = `HEX: ${value}`;
// }

// function writeRgB(red, blue, green) {
//   // console.log(red, blue, green);
//   let rgbTxt = document.querySelector(".rgb");
//   rgbTxt.innerHTML = `RGB: ${red} ${blue} ${green}`;
// }

// function writeHsl(Hvalue, Svalue, Lvalue) {
//   console.log(Hvalue, Svalue, Lvalue);
//   let hslTxt = document.querySelector(".hsl");
//   hslTxt.innerHTML = `HSL: ${Hvalue} ${Svalue}% ${Lvalue}% `;
// }

// function rgbToCSS(rgb) {
//   // converts rgb object to CSS color string
//   let cssStr = "rgb" + "(" + `${rgb.r},${rgb.g},${rgb.b}` + ")";
//   console.log(cssStr);
//   return cssStr;
// }
