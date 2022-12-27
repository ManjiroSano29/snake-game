import { snakeSpeed, updateSnake, drawSnake, snakeHead, snakeIntersection } from "./snake.js"
import { updateFood, drawFood } from "./food.js"
import {outSideGrid} from "./grid.js"

let lastTimeRender = 0
let gameOver = false
const gameBoard = document.getElementById("game-board")

//hàm này chạy trò chơi lặp đi lặp lại đến khi nào nó thua
function mainGame(currentTime){ 
    if(gameOver){
        if(confirm("You lost. Click OK to restart")){
            window.location = "/game.html"
        }
        return
    }

    //luôn đảm bảo sẽ chạy đoạn code animation ngay trước những lần trình duyệt tiến hành repaint trang web
    window.requestAnimationFrame(mainGame) 
    const timeSinceLastRender = (currentTime - lastTimeRender) / 1000
    if(timeSinceLastRender < 1 / snakeSpeed) return
    lastTimeRender = currentTime
    update()
    draw()
}

window.requestAnimationFrame(mainGame)

function update(){
    updateSnake()
    updateFood()
    checkLose()
}

function draw(){
    gameBoard.innerHTML = "" 
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

//kiểm tra nếu rắn ra ngoài "sân chơi" hoặc tự nó đâm vào thân thì thua
function checkLose(){
    gameOver = outSideGrid(snakeHead()) || snakeIntersection()
}