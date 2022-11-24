const colorButton = document.getElementById("color-btn");
const inputColor = document.getElementById("input-color");
const copyBtn = document.getElementById("copy-btn");
const hash = document.getElementById("hash");
let div = null;
const body = document.getElementById("body");

const generateColor = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  const hex = `${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
  return hex;
};

colorButton.onclick = () => {
  //   document.body.classList.toggle("bg-color");
  // console.log(rgb);
  document.body.style.backgroundColor = `#${generateColor()}`;
  inputColor.value = generateColor();
};

copyBtn.onclick = () => {
  navigator.clipboard.writeText(`#${inputColor.value}`);
  // if (div === null) {
  //   generateToastMessage(inputColor.value);
  // }

  if (div !== null) {
    div.remove();
    div = null;
  }
  // generateToastMessage(inputColor.value);

  if (isValidHex(inputColor.value)) {
    generateToastMessage(`#${inputColor.value}`);
  } else {
    alert("Invalid color code");
  }
};

inputColor.addEventListener("keyup", function (e) {
  const color = e.target.value;
  if (color) {
    inputColor.value = color.toUpperCase();
    if (isValidHex(color)) {
      body.style.backgroundColor = `#${color}`;
    }
  }
});

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
