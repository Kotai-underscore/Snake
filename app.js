document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0
    let appleIndex = 0
    let currentSnake = [2,1,0]
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    // to startBtn, and restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 800
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)

    }

    // function that deals with All the ove outcomes of the Snake
    function moveOutcomes() {

        // deals with snake hitting border and snake hitting self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || // if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') //if snakee goes into itself
        ) {
            return clearInterval(interval) //this will clear the interval if any of the above happen
        }

        const tail = currentSnake.pop() //removes last ite of the array and shows it
        squares[tail].classList.remove('snake') //removes class of snake from the Tail
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

        // deals with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    //generate new apple once apple is eaten
    function randomApple() {
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake')) //making sure apples
        squares[appleIndex].classList.add('apple')
    }








    // assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake') //we are removing the class of snake from All the square
        console.log(e)

        if(e.key ==='ArrowRight') {
            direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
        } else if (e.key ==='ArrowUp') {
            direction = -width //if we press the up arrow, the snake will go up
        } else if (e.key ==='ArrowLeft') {
            direction = -1 //if we press the left arrow, the snake will go left
        } else if (e.key ==='ArrowDown') {
            direction = +width //if we press the down arrow, the snake will instantly appear
        }
    }
    
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)





})