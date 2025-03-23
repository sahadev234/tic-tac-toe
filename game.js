let boxes = document.querySelectorAll(".area");
let reset = document.querySelector("#reset");
let msg = document.querySelector(".msg");
let draw = document.querySelector(".msgdraw");
let newGame = document.querySelector("#newgame");
let turnO = true;
let counter = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((element) => {
  element.addEventListener("click", () => {
    counter++;

    if (turnO) {
      element.innerText = "X";
      element.style.color = "blue";
      turnO = false;
    } else {
      element.innerText = "O";
      element.style.color = "green";
      turnO = true;
    }
    element.disabled = true;

    // First, check if there's a winner
    if (checkWinner()) {
      return; // Stop further execution if there's a winner
    }

    // If no winner and all boxes are filled, declare a draw
    if (counter === 9) {
      showDraw();
    }
  });
});

const resetBtn = () => {
  turnO = true;
  enableBtn();
  msg.classList.add("hide");
  draw.classList.add("hide");
  counter = 0;
};

const disableBtn = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBtn = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, the winner is ${winner}`;
  msg.classList.remove("hide");
  disableBtn();
};

const showDraw = () => {
  draw.innerText = `The game is a draw`;
  draw.classList.remove("hide");
  disableBtn();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let pos1Val = boxes[a].innerText;
    let pos2Val = boxes[b].innerText;
    let pos3Val = boxes[c].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return true;
    }
  }
  return false;
};

newGame.addEventListener("click", resetBtn);
reset.addEventListener("click", resetBtn);
