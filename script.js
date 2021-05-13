gameStatus = {
    grid_ids: []
}

/* creates table with rows and cells */
function createGame() {
    let div = document.getElementsByClassName('gameboardDiv')[0]
    let table = document.createElement('table')
    div.appendChild(table)
    cellClickEvent()
    for (let i = 0; i < 9; i++) {
        let tableRow = table.insertRow(i)
        for (let j = 0; j < 9; j++) {
            let rowCell = tableRow.insertCell(j)
            rowCell.id = (i + 1) * 10 + j + 1

            /* adding the id to the id's array */
            gameStatus.grid_ids.push(parseInt(rowCell.id))

            defaultCellStyle(rowCell.id)

            rowCell.addEventListener('click', function (e) { clickedCell = e.target; })
        }
    }
    createInputButtons()
}

/* creates buttons for number inputs */
function createInputButtons() {
    let div = document.getElementsByClassName('inputNumbersDiv')[0]
    for (let i = 0; i <= 9; i++) {
        let button = document.createElement('button')
        buttonClickEvent(button)

        /* adds numbers to buttons */
        if (i == 0) {
            button.innerHTML = '.'
        } else {
            button.innerHTML = i
        }

        buttonStyle(button)
        div.appendChild(button)

        button.addEventListener('click', function (e) { clickedButton = e.target; })
    }
}

/* adding click events to cells */
function cellClickEvent() {

    // mousedown event
    window.addEventListener('click', function () {
        selectCells(parseInt(clickedCell.id))
    })

}

/* adding click event to buttons */
function buttonClickEvent() {

    window.addEventListener('click', function () {
        try {
            document.getElementById(clickedCell.id).innerHTML = clickedButton.innerHTML            
        } catch (error) {}
    })

}

/* styles the table cells as default */
function defaultCellStyle(cell_id) {
    document.getElementById(cell_id).style.background = 'white'
    document.getElementById(cell_id).style.height = '45px'
    document.getElementById(cell_id).style.width = '45px'
    document.getElementById(cell_id).style.color = 'black'
}

/* styles the button */
function buttonStyle(button) {
    button.style.height = '45px'
    button.style.width = '45px'
}

/* styles the clicked cell */
function clickedCellStyle(cell_id) {
    if (document.getElementById(cell_id).style.background == 'lightgrey') {
        defaultCellStyle(cell_id)
    } else {
        document.getElementById(cell_id).style.background = "lightgrey"
    }
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
}