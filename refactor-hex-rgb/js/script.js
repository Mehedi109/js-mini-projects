// globals
let toastContainer = null;

const defaultColor = {
  red: 221,
  green: 222,
  blue: 238,
};

// onload handler
window.onload = () => {
  updateColorCodeToDom(defaultColor);
};

// dom references
const colorButton = document.getElementById("generate-random-color");
const colorModeHexInput = document.getElementById("color-mode-hex");
const inputHex = document.getElementById("input-hex");
const inputRGB = document.getElementById("input-rgb");
const colorSliderRed = document.getElementById("color-slider-red");
const colorSliderGreen = document.getElementById("color-slider-green");
const colorSliderBlue = document.getElementById("color-slider-blue");
const colorModeRadios = document.getElementsByName("color-mode");
const copyToClipboardBtn = document.getElementById("copy-to-clipboard");

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
  const getTwoCode = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  const hex = `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`;
  return hex;
};

const generateRGBColor = ({ red, green, blue }) => {
  return `rgb(${red}, ${green}, ${blue})`;
};

// event listeners
inputHex.addEventListener("keyup", function (e) {
  const hexColor = e.target.value;
  if (hexColor) {
    inputHex.value = hexColor.toUpperCase();
    if (isValidHex(hexColor)) {
      const color = hexToDecimalColors(hexColor);
      updateColorCodeToDom(color);
    }
  }
});

colorSliderRed.addEventListener("change", handleColorSliders);
colorSliderGreen.addEventListener("change", handleColorSliders);
colorSliderBlue.addEventListener("change", handleColorSliders);

copyToClipboardBtn.addEventListener("click", handleCopyToClipboard);

// event handlers
colorButton.onclick = () => {
  const color = generateColorDecimal();
  updateColorCodeToDom(color);
};

function handleColorSliders() {
  const color = {
    red: parseInt(colorSliderRed.value),
    green: parseInt(colorSliderGreen.value),
    blue: parseInt(colorSliderBlue.value),
  };
  updateColorCodeToDom(color);
}

function handleCopyToClipboard() {
  const mode = getCheckedValueFromRadios(colorModeRadios);
  if (mode === null) {
    throw new Error("Invalid Radio Input");
  }
  if (toastContainer !== null) {
    toastContainer.remove();
    toastContainer = null;
  }
  if (mode === "hex") {
    const hexColor = document.getElementById("input-hex").value;
    if (hexColor && isValidHex(hexColor)) {
      navigator.clipboard.writeText(`#${hexColor}`);
      generateToastMessage(`#${hexColor}`);
    } else {
      alert("Invalid Hex Code");
    }
  } else {
    const rgbColor = document.getElementById("input-rgb").value;
    if (rgbColor) {
      navigator.clipboard.writeText(rgbColor);
      generateToastMessage(rgbColor);
    } else {
      alert("Invalid RGB Code");
    }
  }
}

// DOM functions
function generateToastMessage(message) {
  toastContainer = document.createElement("div");
  toastContainer.className = "toast-message toast-message-slide-in";
  toastContainer.innerText = message + " copied";

  toastContainer.addEventListener("click", () => {
    toastContainer.classList.remove("toast-message-slide-in");
    toastContainer.classList.add("toast-message-slide-out");

    toastContainer.addEventListener("animationend", () => {
      toastContainer.remove();
      toastContainer = null;
    });
  });
  document.body.appendChild(toastContainer);
  // setTimeout for removed the message automatically
  setTimeout(function () {
    document.body.removeChild(toastContainer);
  }, 5000);
}

function getCheckedValueFromRadios(nodes) {
  let checkedValue = null;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkedValue = nodes[i].value;
      break;
    }
  }
  return checkedValue;
}

function updateColorCodeToDom(color) {
  const hexColor = generateHexColor(color);
  const rgbColor = generateRGBColor(color);
  document.getElementById(
    "color-display"
  ).style.backgroundColor = `#${hexColor}`;
  document.getElementById("input-hex").value = hexColor;
  document.getElementById("input-rgb").value = rgbColor;
  document.getElementById("color-slider-red").value = color.red;
  document.getElementById("color-slider-red-label").innerText = color.red;
  document.getElementById("color-slider-green").value = color.green;
  document.getElementById("color-slider-green-label").innerText = color.green;
  document.getElementById("color-slider-blue").value = color.blue;
  document.getElementById("color-slider-blue-label").innerText = color.blue;
}

// convert hex to decimal colors object
const hexToDecimalColors = (hex) => {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);
  return {
    red,
    green,
    blue,
  };
};

// validate hex color code
function isValidHex(color) {
  if (color.length !== 6) return false;

  return /^[0-9A-Fa-f]{6}$/i.test(color);
}
