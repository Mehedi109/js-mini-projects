// globals
let toastContainer = null;

const defaultColor = {
  red: 221,
  green: 222,
  blue: 238,
};

const presetColor = [
  "#F0F8FF",
  "#E52B50",
  "#FFBF00",
  "#9966CC",
  "#FBCEB1",
  "#7FFFD4",
  "#007FFF",
  "#89CFF0",
  "#F5F5DC",
  "#CB4154",
  "#000000",
  "#0000FF",
  "#0095B6",
  "#8A2BE2",
  "#DE5D83",
  "#CD7F32",
  "#993300",
  "#800200",
  "#702963",
  "#960018",
  "#DE3163",
  "#007BA7",
  "#F7E7CE",
  "#7FFF00",
];
let customColors = new Array(24);
const copySound = new Audio("../copy-sound.wav");

// onload handler
window.onload = () => {
  updateColorCodeToDom(defaultColor);
  const customColorsString = localStorage.getItem("custom-color");
  if (customColorsString) {
    customColors = JSON.parse(customColorsString);
    displayColorBoxes(document.getElementById("custom-colors"), customColors);
  }
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
const saveBtn = document.getElementById("save-btn");
const presetColorParent = document.getElementById("preset-colors");
const customColorParent = document.getElementById("custom-colors");
const bgPreview = document.getElementById("bg-preview");
const bgFileInput = document.getElementById("bg-file-input");
const bgFileInputBtn = document.getElementById("bg-file-input-btn");
const bgFileRemoveBtn = document.getElementById("bg-file-remove-btn");
bgFileRemoveBtn.style.display = "none";

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

presetColorParent.addEventListener("click", handlePresetColorsParent);

saveBtn.addEventListener("click", function () {
  const color = `#${inputHex.value}`;
  // if (!customColors.includes(color)) {
  //   customColors.unshift(color);
  // }
  if (customColors.includes(color)) {
    alert("The color saved already");
    return;
  }
  customColors.unshift(color);
  if (customColors.length > 24) {
    customColors = customColors.slice(0, 24);
  }
  removeChildren(customColorParent);
  displayColorBoxes(customColorParent, customColors);
  localStorage.setItem("custom-color", JSON.stringify(customColors));
});

bgFileInputBtn.addEventListener("click", function () {
  bgFileInput.click();
});

bgFileInput.addEventListener("change", function (e) {
  const file = e.target.files[0];
  const imgUrl = URL.createObjectURL(file);
  bgPreview.style.background = `url(${imgUrl})`;
  document.body.style.background = `url(${imgUrl})`;
  // document.body.style = "background-repeat: no-repeat;background-size:cover";
  document.body.className = "bg-image";
  bgFileRemoveBtn.style.display = "inline";
});

bgFileRemoveBtn.addEventListener("click", function () {
  bgPreview.style.background = "#dddeee";
  document.body.style.background = "#dddeee";
  bgFileRemoveBtn.style.display = "none";
});

// background preferences
function changeBackgroundPreferences() {
  document.body.style.backgroundSize = document.getElementById("bg-size").value;
  document.body.style.backgroundRepeat =
    document.getElementById("bg-repeat").value;
  document.body.style.backgroundPosition =
    document.getElementById("bg-position").value;
  document.body.style.backgroundAttachment =
    document.getElementById("bg-attachment").value;
}
document
  .getElementById("bg-size")
  .addEventListener("change", changeBackgroundPreferences);
document
  .getElementById("bg-repeat")
  .addEventListener("change", changeBackgroundPreferences);
document
  .getElementById("bg-position")
  .addEventListener("change", changeBackgroundPreferences);
document
  .getElementById("bg-attachment")
  .addEventListener("change", changeBackgroundPreferences);
// document.getElementById("bg-repeat").addEventListener("change", function () {
//   document.body.style.backgroundRepeat =
//     document.getElementById("bg-repeat").value;
//   document.body.style.backgroundRepeat =
//     document.getElementById("bg-repeat").value;
//   document.body.style.backgroundPosition =
//     document.getElementById("bg-position").value;
//   document.body.style.backgroundAttachment =
//     document.getElementById("bg-attachment").value;
// });

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

function handlePresetColorsParent(e) {
  const child = e.target;
  if (child.className === "color-box") {
    navigator.clipboard.writeText(e.target.getAttribute("data-color"));
    copySound.play();
    copySound.volume = 0.6;
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

function generateColorBox(color) {
  const div = document.createElement("div");
  div.className = "color-box";
  div.style.backgroundColor = color;
  div.setAttribute("data-color", color);

  return div;
}

function displayColorBoxes(parent, colors) {
  colors.forEach((color) => {
    if (isValidHex(color.slice(1))) {
      const colorBox = generateColorBox(color);
      parent.appendChild(colorBox);
    }
  });
}

displayColorBoxes(document.getElementById("preset-colors"), presetColor);

function removeChildren(parent) {
  let child = parent.lastElementChild;
  while (child) {
    parent.removeChild(child);
    child = parent.lastElementChild;
  }
}

// utils
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
