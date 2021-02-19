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
  writeHSL(hslArr, hslArr.length); //why does it not show length without second param??
  writeRGB(hslArr, hslArr.length);
  writeHex(hslArr, hslArr.length);
  showColors(hslArr, hslArr.length);
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

//calculations (loosely correct)
function getAnalogues(hsl) {
  const hslArr = new Array(5);
  hslArr[0] = { h: hsl.h, s: hsl.s, l: hsl.l };
  hslArr[1] = { h: hsl.h + 20, s: hsl.s, l: hsl.l };
  hslArr[2] = { h: hsl.h + 40, s: hsl.s, l: hsl.l };
  hslArr[3] = { h: hsl.h - 40, s: hsl.s, l: hsl.l };
  hslArr[4] = { h: hsl.h - 20, s: hsl.s, l: hsl.l };
  console.log(hslArr);
  return hslArr;
}

function getMonochromatic(hsl) {
  const hslArr = new Array(5);
  hslArr[0] = { h: hsl.h, s: hsl.s, l: hsl.l };
  hslArr[1] = { h: hsl.h, s: hsl.s - 30, l: hsl.l };
  hslArr[2] = { h: hsl.h, s: hsl.s - 60, l: hsl.l };
  hslArr[3] = { h: hsl.h, s: hsl.s - 90, l: hsl.l };
  hslArr[4] = { h: hsl.h, s: hsl.s - 120, l: hsl.l };
  console.log(hslArr);
  return hslArr;
}

function getTriad(hsl) {
  const hslArr = new Array(5);
  hslArr[0] = { h: hsl.h, s: hsl.s, l: hsl.l };
  hslArr[1] = { h: hsl.h + 120, s: hsl.s, l: hsl.l };
  hslArr[2] = { h: hsl.h + (240 % 360), s: hsl.s, l: hsl.l };
  hslArr[3] = { h: hsl.h, s: hsl.s, l: hsl.l };
  hslArr[4] = { h: hsl.h, s: hsl.s, l: hsl.l };
  console.log(hslArr);
  return hslArr;
}

function getComplementary(hsl) {
  const hslArr = new Array(5);
  hslArr[0] = { h: hsl.h, s: hsl.s, l: hsl.l };
  hslArr[1] = { h: hsl.h + 90, s: hsl.s, l: hsl.l };
  hslArr[2] = { h: hsl.h + 120, s: hsl.s, l: hsl.l };
  hslArr[3] = { h: hsl.h + 180, s: hsl.s, l: hsl.l };
  hslArr[4] = { h: hsl.h + 240, s: hsl.s, l: hsl.l };
  console.log(hslArr);
  return hslArr;
}

function getCompound(hsl) {
  const hslArr = new Array(5);
  hslArr[0] = { h: hsl.h, s: hsl.s, l: hsl.l };
  hslArr[1] = { h: hsl.h + 180, s: hsl.s, l: hsl.l };
  hslArr[2] = { h: hsl.h + (240 % 360), s: hsl.s, l: hsl.l };
  hslArr[3] = { h: hsl.h - 20, s: hsl.s, l: hsl.l };
  hslArr[4] = { h: hsl.h - 40, s: hsl.s, l: hsl.l };
  console.log(hslArr);
  return hslArr;
}

function getShades(hsl) {
  const hslArr = new Array(5);
  hslArr[0] = { h: hsl.h, s: hsl.s, l: hsl.l };
  hslArr[1] = { h: hsl.h, s: hsl.s, l: hsl.l + 10 };
  hslArr[2] = { h: hsl.h, s: hsl.s, l: hsl.l + 20 };
  hslArr[3] = { h: hsl.h, s: hsl.s, l: hsl.l + 30 };
  hslArr[4] = { h: hsl.h, s: hsl.s, l: hsl.l + 40 };
  console.log(hslArr);
  return hslArr;
}

//loop through array and show base and calculated colors
function showColors(hslArr, length) {
  let elColor;
  let elRGB;
  let elHex;
  for (let i = 0; i < length; i++) {
    elColor = "#color-box" + (i + 1) + " .colorsquare";
    elRGB = hslToRgb(hslArr[i].h, hslArr[i].s, hslArr[i].l);
    elHex = rgbToHex(elRGB.r, elRGB.g, elRGB.b);
    console.log(elHex);
    let htmlDiv = document.querySelector(elColor);
    htmlDiv.style.background = elHex;
  }
}

//loop through array and write hsl and calculated hsl
function writeHSL(hslArr, lenArr) {
  let elementStr;
  for (let i = 0; i < lenArr; i++) {
    elementStr = "#color-box" + (i + 1) + " .hsl";
    let htmlDiv = document.querySelector(elementStr);
    htmlDiv.innerHTML = `HSL: ${hslArr[i].h} ${hslArr[i].s}% ${hslArr[i].l}% `;
  }
}

//loop through array and write rgb and calculated/converted rgb
function writeRGB(hslArr, lenArr) {
  let elementStr;
  let elRGB;
  for (let i = 0; i < lenArr; i++) {
    elementStr = "#color-box" + (i + 1) + " .rgb";
    elRGB = hslToRgb(hslArr[i].h, hslArr[i].s, hslArr[i].l);
    let htmlDiv = document.querySelector(elementStr);
    htmlDiv.innerHTML = `RGB: ${elRGB.r} ${elRGB.g} ${elRGB.b}`;
  }
}

//loop through array and write hex and calculated/converted hex
function writeHex(hslArr, lenArr) {
  let elementStr;
  let elHex;
  let elRGB;
  for (let i = 0; i < lenArr; i++) {
    elementStr = "#color-box" + (i + 1) + " .hex";
    elRGB = hslToRgb(hslArr[i].h, hslArr[i].s, hslArr[i].l);
    elHex = rgbToHex(elRGB.r, elRGB.g, elRGB.b);
    let htmlDiv = document.querySelector(elementStr);
    htmlDiv.innerHTML = `HEX: ${elHex}`;
  }
}
