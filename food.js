import {expandSnake, onSnake} from "./snake.js"
import {randomGridPosition} from "./grid.js"

let food = randomFoodPosition()
const expansionRate = 3

export function updateFood(){
    //nếu rắn chạm vào thức ăn thì sẽ dài ra và thức ăn sẽ xuất hiện ở 1 vị trí ngẫu nhiên
    if(onSnake(food)){
        expandSnake(expansionRate)
        food = randomFoodPosition()
    }
}

//tạo hình thức ăn
export function drawFood(gameBoard){
    const foodEl = document.createElement("div")
    foodEl.style.gridRowStart = food.y
    foodEl.style.gridColumnStart = food.x
    foodEl.classList.add("food")
    gameBoard.appendChild(foodEl)
}

function randomFoodPosition(){
    let newFoodPosition
    //mỗi lần rắn ăn được thì chọn ra vị trí ngẫu nhiên mới để xuất hiện thức ăn
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}



