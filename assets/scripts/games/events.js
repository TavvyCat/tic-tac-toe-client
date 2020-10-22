const api = require('./api')
const ui = require('./ui')
const store = require('./../store')
const utility = require('./../utility')

const onNewPlayerGame = () => {
    store.computerMode = false
    api.ajaxNewGame()
        .then(ui.onNewGameSuccess)
        .catch(ui.onError)
}

const onNewComputerGame = () => {
    store.computerMode = true
    api.ajaxNewGame()
        .then(ui.onNewGameSuccess)
        .catch(ui.onError)
}

const onSpaceClicked = e => {
    if (store.computerMode === true && store.player === 'x') {
        return
    }
    $(e.target).off('click')
    const updateGameData = store.updateData.game
    utility.switchPlayer()
    updateGameData.cell.index = $(e.target).data('cell-index')
    updateGameData.cell.value = store.player
    utility.checkGame()

    api.ajaxUpdateGame()
    .then(store.computerMode ? ui.onPlayerUpdateSuccess : ui.onOnePlayerUpdateSuccess)
    .catch(ui.onError)
}

const onGetGames = () => {
    api.ajaxGetGames()
        .then(ui.onGetGamesSuccess)
        .catch(ui.onError)
}

const onDeleteGame = e => {
    api.ajaxDeleteGame($(e.target).data('id'))
        .then(ui.onDeleteGameSuccess)
        .catch(ui.onError)
}

const onResize = () => {
    utility.updateHeight()
}

export {
    onNewPlayerGame,
    onNewComputerGame,
    onSpaceClicked,
    onGetGames,
    onDeleteGame,
    onResize
}