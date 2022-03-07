// Declaracion de constantes

const STATUS_DISPLAY = document.querySelector('.game-notification'),
    CHAR_1 = 'X', // SKULL '\u2620'
    CHAR_2 = 'O', // BIOHAZARD SIGN '\u2623'
    GAME_STATE = ['', '', '', '', '', '', '', '',''],
    WINNINGS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    WIN_MESSAGE = () => `El jugador ${current_player} ha ganado!`,
    DRAW_MESSAGE = () => `El juego ha terminado en empate!`,
    CURRENT_PLAYER_TURN = () => `Turno para ${current_player}`


// Declaracion de variables

let game_active = true,
    current_player = CHAR_2 
    score1 = 0,
    score2 = 0
    player1_score = document.querySelector('.player1')
    player2_score = document.querySelector('.player2')

// Funciones

function main() {
    handleStatusDisplay(CURRENT_PLAYER_TURN())
    listener()
}

function handleStatusDisplay(message) {
    STATUS_DISPLAY.innerHTML = message
}

function listener() {
    document.querySelector('.game-container').addEventListener('click', handleCellClick)
    document.querySelector('.game-restart').addEventListener('click', handleRestartGame)
}

function scoreGame(player) {
    if (player === CHAR_1) {
        score1 += 1 
    }
    if (player === CHAR_2) {
        score2 += 1
    }
    
    player1_score.innerText = CHAR_1 + '  ' + score1
    
    player2_score.innerText = score2 + '  ' + CHAR_2
}

function handleCellClick(clickedEvent) {
    const clickedCell = clickedEvent.target

    if (clickedCell.classList.contains('game-cell')) {
        const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
        if (GAME_STATE[clickedCellIndex] !== '' || !game_active) {
            return
        }

        handleCellPlayed(clickedCell, clickedCellIndex)
        handleResultValidation()
    }
}

function handleRestartGame() {
    game_active = true
    current_player = CHAR_1
    restartGameBoard()
    handleStatusDisplay(CURRENT_PLAYER_TURN())
    document.querySelectorAll('.game-cell').forEach(cell => cell.innerText = '')
}

function restartGameBoard() {
    let i = GAME_STATE.length
    while (i--) {
        GAME_STATE[i] = ''
    }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    GAME_STATE[clickedCellIndex] = current_player
    clickedCell.innerText = current_player    
}

function handleResultValidation() {
    let roundWon = false

    for (let i = 0; i < WINNINGS.length; i++) {
        const win_condition = WINNINGS[i];
        let position1 = GAME_STATE[win_condition[0]],
            position2 = GAME_STATE[win_condition[1]],
            position3 = GAME_STATE[win_condition[2]]
            
            if (position1 === '' || position2 === '' || position3 === '') {
                continue;
            }
            if (position1 === position2 && position2 === position3) {
                roundWon = true
                break;
            }        
        }
        
        if (roundWon) {
            scoreGame(current_player)
            handleStatusDisplay(WIN_MESSAGE(current_player))
            game_active = false
            return;
    }

    let roundDraw = !GAME_STATE.includes('')

    if (roundDraw) {
        handleStatusDisplay(DRAW_MESSAGE())
        game_active = false
        return;
    }

    handlePlayerChange()
}

function handlePlayerChange() {
    current_player = (current_player === CHAR_1) ? CHAR_2 : CHAR_1
    handleStatusDisplay(CURRENT_PLAYER_TURN())
}

main()