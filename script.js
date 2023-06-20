// GET ELEMENTS
const optionsXO = document.querySelectorAll('#option')
const wrapperGame = document.querySelector('.game-wrapper')
const body = document.querySelector('body')
const resetButton = document.querySelector('#reset-btn')
const gameResetButton = document.querySelector('#game-reset-btn')

const scoreDivX = document.querySelector('.x')
let scoreX = 0
const scoreDivO = document.querySelector('.o')
let scoreO = 0
const scoreDivDraw = document.querySelector('.draw')
let scoreDraw = 0

let playAgainButton
let titleWinner
let counter = 0

activeEvent()

// EVENTS

resetButton.addEventListener('click', allReset)
gameResetButton.addEventListener('click', gameReset)

// FUNCTIONS

function activeEvent() {
    optionsXO.forEach((item) => {
        item.addEventListener('click', writeXO)
    })
}

function writeXO(e) {
    const targetClick = e.target
    if (targetClick.innerText === '') {
        const targetClick = e.target
        if (counter % 2 === 0) {
            targetClick.classList.add('red')
            targetClick.innerText = 'X'
            counter++
        } else {
            targetClick.classList.add('yellow')
            targetClick.innerText = 'O'
            counter++
        }
    }
    verifyWin()
}

function verifyWin() {
    if (optionsXO[0].innerText != '' 
        && optionsXO[0].innerText === optionsXO[1].innerText 
        && optionsXO[0].innerText === optionsXO[2].innerText) {
        winner(optionsXO[0], optionsXO[1], optionsXO[2])
        return
    }

    if (optionsXO[0].innerText != ''
        && optionsXO[0].innerText === optionsXO[3].innerText
        && optionsXO[0].innerText === optionsXO[6].innerText) {
        winner(optionsXO[0], optionsXO[3], optionsXO[6])
        return
    }

    if (optionsXO[0].innerText != ''
        && optionsXO[0].innerText === optionsXO[4].innerText
        && optionsXO[0].innerText === optionsXO[8].innerText) {
        winner(optionsXO[0], optionsXO[4], optionsXO[8])
        return
    }

    // -----------------
     
    if (optionsXO[1].innerText != '' 
        && optionsXO[1].innerText === optionsXO[4].innerText 
        && optionsXO[1].innerText === optionsXO[7].innerText) {
        winner(optionsXO[1], optionsXO[4], optionsXO[7])
        return
    }

    if (optionsXO[2].innerText != ''
        && optionsXO[2].innerText === optionsXO[5].innerText
        && optionsXO[2].innerText === optionsXO[8].innerText) {
        winner(optionsXO[2], optionsXO[5], optionsXO[8])
        return
    }

    if (optionsXO[2].innerText != ''
        && optionsXO[2].innerText === optionsXO[4].innerText
        && optionsXO[2].innerText === optionsXO[6].innerText) {
        winner(optionsXO[2], optionsXO[4], optionsXO[6])
        return
    }

    // -----------------

    if (optionsXO[3].innerText != ''
        && optionsXO[3].innerText === optionsXO[4].innerText
        && optionsXO[3].innerText === optionsXO[5].innerText) {
        winner(optionsXO[3], optionsXO[4], optionsXO[5])
        return
    }

    if (optionsXO[6].innerText != ''
        && optionsXO[6].innerText === optionsXO[7].innerText
        && optionsXO[6].innerText === optionsXO[8].innerText) {
        winner(optionsXO[6], optionsXO[7], optionsXO[8])
        return
    }

    if (optionsXO[0].innerText != ''
        && optionsXO[1].innerText != ''
        && optionsXO[2].innerText != '' 
        && optionsXO[3].innerText != ''
        && optionsXO[4].innerText != '' 
        && optionsXO[5].innerText != ''
        && optionsXO[6].innerText != '' 
        && optionsXO[7].innerText != ''
        && optionsXO[8].innerText != '') {
            draw()
        }
}

function winner(element1, element2, element3) {
    element1.classList.add('win')
    element2.classList.add('win')
    element3.classList.add('win')

    optionsXO.forEach((item) => {
        item.removeEventListener('click', writeXO)
    })

    wrapperGame.classList.add('fade-out')

    setTimeout(() => {
        if (element1.innerText === 'X') {
            scoreX = scoreX + 1
            if (scoreX === 5) {
                resetScores()
                winScreen('X')
                return
            }
            updateScore()
        } else {
            scoreO = scoreO + 1
            if (scoreO === 5) {
                resetScores()
                winScreen('O')
                return
            }
            updateScore()
        }
        createPlayAgainButton()
        hideGameWrapper()
    }, 650)
}

function playAgain() {
    counter = 0
    resetClass('win')
    resetClass('yellow')
    resetClass('red')
    activeEvent()

    if (titleWinner) {
        titleWinner.classList.add('hide-all')
    }
    playAgainButton.classList.add('hide-all')
    wrapperGame.classList.remove('hide')
}

function draw() {
    wrapperGame.classList.add('fade-out')

    setTimeout(() => {
        createPlayAgainButton()
        hideGameWrapper()

        scoreDraw = scoreDraw + 1
        updateScore()
    }, 650)
}

function gameReset() {
    counter = 0
    resetClass('red')
    resetClass('yellow')
}

function allReset() {
    counter = 0
    resetScores()
    resetClass('win')
    resetClass('red')
    resetClass('yellow')
}

function winScreen(winner) {
    wrapperGame.classList.add('fade-out')

    setTimeout(() => {
        titleWinner = document.createElement('h1')
        titleWinner.innerText = `${winner} winner!`
        titleWinner.classList.add('title-winner')
        body.appendChild(titleWinner)

        createPlayAgainButton()
        hideGameWrapper()
    }, 500)
}

// RECYCLE FUNCTIONS

function resetClass(classRemove) {
    optionsXO.forEach((item) => {
        item.innerText = ''
        item.classList.remove(classRemove)
    })
    console.log(optionsXO)
}

function updateScore() {
    scoreDivX.innerText = `X: ${scoreX}`
    scoreDivO.innerText = `O: ${scoreO}`
    scoreDivDraw.innerText = `Draw: ${scoreDraw}`
}

function hideGameWrapper() {
    wrapperGame.classList.add('hide')
    wrapperGame.classList.remove('fade-out')
}

function createPlayAgainButton() {
    playAgainButton = document.createElement('button')
    playAgainButton.innerText = 'Play Again'
    playAgainButton.classList.add('play-again-btn')
    playAgainButton.addEventListener('click', playAgain)
    body.appendChild(playAgainButton)

    return playAgainButton
}

function resetScores() {
    scoreX = 0
    scoreO = 0
    scoreDraw = 0
    updateScore()
}