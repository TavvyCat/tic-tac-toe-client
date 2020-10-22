const store = require('./store')

const changeDisplay = msg => {
    $('h3', '#display').text(msg)
}

const checkGame = () => {
    const player = store.player
    const cells = store.game.cells
    const updateGameData = store.updateData.game
    cells[updateGameData.cell.index] = store.player
    if (
        (cells[0] === player && cells[1] === player && cells[2] === player) ||
        (cells[3] === player && cells[4] === player && cells[5] === player) ||
        (cells[6] === player && cells[7] === player && cells[8] === player) ||
        (cells[0] === player && cells[3] === player && cells[6] === player) ||
        (cells[1] === player && cells[4] === player && cells[7] === player) ||
        (cells[2] === player && cells[5] === player && cells[8] === player) ||
        (cells[0] === player && cells[4] === player && cells[8] === player) ||
        (cells[2] === player && cells[4] === player && cells[6] === player)
    ) {
        updateGameData.over = true
    } else if (cells.every(cell => cell)) {
        store.isTie = true
        updateGameData.over = true;
    } else return
}

const closeModalAndClearForms = () => {
    $('form').trigger('reset')
    $('.modal-close').trigger('click')
}

const populateModalBody = content => {
    $('#modal-body').html(content)
}

const switchPlayer = () => store.player = store.player === 'x' ? 'o' : 'x'


export {
    changeDisplay,
    checkGame,
    closeModalAndClearForms,
    populateModalBody,
    switchPlayer
}