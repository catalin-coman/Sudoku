var gameStatus = {
    grid_ids: [],
    good_input_ids: [],
    bad_input_ids: [],
    squares: [
        square1 = [11, 12, 13, 21, 22, 23, 31, 32, 33],
        square2 = [14, 15, 16, 24, 25, 26, 34, 35, 36],
        square3 = [17, 18, 19, 27, 28, 29, 37, 38, 39],
        square4 = [41, 42, 43, 51, 52, 53, 61, 62, 63],
        square5 = [44, 45, 46, 54, 55, 56, 64, 65, 66],
        square6 = [47, 48, 49, 57, 58, 59, 67, 68, 69],
        square7 = [71, 72, 73, 81, 82, 83, 91, 92, 93],
        square8 = [74, 75, 76, 84, 85, 86, 94, 95, 96],
        square9 = [77, 78, 79, 87, 88, 89, 97, 98, 99]
    ],

    rows: [
        row1 = [11, 12, 13, 14, 15, 16, 17, 18, 19],
        row2 = [21, 22, 23, 24, 25, 26, 27, 28, 29],
        row3 = [31, 32, 33, 34, 35, 36, 37, 38, 39],
        row4 = [41, 42, 43, 44, 45, 46, 47, 48, 49],
        row5 = [51, 52, 53, 54, 55, 56, 57, 58, 59],
        row6 = [61, 62, 63, 64, 65, 66, 67, 68, 69],
        row7 = [71, 72, 73, 74, 75, 76, 77, 78, 79],
        row8 = [81, 82, 83, 84, 85, 86, 87, 88, 89],
        row9 = [91, 92, 93, 94, 95, 96, 97, 98, 99]
    ],

    collumns: [
        collumn1 = [11, 21, 31, 41, 51, 61, 71, 81, 91],
        collumn2 = [12, 22, 32, 42, 52, 62, 72, 82, 92],
        collumn3 = [13, 23, 33, 43, 53, 63, 73, 83, 93],
        collumn4 = [14, 24, 34, 44, 54, 64, 74, 84, 94],
        collumn5 = [15, 25, 35, 45, 55, 65, 75, 85, 95],
        collumn6 = [16, 26, 36, 46, 56, 66, 76, 86, 96],
        collumn7 = [17, 27, 37, 47, 57, 67, 77, 87, 97],
        collumn8 = [18, 28, 38, 48, 58, 68, 78, 88, 98],
        collumn9 = [19, 29, 39, 49, 59, 69, 79, 89, 99]
    ]
}

/* creates table with rows and cells */
function createGame() {
    let div = document.getElementsByClassName('gameboardDiv')[0]
    let table = document.createElement('table')
    div.appendChild(table)
    cellClickEvent()
    cellKeyboardEvent()
    for (let i = 0; i < 9; i++) {
        let tableRow = table.insertRow(i)
        for (let j = 0; j < 9; j++) {
            let rowCell = tableRow.insertCell(j)
            rowCell.id = (i + 1) * 10 + j + 1
            rowCell.innerHTML = null

            /* adding the id to the id's array */
            gameStatus.grid_ids.push(parseInt(rowCell.id))

            defaultCellStyle(rowCell.id)
            rowCell.addEventListener('click', function (e) { clickedCell = e.target; })
        }
    }

    generateGrid()

    window.setInterval(badInputStyle, 500)

}

/* adding click events to cells */
function cellClickEvent() {

    /* mouse down */
    window.addEventListener('click', function () {
        unselectCells()
        selectCells(parseInt(clickedCell.id))
        clickedCellStyle(clickedCell.id)
    })

}

/* adds keyboard event to cell */
function cellKeyboardEvent() {

    /* 1 --> 9 to input numbers, space to delete */
    window.addEventListener('keypress', function () {
        let current_cell = document.getElementById(parseInt(clickedCell.id))
        let input_number = event.key
        if (event.key == ' ') {
            current_cell.innerHTML = null

        } else if (!inputCheck(parseInt(current_cell.id), input_number)) {
            current_cell.innerHTML = input_number
            checkWin()
        } else if (inputCheck(parseInt(current_cell.id), input_number)) {
            current_cell.innerHTML = input_number
        }

    })

}

/* generating the sudoku board */
function generateGrid() {

    /* generating the first square */
    for (let id of gameStatus.squares[0]) {
        let current_cell = document.getElementById(id)
        while (!current_cell.innerHTML) {
            let number = randomNumberGenerator(1, 9)
            if (!inputCheck(id, number)) {
                current_cell.innerHTML = number
            }
        }
    }

    generateAdditionalNumbers()
    removeNumbers()

}

