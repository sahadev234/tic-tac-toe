let boxes=document.querySelectorAll(".area");
let reset=document.querySelector("#reset");
let msg=document.querySelector(".msg");
let draw=document.querySelector(".msgdraw");
let msgContainer=document.querySelector("#msgContainer");
let hidden=document.querySelector(".hide");
let newGame=document.querySelector("#newgame");
let turnO=true;
let counter=0;

const winPatterns=
[
[0,1,2],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[2,4,6],
[3,4,5],
[6,7,8],
];

let btnClick= () =>{
  counter++;
}

boxes.forEach((element) => {
    element.addEventListener("click", () => {
        btnClick();

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
        checkWinner();
        
        // Only check for a draw if no winner has been declared
        if (counter === 9 && !msg.classList.contains("hide")) {
            showDraw();
        }
    });
});

const resetBtn= () =>{
    turnO=true;
    enableBtn();
    msg.classList.add("hide");
    draw.classList.add("hide");
    counter=0;
};
const disableBtn= () =>{
    for(let box of boxes)
        {box.disabled=true;}
};
const enableBtn= () =>{
    for(let box of boxes)
        {box.disabled=false;
            box.innerText="";
        }
};
const showWinner= (winner) => {
    msg.innerText=`Congratulations,the winner is ${winner}`;
    msg.classList.remove("hide");
    disableBtn();
};
const showDraw= () => {
    draw.innerText=`The game is draw`;
    draw.classList.remove("hide");
    disableBtn();

};
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log("Winner:", pos1Val);
            showWinner(pos1Val);
            return; // Stop checking further once a winner is found
        }
    }

    // If no winner is found and all boxes are filled, declare a draw
    if (counter === 9) {
        showDraw();
    }
};

newGame.addEventListener("click",resetBtn);
reset.addEventListener("click",resetBtn);
