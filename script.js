let boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newgamebtn = document.querySelector(".btn");

let CurrentPlayer;
let gameGrid;

const WinningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// initializing game

function initGame(){
    CurrentPlayer = "X";
    gameGrid = [ "","","","","","","","",""];
    boxes.forEach((box, index) =>{
        box.innerHTML = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
    });
    newgamebtn.classList.remove("active");
    gameinfo.innerHTML = `Current Player - ${CurrentPlayer}`
}

initGame();

function checkGameover(){
    let answer = "";

    WinningPosition.forEach(position => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "0";

            boxes.forEach(box =>{
                box.style.pointerEvents = "none";
            });
            
            boxes[position[0]].classList.add("win");    
            boxes[position[1]].classList.add("win");    
            boxes[position[2]].classList.add("win");    
        }
    });

    if(answer !== ""){
        gameinfo.innerHTML = `Winner Player - ${answer}`;
        newgamebtn.classList.add("active");
        return;
    }

    let count =0;
    gameGrid.forEach(box =>{
        if(box !== ""){
            count++;
        }
    });

    if(count === 9){
        gameinfo.innerHTML = "Game Tied !";
        newgamebtn.classList.add("active");
    }
}

function HandleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = CurrentPlayer;
        gameGrid[index] = CurrentPlayer;
        boxes[index].style.pointerEvents = "none"
        swapTurn();
        checkGameover();
    }
}

function swapTurn(){
    if(CurrentPlayer === "X"){
        CurrentPlayer = "0";
    }
    else{
        CurrentPlayer = "X";
    }

    gameinfo.innerHTML = `Current Player - ${CurrentPlayer}`;
}

boxes.forEach((box, index) => {
    box.addEventListener("click", ()=>{
        HandleClick(index);
    })
});

newgamebtn.addEventListener("click",initGame);
