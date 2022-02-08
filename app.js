const canvas = document.querySelector("canvas");
const form = document.querySelector(".signature-form");
const clearBtn = document.querySelector(".clear");
const ctx = canvas.getContext("2d");
let writing = false;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const imgurl = canvas.toDataURL();
  const img = document.createElement("img");
  img.src = imgurl;
  img.height = canvas.height;
  img.width = canvas.width;
  img.style.display = "block";
  form.appendChild(img);
  clearPad();
});
const clearPad = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
clearBtn.addEventListener("click", (event) => {
  event.preventDefault();
  clearPad();
});
const getTarget = (event) => {
  let posX = event.clientX - event.target.getBoundingClientRect().x;
  //Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
  //top,left ,bottom,x,y,right  describe the position and size of the overall rectangle in pixels.

  let posY = event.clientY - event.target.getBoundingClientRect().y;
  return [posX, posY];
};
const handlePointerMove = (event) => {
  if (!writing) {
    return;
  }
  const [posX, posY] = getTarget(event);
  ctx.lineTo(posX, posY);
  ctx.stroke(); //this is for to fill line
};
const handlePointerUp = () => {
  writing = false;
};
const handlePointerDown = (event) => {
  writing = true;
  ctx.beginPath();
  const [posX, posY] = getTarget(event);
  ctx.moveTo(posX, posY);
};
ctx.lineWidth = 3;
ctx.lineJoin = ctx.lineCap = "round";

canvas.addEventListener("pointerdown", handlePointerDown, { passive: true });
canvas.addEventListener("pointerup", handlePointerUp, { passive: true });
canvas.addEventListener("pointermove", handlePointerMove, { passive: true });
