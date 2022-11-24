const button = document.getElementById("color-btn");
const inputColor = document.getElementById("input-color");
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
