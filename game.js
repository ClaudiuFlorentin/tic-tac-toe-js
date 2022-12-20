const gameScore = document.querySelector('.game-score')
const gameOverText = document.querySelector('.game-over-text')
const gameOverRestart = document.querySelector('.game-over-restart')
const boardCells = document.querySelectorAll('.board-cell')

const game = {
    xTurn: false,
    xState: [],
    oState: [],
    xScore: 0,
    oScore: 0,
    scoreState: false,
    winningState: [
        // winnings for rows
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],

        //winnings for columns
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],

        //winnings for diagonal
        ['0', '4', '8'],
        ['2', '4', '6']
    ]
}


window.addEventListener('load', () => {
    game.xScore = localStorage.getItem('xScore')
    game.oScore = localStorage.getItem('oScore')

    if(game.xScore === null || game.oScore === null) {
        localStorage.setItem('xScore', 0)
        localStorage.setItem('oScore', 0)
    }

    if(game.xScore > 0 || game.oScore > 0) {
        gameScore.textContent = `(X) ${localStorage.getItem('xScore')} - ${localStorage.getItem('oScore')} (O)`
    }
})

document.addEventListener('click', (e) => {
    const target = e.target
    const isCell = target.classList.contains('board-cell')
    const isDisabled = target.classList.contains('disabled')

    if(isCell && !isDisabled) {
        const cellValue = target.dataset.value

        game.xTurn === true
            ? game.xState.push(cellValue)
            : game.oState.push(cellValue)

        target.classList.add('disabled')
        target.classList.add(game.xTurn ? 'x' : 'o')

        game.xTurn = !game.xTurn;

        if(!document.querySelectorAll('.board-cell:not(.disabled)').length) {
            gameOverRestart.classList.add('visible')
            gameOverText.textContent = 'Draw!'
        }

        game.winningState.forEach(winningState => {
            const xWins = winningState.every(state => game.xState.includes(state))
            const oWins = winningState.every(state => game.oState.includes(state))

            if(xWins || oWins) {
                boardCells.forEach(cell => cell.classList.add('disabled'))
                gameOverRestart.classList.add('visible')

                if(xWins) {
                    gameOverText.textContent = 'X Wins!'
                    localStorage.setItem('xScore', ++game.xScore)
                } else {
                    gameOverText.textContent = 'O Wins!'
                    localStorage.setItem('oScore', ++game.oScore)
                }

                gameScore.textContent = `(X) ${localStorage.getItem('xScore')} - ${localStorage.getItem('oScore')} (O)`
            }
        });
    }
})

gameOverRestart.addEventListener('click', () => {
    gameOverText.textContent = ''
    gameOverRestart.classList.remove('visible')
    boardCells.forEach(cell => {
        cell.classList.remove('disabled', 'x', 'o')
    })

    game.xTurn = true
    game.xState = []
    game.oState = []
})