//constants and variables

let inputDir={x:0,y:0} ; //this object defines direction of snake inititially it is zero i.e. snake is still
const foodSound= new Audio('music/food.mp3'); //the sound that plays when snake eats something
const gameOverSound=new Audio('music/gameover.mp3'); //the sound on the game being over
const moveSound =new Audio('music/move.mp3');//sound that plyas when snake moves
const musicSound = new Audio('music/music.mp3');//everytime plays
let speed=7;
let lastPaintTime=0;
let score=0;
let snakeArr=[
    {  x:13,y:15}  //at start snake will be at these dimensions
]


food={x:8,y:7}; //food array nhi hai srf ek particle h  snake will inc but not food
//functions
//game loop  -->paints again nd again


function main(ctime){    //current time   ...this becomes game loop
    window.requestAnimationFrame(main); 
    // console.log(ctime);     
//this we do to decrease fps
    if((ctime-lastPaintTime)/1000 <  1/speed){
        return;   //jb k tym km hai tb tk render na ho means tb tk dubara paint na ho
    }     //lastPaintTime is kb last time puri screen paint hui thi   //kitne kitne second baad screen ko render krna chahte hai 
  lastPaintTime=ctime;
  gameEngine();

}
function Collide(snake){
    //if u bump into yourself
    for(let index=1;index<snakeArr.length;index++){
        if(snake[index].x === snake[0].x && snake[index].y === snake[0].y){
            return true;
        }} 

        //if bump into wall
        if(snake[0].x>=18 || snake[0].x<=0 ||  snake[0].y>=18 || snake[0].y<=0){  
            return true;
        
    }
    return false;


}


function gameEngine(){ //will help u play game ...will do 2 things to update snake array(body parts of snake) & food and then display it(render snake nd food)
   //part1   updatingg (agr snake eats to kya krna and if it keeps on moving then what)
    if(Collide(snakeArr)){  //if snake collides 
        gameOverSound.play(); //play this
        musicSound.pause();  //stop this
        inputDir={x:0,y:0}; //now input dir becomes initial ones 
        alert("Game Over.Press any key to play again!!!!!"); //aleart message comes 
        snakeArr=[{x:13,y:15}]; //again snake and food visible for new game
        musicSound.play();
        score=0; //score again 0

    }
    //0-9 k beech random no 
    //if food eaten increment score and regenerate food
    //when will snkae eat foood? when the coordinates get same so
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score+=1;
        if(score>hiscoreval){   //localStorage.clear can be run to clear local storage 
            hiscoreval=score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HighScore: " + hiscoreval;
        }
        scoreBox.innerHTML="Score :" +score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});  //uske head k aage k aur piece lgadenge taki uski length bdh jaye
        let a= 2;  //grid size(0-18)
        let b=16; //to uske beech m khin food rhega
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}  //new food generate randomly

    }
    //MOVING THE SNAKE 
    //update its x and y
    //har segment ko uske aage wale segment p rkhde
    //head aajayega ek kdam aage jis direction m wo chlra 
    //iterate on bull body
    for (let i = snakeArr.length - 2; i>=0; i--) {  //second last element se start 
        snakeArr[i+1] = {...snakeArr[i]};  //why not snakeArr[i]..it will not move  //destructuringg ...new object bnaya hai  referencing theek rhegi 
    }

    snakeArr[0].x += inputDir.x;  //head ko input me add 
    snakeArr[0].y += inputDir.y;

   //part2 
   //display the snake 
   board.innerHTML="";  //hum nhi chahte ki board k andr kuc ho //board ko khali krenge
   snakeArr.forEach((e,index)=>{ //jaise jaise snake kuch khayega we'll ade something to its tail
       snakeElement=document.createElement('div');  //create new element 
       snakeElement.style.gridRowStart = e.y; //rows hongi neevhe so y
       snakeElement.style.gridColumnStart = e.x;  //columns in horizontal dir dur hongi
      
       if(index===0){
        snakeElement.classList.add('head')   //if index 0 then we have to add snake  head also
       }
       else{
        snakeElement.classList.add('snake')
       }
     //head add krdia snake ka 
       board.appendChild(snakeElement);  //board me snakeelem ko append krdia

   
   
    })

    //display food

    foodElement=document.createElement('div');  //create new element 
    foodElement.style.gridRowStart = food.y; //rows hongi neevhe so y
    foodElement.style.gridColumnStart = food.x;  //columns in horizontal dir dur hongi
    foodElement.classList.add('food') //food ko add krna h in class
    board.appendChild(foodElement);  //board me snakeelem ko append krdia


}

//Main logic 


musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){   //agr highscore null hai to usko 0 set krdo
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))  //direct 0 nhi dete wo string ki form m hi accept krta h 
    
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Highscore:" + hiscore;  //jo index.html m highscore box hai usko access krne k liye
}

window.requestAnimationFrame(main);   //ye main ko fire krega but baar baar nhi 
window.addEventListener('keydown', e =>{  //koi bhi key press krega to game start hojayegu
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();  //user gets to know game has started 
    switch (e.key) {  //konsi key press hui h 
        case "ArrowUp":
            console.log("ArrowUp");   
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});