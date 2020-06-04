async function showAllSnakes() {
    document.getElementById("snakes").innerHTML = ""
    let ids = await getSnakeByOwner(userAccount)
    displaySnakes(ids)
}

function displaySnakes(snakeIds) {
    for (id of snakeIds) {
        getSnakeDetails(id)
            .then(function (snake) {
                document.getElementById("snakes").innerHTML += `
                <div>
                   <ul>
                    <li>Name: ${snake.name}</li>
                    <li>DNA: ${snake.dna}</li>
                    <li>Level: ${snake.level}</li>
                  </ul>
                </div> `
            });
    }
}

function getSnakeDetails(snakeId) {
    return cryptoSnakes.methods.snakes(snakeId).call();
}

async function getOwnerOfSnake(snakeId) {
    return await cryptoSnakes.methods.snakeToOwner(snakeId).call()
}

function createInitialSnake(snakeName) {
    return cryptoSnakes.methods.createInitalSnake(snakeName).send({
        from: userAccount
    })
}

async function createPayedSnake() {
    let name = document.getElementById("snakeInputName").value;
    await cryptoSnakes.methods.createPayedSnake(name).send({
        from: userAccount,
        value: window.web3.utils.toWei("0.001", "ether")
    });
}

function getSnakeByOwner(owner) {
    return cryptoSnakes.methods.getSnakesByOwner(owner).call()
}