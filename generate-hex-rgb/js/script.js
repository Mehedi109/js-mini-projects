const colorButton = document.getElementById("color-btn");
const inputHexColor = document.getElementById("input-hex-color");
const inputRGBColor = document.getElementById("input-rgb-color");
const copyHexBtn = document.getElementById("copy-hex-btn");
const copyRGBBtn = document.getElementById("copy-rgb-btn");
const hash = document.getElementById("hash");
let div = null;
const body = document.getElementById("body");

const generateColorDecimal = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return {
    red,
    green,
    blue,
  };
};

const generateHexColor = ({ red, green, blue }) => {
  // const { red, green, blue } = generateColorDecimal();
  const getTwoCode = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  const hex = `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`;
  return hex;
};

const generateRGBColor = ({ red, green, blue }) => {
  // const { red, green, blue } = generateColorDecimal();
  return `rgb(${red}, ${green}, ${blue})`;
};

colorButton.onclick = () => {
  const color = generateColorDecimal();
  const hex = generateHexColor(color);
  const rgb = generateRGBColor(color);
  // body.style.backgroundColor = `#${generateHexColor(color)}`;
  // body.style.backgroundColor = generateRGBColor(color);
  body.style.backgroundColor = hex;
  body.style.backgroundColor = rgb;
  inputHexColor.value = hex.toUpperCase();
  inputRGBColor.value = rgb.toUpperCase();
};

copyHexBtn.onclick = () => {
  navigator.clipboard.writeText(`#${inputHexColor.value}`);

  if (div !== null) {
    div.remove();
    div = null;
  }

  if (isValidHex(inputHexColor.value)) {
    generateToastMessage(`#${inputHexColor.value}`);
  } else {
    alert("Invalid color code");
  }
};

copyRGBBtn.onclick = () => {
  navigator.clipboard.writeText(`${inputRGBColor.value}`);

  if (div !== null) {
    div.remove();
  }

  if (isValidHex(inputHexColor.value)) {
    generateToastMessage(`${inputRGBColor.value}`);
  } else {
    alert("Invalid color code");
  }
};

inputHexColor.addEventListener("keyup", function (e) {
  const color = e.target.value;
  inputHexColor.value = color.toUpperCase();
  const convertedRGB = hexToRGB(color); //
  inputRGBColor.value = convertedRGB.toUpperCase(); //
  if (color) {
    if (isValidHex(color)) {
      body.style.backgroundColor = `#${color}`;
    }
  }
});

// convert hex to rgb
const hexToRGB = (hex) => {
  // let bigInt = parseInt(hex, 16);
  // let r = (bigInt >> 16) & 255;
  // let g = (bigInt >> 8) & 255;
  // let b = bigInt & 255;
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);
  return `rgb(${red}, ${green}, ${blue})`;
};

function generateToastMessage(message) {
  div = document.createElement("div");
  div.className = "toast-message toast-message-slide-in";
  div.innerText = message + " copied";

  div.addEventListener("click", () => {
    div.classList.remove("toast-message-slide-in");
    div.classList.add("toast-message-slide-out");

    div.addEventListener("animationend", () => {
      div.remove();
      div = null;
    });
  });
  body.appendChild(div);
}

function isValidHex(color) {
  if (color.length !== 6) return false;

  return /^[0-9A-Fa-f]{6}$/i.test(color);
}
