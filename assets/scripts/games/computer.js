const api = require('./api')
const store = require('./../store')
const ui = require('./ui')
const utility = require('./../utility')

const checkBoard = cells => {
    const move = {
        index: null,
        random: false
    }

    if ((cells[0] === '' && (
    (cells[1] === 'x' && cells[2] === 'x') || 
    (cells[3] === 'x' && cells[6] === 'x') ||
    (cells[4] === 'x' && cells[8] === 'x')))) {
        move.index = 0
    } else if ((cells[1] === '' && (
    (cells[0] === 'x' && cells[2] === 'x') || 
    (cells[4] === 'x' && cells[7] === 'x')))) {
        move.index = 1
    } else if ((cells[2] === '' && (
    (cells[0] === 'x' && cells[1] === 'x') || 
    (cells[5] === 'x' && cells[8] === 'x') ||
    (cells[4] === 'x' && cells[6] === 'x')))) {
        move.index = 2
    } else if ((cells[3] === '' && (
    (cells[0] === 'x' && cells[6] === 'x') || 
    (cells[4] === 'x' && cells[5] === 'x')))) {
        move.index = 3
    } else if ((cells[5] === '' && (
    (cells[2] === 'x' && cells[8] === 'x') || 
    (cells[3] === 'x' && cells[4] === 'x')))) {
        move.index = 5
    } else if ((cells[6] === '' && (
    (cells[0] === 'x' && cells[3] === 'x') || 
    (cells[7] === 'x' && cells[8] === 'x') ||
    (cells[2] === 'x' && cells[4] === 'x')))) {
        move.index = 6
    } else if ((cells[7] === '' && (
    (cells[1] === 'x' && cells[4] === 'x') || 
    (cells[6] === 'x' && cells[8] === 'x')))) {
        move.index = 7
    } else if ((cells[8] === '' && (
    (cells[2] === 'x' && cells[5] === 'x') || 
    (cells[6] === 'x' && cells[7] === 'x') ||
    (cells[0] === 'x' && cells[4] === 'x')))) {
        move.index = 8
    } else if ((cells[4] === '' && (
    (cells[0] === 'x' && cells[8] === 'x') || 
    (cells[1] === 'x' && cells[7] === 'x') ||
    (cells[2] === 'x' && cells[6] === 'x') ||
    (cells[3] === 'x' && cells[5] === 'x')))) {
        move.index = 4
    } else {
        move.random = true
    }
    return move;
}

const randomMove = cells => {
    const randomIndex = Math.floor(Math.random() * 9)
    if (cells[randomIndex] === '') {
        return randomIndex
    } else {
        randomMove(cells)
    }
}

const computerPlay = () => {
    const cells = store.game.cells
    
    // checks for two x's in a row
    const move = checkBoard(cells)
    if (move.random) {
        // generates random index that is empty
        move.index = randomMove(cells)
    }
    const updateGame = store.updateData.game
    utility.switchPlayer()
    updateGame.cell.index = move.index
    updateGame.cell.value = store.player
    $(`#box${move.index}`).off('click')
    utility.checkGame()
    api.ajaxUpdateGame()
        .then(ui.onComputerUpdateSuccess)
}

export {
    computerPlay
}