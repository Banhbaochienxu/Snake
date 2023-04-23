const canvas = document.getElementById('canvas');
const ctx = canvas.getContext( "2d");

const ROW = 15;
const COL = 30;
const SQ = 40;
const COLOR = "WHITE";
let score = 0;

function DrawSquare(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
}

let broad = []
for (c = 0; c < COL; c++){
    broad[c] = []
    for (r = 0; r < ROW; r++){
        broad[c][r] = COLOR;
    }
}

function DrawBoard(){
    for (c = 0; c < COL; c++){
        for (r = 0; r < ROW; r++){
            DrawSquare(c,r,COLOR);
        }
    }
}

DrawBoard()

class Snake {
    constructor(color){
        this.size = 2;
        this.speed = 8;
        this.color = color
        this.direction = 'right';
        
        this.x = 2;
        this.y = 8;
        this.body = [];
        
        this.foodX ;
        this.foodY;
    }

    fill(color){
        DrawSquare(this.x,this.y,color);
        if(this.x == this.foodX && this.y == this.foodY){
            score += 10
            this.size +=2;
            this.randomApple()          
            document.querySelector('.score').innerText = score;
            if(score % 100 == 0){
                this.speed++;
            }
        }
        if(color != COLOR){
            for (let x of this.body) {
                if(this.x == x[0] && this.y == x[1]){
                    alert("gameOver\nScore: " + score)
                    gameOver = true
                    break;
                }
            }
        }
        this.body.push([this.x,this.y,color])
        for (let x of this.body) {
            DrawSquare(x[0],x[1],color)
        }
        if(this.size < this.body.length)
        {
            this.body.shift();
        }
        
    }
    Draw(){
        this.fill(this.color);
    }
    UnDraw(){
        this.fill(COLOR);
    }
    MoveLeft(){
        if(this.x < 0){
            this.x = COL +1
        }
        this.UnDraw();
        this.x --;
        this.Draw();
    }
    MoveRight(){  
        if(this.x > COL){
            this.x = -1
        }
        this.UnDraw();
        this.x ++;
        this.Draw();
    }
    MoveDown(){
        if(this.y > ROW){
            this.y = -1
        }
        this.UnDraw();
        this.y ++;
        this.Draw();
    }
    MoveUp(){
        if(this.y < 0){
            this.y = ROW + 1
        }
        this.UnDraw();
        this.y --;
        this.Draw();
    }
    randomApple(){
        this.foodY = Math.floor(Math.random() * ROW);
        this.foodX = Math.floor(Math.random() * COL);
        for (let x of this.body) {
            if(this.foodX == x[0] && this.foodY == x[1]){
                this.randomApple()
            }
        }
        DrawSquare(this.foodX,this.foodY,'red');
    }
}

snake = new Snake('green')

document.addEventListener('keydown', function(e){
    if(e.keyCode == 37 && snake.direction != 'right'){
        snake.direction = 'left';
    }
    else if(e.keyCode == 38 && snake.direction != 'down'){
        snake.direction = 'up';
    }
    else if(e.keyCode == 39 && snake.direction != 'left'){
        snake.direction = 'right';
    }
    else if(e.keyCode == 40 && snake.direction != 'up'){
        snake.direction = 'down';
    }
})

let gameOver = false
function go(){
    time = setInterval(function(){
        if(!gameOver){
            if(snake.direction == 'right'){
                snake.MoveRight();
            } 
            if(snake.direction == 'left'){
                snake.MoveLeft();
            }
            if(snake.direction == 'up'){
                snake.MoveUp();
            }
            if(snake.direction == 'down'){
                snake.MoveDown();
            }    
        }
        else{
            clearInterval(time);
            location.reload();
        }
    }, 1000/snake.speed)
}

function start(){
    const btnStart = document.querySelector('.btn-start')
    btnStart.style.display = 'none'
    snake.randomApple();
    go();
}

