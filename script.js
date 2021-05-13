gameStatus = {
    grid_ids : []
}

/* creates table with rows and cells */
function createGame() {
    let div = document.getElementsByClassName('gameboardDiv')[0]
    let table = document.createElement('table')
    div.appendChild(table)
    for (let i = 0; i < 9; i++) {
        let tableRow = table.insertRow(i)
        for (let j = 0; j < 9; j++) {
            let rowCell = tableRow.insertCell(j)
            rowCell.id = (i + 1) * 10 + j + 1
            
            /* adding the id to the id's array */
            gameStatus.grid_ids.push(rowCell.id)
            
            defaultCellStyle(rowCell)
        }
    }
    createInputButtons()
}

/* creates buttons for number inputs */
function createInputButtons() {
    let div = document.getElementsByClassName('inputNumbersDiv')[0]
    for (let i = 0; i <= 9; i++) {
        let button = document.createElement('button')
        button.innerHTML = i
        buttonStyle(button)
        div.appendChild(button)
    }
}

/* styles the table cells as default */
function defaultCellStyle(cell) {
    cell.style.background = 'white'
    cell.style.height = '45px'
    cell.style.width = '45px'
    cell.style.color = 'black'
}

/* styles the button */
function buttonStyle(button) {
    button.style.height = '45px'
    button.style.width = '45px'
}