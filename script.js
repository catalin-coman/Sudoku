var gameStatus = {
    grid_ids: [],
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

            /* adding the id to the id's array */
            gameStatus.grid_ids.push(parseInt(rowCell.id))

            defaultCellStyle(rowCell.id)

            rowCell.addEventListener('mouseover', function (e) { clickedCell = e.target; })
        }
    }
}

/* adding click events to cells */
function cellClickEvent() {

    /* mouse down */
    window.addEventListener('mousedown', function () {
        selectCells(parseInt(clickedCell.id))
    })

    /* mouse up */
    window.addEventListener('mouseup', function () {
        unselectCells(parseInt(clickedCell.id))
    })

}

/* adds keyboard event to cell */
function cellKeyboardEvent() {

    /* 1 --> 9 to input numbers, space to delete */
    window.addEventListener( 'keypress' , function () {
        document.getElementById(clickedCell.id).innerHTML = event.key
    })

}

/* selects the row, column and square nearby cells */
function selectCells(cell_id) {

    /* row cells left */
    for (let cell_id_left = --cell_id; gameStatus.grid_ids.includes(cell_id_left); --cell_id_left) {
        clickedCellStyle(cell_id_left)
    }

    /* row cells right */
    for (let cell_id_right = ++cell_id; gameStatus.grid_ids.includes(cell_id_right); ++cell_id_right) {
        clickedCellStyle(cell_id_right)
    }

    /* collumn cells upper */
    for (let cell_id_upper = cell_id - 10; gameStatus.grid_ids.includes(cell_id_upper); cell_id_upper -= 10) {
        clickedCellStyle(cell_id_upper)
    }

    /* collumn cells down */
    for (let cell_id_down = cell_id + 10; gameStatus.grid_ids.includes(cell_id_down); cell_id_down += 10) {
        clickedCellStyle(cell_id_down)
    }

    /* squares */
    for (let square of gameStatus.squares) {
        if (square.includes(cell_id)) {
            for (let id of square) {
                clickedCellStyle(id)
            }
        }
    }
}

/* unselects nearby, row and collumn cells */
function unselectCells(cell_id) {
    /* row cells left */
    for (let cell_id_left = --cell_id; gameStatus.grid_ids.includes(cell_id_left); --cell_id_left) {
        defaultCellStyle(cell_id_left)
    }

    /* row cells right */
    for (let cell_id_right = ++cell_id; gameStatus.grid_ids.includes(cell_id_right); ++cell_id_right) {
        defaultCellStyle(cell_id_right)
    }

    /* collumn cells upper */
    for (let cell_id_upper = cell_id - 10; gameStatus.grid_ids.includes(cell_id_upper); cell_id_upper -= 10) {
        defaultCellStyle(cell_id_upper)
    }

    /* collumn cells down */
    for (let cell_id_down = cell_id + 10; gameStatus.grid_ids.includes(cell_id_down); cell_id_down += 10) {
        defaultCellStyle(cell_id_down)
    }

    /* squares */
    for (let square of gameStatus.squares) {
        if (square.includes(cell_id)) {
            for (let id of square) {
                defaultCellStyle(id)
            }
        }
    }
}

/* styles the table cells as default */
function defaultCellStyle(cell_id) {
    document.getElementById(cell_id).style.background = 'white'
    document.getElementById(cell_id).style.height = '45px'
    document.getElementById(cell_id).style.width = '45px'
    document.getElementById(cell_id).style.color = 'black'
}

/* styles the clicked cell */
function clickedCellStyle(cell_id) {
    document.getElementById(cell_id).style.background = "lightgrey"
}