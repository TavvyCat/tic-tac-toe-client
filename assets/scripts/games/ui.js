const utility = require('./../utility')
const store = require('./../store')
const computer = require('./computer')
const gameEvents = require('./events')

const onNewGameSuccess = res => {
    if (store.computerMode) {
        utility.changeDisplay(`New computer game started. Player is X and goes first.`)
    } else {
        utility.changeDisplay(`New game started. Click on square to start. X goes first.`)
    }

    $('#game-board').show()
    
    utility.updateHeight()
    $('.game-space').text("")
    $('.game-space').on('click', gameEvents.onSpaceClicked)

    store.updateData.game.over = false
    store.player = null
    store.game = res.game
}

const onUpdateGameSuccess = res => {
    const cells = res.game.cells
    const gameBoard = $('.game-space')
    for (let i = 0; i < cells.length; i++) {
        if (cells[i]) $(gameBoard[i]).addClass('game-space-display').text(cells[i])
    }
    if (res.game.over) {
        $('.game-space').off('click') 
        store.isTie = false
    } else {
        store.game = res.game
    }
}
const onPlayerUpdateSuccess = res => {
    if (store.isTie) {
        utility.changeDisplay("It's a tie. You may start new game.")
    } else if (res.game.over) {
        utility.changeDisplay("Player wins! You may start new game.")
    } else {
        utility.changeDisplay("Computer's turn")
    }
    onUpdateGameSuccess(res)
    if (res.game.over === false) {
        setTimeout(() => {
            computer.computerPlay()
        }, 1000)
    }
}
const onComputerUpdateSuccess = res => {
    if (store.isTie) {
        utility.changeDisplay("It's a tie. You may start new game.")
    } else if (res.game.over) {
        utility.changeDisplay("Computer wins! You may start new game.")
    } else {
        utility.changeDisplay("Player's turn")
    }
    onUpdateGameSuccess(res)
}

const onOnePlayerUpdateSuccess = res => {
    if (store.isTie) {
        utility.changeDisplay("It's a tie. You may start new game.")
    } else if (res.game.over) {
        utility.changeDisplay(`Player ${store.player} wins! You may start new game.`)
    } else {
        utility.changeDisplay(`Player ${store.player === 'x' ? 'o' : 'x'}\'s turn`)
    }
    onUpdateGameSuccess(res)
}

const onGetGamesSuccess = res => {
    $('#games-carousel').html("")
    res.games.forEach((game, index) => $('#games-carousel').append(`
    <div class="container carousel-item ${res.games.length-1 === index ? "active" : ''}">
        <div class="row justify-content-center games-template h-500">
        <h3 class="col-6 text-center">Game: ${index + 1}</h3>
            <div class="row col-12 justify-content-center">
                <div class="row col-12 justify-content-center">
                    <div id="box0" class="col-4 border border-light game-space-display dummy-game" data-cell-index='0'>${game.cells[0]}</div>
                    <div id="box1" class="col-4 border border-light game-space-display dummy-game" data-cell-index='1'>${game.cells[1]}</div>
                    <div id="box2" class="col-4 border border-light game-space-display dummy-game" data-cell-index='2'>${game.cells[2]}</div>
                    <div id="box3" class="col-4 border border-light game-space-display dummy-game" data-cell-index='3'>${game.cells[3]}</div>
                    <div id="box4" class="col-4 border border-light game-space-display dummy-game" data-cell-index='4'>${game.cells[4]}</div>
                    <div id="box5" class="col-4 border border-light game-space-display dummy-game" data-cell-index='5'>${game.cells[5]}</div>
                    <div id="box6" class="col-4 border border-light game-space-display dummy-game" data-cell-index='6'>${game.cells[6]}</div>
                    <div id="box7" class="col-4 border border-light game-space-display dummy-game" data-cell-index='7'>${game.cells[7]}</div>
                    <div id="box8" class="col-4 border border-light game-space-display dummy-game" data-cell-index='8'>${game.cells[8]}</div>
                    <br>
                    <button type="button" class="btn btn-danger delete-game-btn text-center col-6" data-id=${game._id}>Delete Game</button>
                </div>
            </div>
        </div>
    </div>
    `))
    $('.delete-game-btn').on('click', gameEvents.onDeleteGame)
}

const onDeleteGameSuccess = () => {
    gameEvents.onGetGames()
    utility.changeDisplay("Game deleted")
}

const onError = err => {
    utility.changeDisplay(`Error: ${err.statusText}. Something went wrong.`)
}

export {
    onNewGameSuccess,
    onOnePlayerUpdateSuccess,
    onPlayerUpdateSuccess,
    onComputerUpdateSuccess,
    onGetGamesSuccess,
    onDeleteGameSuccess,
    onError
}