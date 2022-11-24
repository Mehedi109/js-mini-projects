const button = document.getElementById("color-btn");
const inputColor = document.getElementById("input-color");
const copyBtn = document.getElementById("copy-btn");
let div = null;
// const body = document.getElementById("body");

const generateColor = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  const hex = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
  return hex;
};

// window.onload = () => {
button.onclick = () => {
  //   document.body.classList.toggle("bg-color");
  // console.log(rgb);
  document.body.style.backgroundColor = generateColor();
  inputColor.value = generateColor();
};
// };

copyBtn.onclick = () => {
  navigator.clipboard.writeText(inputColor.value);
  if (div === null) {
    generateToastMessage(inputColor.value);
  }

  // if (div !== null) {
  //   div.remove();
  //   div = null;
  // }
  // generateToastMessage(inputColor.value);
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
