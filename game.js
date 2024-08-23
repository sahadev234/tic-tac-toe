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
    element.addEventListener("click",() =>{
       btnClick();
       if (counter===9){
        showDraw();
       }
        if (turnO===true){
           element.innerText="X";
           element.style.color="blue";
            
            turnO=false;
        }
        else{
            element.innerText="O";
            turnO=true;
            element.style.color="green";
        }
      element.disabled=true;
      checkWinner();
      
    })
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
     for(let pattern of winPatterns){
        let pos1Val =boxes[pattern[0]].innerText;
        let pos2Val =boxes[pattern[1]].innerText;
        let pos3Val =boxes[pattern[2]].innerText;
     
     if (pos1Val!=""&&pos2Val!=""&&pos3Val!=""){
        if (pos1Val===pos2Val&&pos2Val===pos3Val){
            console.log("Winner",pos1Val);
            showWinner(pos1Val);
        }

     }
   
    
    }  
};
newGame.addEventListener("click",resetBtn);
reset.addEventListener("click",resetBtn);