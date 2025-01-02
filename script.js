let gameContainer=document.querySelector(".game-container");
let scoreContainer=document.querySelector(".score-container");
let foodX,foodY;
let headX=12,headY=12;
let velocityX=0,velocityY=0;
let snakeBody=[];
let score=0;




function generatefood(){
    foodX= Math.floor(Math.random()*25)*1;
    foodY= Math.floor(Math.random()*25)*1;
    for (let i=0;i<snakeBody.length;i++){
        if(snakeBody[i][0]==foodY&&snakeBody[i][0]==foodX){
            generatefood();
        }
    }

}
function Gameover(){
    headX=12;
    headY=12;
    alert("Game Over") 
    window.alert("your score:"+score);
    snakeBody.length=0;
    score=0;
    scoreContainer.innerHTML="Score:"+score;
    generatefood();
    velocityX=0;
    velocityY=0;

}



function renderGame(){
    let updateGame=`<div class="food" style="grid-area:${foodY}/${foodX};"></div>`;

    if (foodX==headX && headY==foodY){
        snakeBody.push([foodX,foodY]);
        generatefood();
        score+=1;
        scoreContainer.innerHTML="Score:"+score;
    }


    snakeBody.pop();
    headX+=velocityX;
    headY+=velocityY;
    snakeBody.unshift([headX,headY]);
    if (headX==0||headY==0||headX==26||headY==26){
        Gameover();
    }
    for(let i=1;i<snakeBody.length;i++){
        if(snakeBody[0][0]==snakeBody[i][0]&&snakeBody[0][1]==snakeBody[i][1]){
            Gameover();
        }
    }
    for(let i=0;i<snakeBody.length;i++){
        updateGame +=`<div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;
    }
    // updateGame += `<div class="snake" style="grid-area:${headY}/${headX};"></div>`;
    gameContainer.innerHTML=updateGame;

}
generatefood()
renderGame()
setInterval(renderGame,150);

document.addEventListener("keydown",function(e){
    console.log(e.key);
    let key=e.key;
    if (key=="ArrowUp"&&velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }
    else if(key=="ArrowDown"&&velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }
    else if(key=="ArrowLeft"&&velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }
    else if(key=="ArrowRight"&&velocityX!=-1){
        velocityX=1;
        velocityY=0;
    }
})