/* completes the board generation */
function generateAdditionalNumbers() {
    let cell_id = parseInt(findEmptyCell())
    if (!cell_id) {
        return true
    } else {
        for (let number = 1; number < 10; ++number) {
            let current_cell = document.getElementById(cell_id)
            if (!inputCheck(cell_id, number)) {
                current_cell.innerHTML = number

                if (generateAdditionalNumbers()) {
                    return true
                }

                current_cell.innerHTML = null

            }

        }

        return false
    }
}

/* removes 'cnt' numbers from the board after generation */
function removeNumbers() {
    let cnt = 20

    while (cnt > 0) {
        let cell_id = randomNumberGenerator(11, 99)
        if (gameStatus.grid_ids.includes(cell_id)) {
            if (document.getElementById(cell_id).innerHTML) {
                document.getElementById(cell_id).innerHTML = null
                -- cnt
            }
        }
    }
}

/* checks if we have empty cells in game array */
function findEmptyCell() {
    for (let id of gameStatus.grid_ids) {
        let current_cell = document.getElementById(id)
        if (!current_cell.innerHTML) {
            return id
        }
    }
    return null
}

/* checks the current cell input */
function inputCheck(cell_id, number) {

    /* selecting the row */
    for (let row of gameStatus.rows) {
        if (row.includes(cell_id)) {
            if (badInput(row, number)) {
                /* avoiding double inclusion in array */
                if (!gameStatus.bad_input_ids.includes(cell_id)) {
                    gameStatus.bad_input_ids.push(cell_id)
                }
                return true
            }
        }
    }

    /* selecting the collumn */
    for (let collumn of gameStatus.collumns) {
        if (collumn.includes(cell_id)) {
            if (badInput(collumn, number)) {
                if (!gameStatus.bad_input_ids.includes(cell_id)) {
                    gameStatus.bad_input_ids.push(cell_id)
                }
                return true
            }
        }
    }

    /* selecting the square */
    for (let square of gameStatus.squares) {
        if (square.includes(cell_id)) {
            if (badInput(square, number)) {
                if (!gameStatus.bad_input_ids.includes(cell_id)) {
                    gameStatus.bad_input_ids.push(cell_id)
                }
                return true
            }
        }
    }

    /* removing the id from bad input */
    gameStatus.bad_input_ids.splice(gameStatus.bad_input_ids.indexOf(cell_id), 1)
    return false

}

/* checks the equality between cells in the array and the current cell */
function badInput(game_array, number) {

    /* the counter stores the number of cells that are
    equal to the current cell (current cell is always equal to it) */

    for (let id of game_array) {
        let current_cell = document.getElementById(id)
        if (current_cell.innerHTML) {
            if (parseInt(current_cell.innerHTML) == number) {
                return true
            }
        }
    }

    return false
}

/* checks win after input */
function checkWin() {
    if (!parseInt(findEmptyCell())) {
        alert ("You won!")
    }

}

/* generates a random whole number between min and max */
function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


/* Styling and display functions */

/* selects the row, column and square nearby cells */
function selectCells(cell_id) {

    /* rows */
    for (let row of gameStatus.rows) {
        if (row.includes(cell_id)) {
            for (let id of row) {
                selectedCellStyle(id)
            }
        }
    }

    /* collumns */
    for (let collumn of gameStatus.collumns) {
        if (collumn.includes(cell_id)) {
            for (let id of collumn) {
                selectedCellStyle(id)
            }
        }
    }

    /* squares */
    for (let square of gameStatus.squares) {
        if (square.includes(cell_id)) {
            for (let id of square) {
                selectedCellStyle(id)
            }
        }
    }
}

/* unselects nearby, row and collumn cells */
function unselectCells() {

    for (id of gameStatus.grid_ids) {
        defaultCellStyle(id)
    }

}

/* styles the table cells as default */
function defaultCellStyle(cell_id) {
    document.getElementById(cell_id).style.background = 'white'
    document.getElementById(cell_id).style.height = '45px'
    document.getElementById(cell_id).style.width = '45px'
    document.getElementById(cell_id).style.color = 'black'
}

/* styles the selected cells */
function selectedCellStyle(cell_id) {
    document.getElementById(cell_id).style.background = "lightgrey"
}

/* styles the clicked cell */
function clickedCellStyle(cell_id) {
    document.getElementById(cell_id).style.background = 'grey'
}

/* styles the badInput cell */
function badInputStyle() {

    for (id of gameStatus.bad_input_ids) {
        document.getElementById(id).style.color = 'red'
    }
}