let pairingSnakes = [];

const closeDialog = () => {
    dialog.style.display = 'none';
    backdrop.style.display = 'none';
}

const getPairSelected = () => {
    const allSnakeFields = document.querySelectorAll("snake > fieldset")

    let selectedSnakesIDs = []
    let selectedSnakesName = []

    for (const field of allSnakeFields) {
        if (field.classList.contains("pairingSelected")) {
            const snakeid = field.parentElement.getAttribute("snakeid")
            const snakeName = field.children[0].innerText
            selectedSnakesIDs.push(snakeid)
            selectedSnakesName.push(snakeName)
        }
    }
    return [selectedSnakesIDs, selectedSnakesName]
}


const pairingClick = el => {
    let [selected, names] = getPairSelected();

    const snake = el.parentNode.parentNode.parentElement;

    if (snake.classList.contains("pairingSelected")) {
        snake.classList.remove("pairingSelected")
    } else {

        if (selected.length < 2) {
            snake.classList.add("pairingSelected")

            let [selected, names] = getPairSelected();

            if (selected.length == 2) {
                document.getElementById("snakeOne").innerText = names[0]
                document.getElementById("snakeTwo").innerText = names[1]

                pairingSnakes = selected
                console.log(selected)
                dialog.style.display = 'block';
                backdrop.style.display = 'block';
            }
        }
    }

}

const pairSnakes = async (sourceSnakeId = 0, targetSnakeId = 0) => {
    console.log("pairSnakes")
    await cryptoSnakes.methods.reproduction(sourceSnakeId, targetSnakeId).send({
        from: userAccount
    })

    pairingSnakes = []
    closeDialog()
    await showAllSnakes()
}