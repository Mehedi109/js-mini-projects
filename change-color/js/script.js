const button = document.getElementById("color-btn");
const inputColor = document.getElementById("input-color");
// const body = document.getElementById("body");

const generateColor = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  const rgb = `rgb(${red},${green},${blue})`;
  return rgb;
};

// window.onload = () => {
button.onclick = () => {
  //   document.body.classList.toggle("bg-color");
  // console.log(rgb);
  document.body.style.backgroundColor = generateColor();
};
// };
