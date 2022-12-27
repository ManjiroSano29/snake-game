import { getInputDirection } from "./input.js"

export const snakeSpeed = 5 //thời gian chạy 5 lần 1 giây
const snakeBody = [ {x: 16, y: 16} ] 
let newSegment = 0

// xác định tọa độ của con rắn, đặt nó bắt đầu ở chính giữa màn hình

//rắn chạy 
export function updateSnake(){
    addSegment()
    const inputDirection = getInputDirection()
    for(let i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i+1] = {...snakeBody[i]}
    }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

//tạo hình con rắn
export function drawSnake(gameBoard){
    snakeBody.forEach(segmemt => {
        const snakeEl = document.createElement("div")
        snakeEl.style.gridRowStart = segmemt.y
        snakeEl.style.gridColumnStart = segmemt.x
        snakeEl.classList.add("snake")
        gameBoard.appendChild(snakeEl)
    })
}

export function expandSnake(amount){
    newSegment += amount
}

export function onSnake(position, {ignoreHead = false} = {}){
    return snakeBody.some((segment, index) => {
        if(ignoreHead && index == 0) return false
        return equalPosition(segment, position)
    })
}

function equalPosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegment(){
    //nhân bản đoạn đuôi của con rắn tức là khi ăn thì rắn dài thêm 1 ô
    for(let i = 0; i < newSegment; i++){
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }
    newSegment = 0 //tránh việc ăn 1 lần thì dài ra vĩnh viễn
}

export function snakeHead(){
    return snakeBody[0]
}

export function snakeIntersection(){
    return onSnake(snakeBody[0], {ignoreHead: true})
}