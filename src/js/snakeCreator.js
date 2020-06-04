

async function showAllSnakes() {
    document.getElementById("snakes").innerHTML = ""
    let ids = testSnakes //await getSnakeByOwner(userAccount)
    displaySnakes(ids)
}

const testSnakes = [
    {
        "snakeId": "0",
        "name": "Pascal",
        "dna": "5178520655450500",
        "length": 3
    },
    {
        "snakeId": "1",
        "name": "Benjamin",
        "dna": "5254256302953300",
        "length": 3
    },
    {
        "snakeId": "2",
        "name": "Manuel",
        "dna": "8836990722195900",
        "length": 3
    },
    {
        "snakeId": "3",
        "name": "Nadia",
        "dna": "7543389371823100",
        "length": 3
    }
]

function displaySnakes(snakeIds) {
    console.log("displaySnakes")


    const snakeView = document.getElementById("snakes")

    let snakeList = ""

    for (snake of snakeIds) {
        console.log(snake)

        //getSnakeDetails(id)
        //   .then(function (snake) {

        const bodydna = coloringSnake(snake.dna)
        console.log(bodydna)
        let snakeBody = "";

        bodydna.forEach( dna => {
            snakeBody += `<div class="snakebody" style="background-color: ${dna}"></div>`
        })

        snakeList = `
            <snake snakeid="${snake.snakeId}">
                <fieldset class="itemfieldset">
                    <legend class="itemlegend">
                        ${snake.name}
                    </legend>

          <div class="snakeview">
            ${snakeBody}
           </div>
    
            <div class="info">
                <fieldset>
                    <p><span>Owner:</span> ${snake.owner} </p>
                    <p><span>Dna:</span> ${snake.dna} </p>
                    <p><span>Level:</span> ${snake.level} </p>
                </fieldset>
            </div>
            
            <div class="toProjectContainer">
                <a class="button"> Snake Level Up</a>
            </div>
          </fieldset>
        </snake>`

        snakeView.innerHTML += snakeList;

        //});
    }
}

function getSnakeDetails(snakeId) {
    return testSnakes //cryptoSnakes.methods.snakes(snakeId).call();
}

async function getOwnerOfSnake(snakeId) {
    return await cryptoSnakes.methods.snakeToOwner(snakeId).call()
}

function createInitialSnake(snakeName) {
    console.log("createInitialSnake: " + snakeName)
    return cryptoSnakes.methods.createInitalSnake(snakeName).send({
        from: userAccount
    })
}

async function createPayedSnake() {
    console.log("createPayedSnake")

    let name = document.getElementById("snakeInputName").value;
    await cryptoSnakes.methods.createPayedSnake(name).send({
        from: userAccount,
        value: window.web3.utils.toWei("0.001", "ether")
    });
}

function getSnakeByOwner(owner) {
    return cryptoSnakes.methods.getSnakesByOwner(owner).call()
}


const coloringSnake = dna => {

    const snakebodys = [] //document.getElementsByClassName("snakeview")[0].children

    let chunks = [];
    for (let i = 0, charsLength = dna.length; i < charsLength; i += 3) {
        chunks.push(dna.substring(i, i + 3));
    }

    const head = chunks[3] + chunks[4] + chunks[5]
    chunks[5] = head.substring(1, 4)
    chunks.push(head.substring(4, 7))


    let c1 = chunks[0] + chunks[1]
    let c2 = chunks[1] + chunks[2]
    let c3 = chunks[2] + chunks[3]
    let c4 = chunks[3] + chunks[4]
    let c5 = chunks[4] + chunks[5]
    let c6 = chunks[5] + chunks[6]

    // snakebodys[0].style.backgroundColor = "#" + c1;
    // snakebodys[1].style.backgroundColor = "#" + newcolor(c1, c2)
    // snakebodys[2].style.backgroundColor = "#" + c2;
    // snakebodys[3].style.backgroundColor = "#" + newcolor(c2, c3)
    // snakebodys[4].style.backgroundColor = "#" + c3;
    // snakebodys[5].style.backgroundColor = "#" + newcolor(c3, c4)
    // snakebodys[6].style.backgroundColor = "#" + c4;
    // snakebodys[7].style.backgroundColor = "#" + newcolor(c4, c5)
    // snakebodys[8].style.backgroundColor = "#" + c5;
    // snakebodys[9].style.backgroundColor = "#" + newcolor(c5, c6)
    // snakebodys[8].style.backgroundColor = "#" + c6;

    snakebodys.push("#" + c1)
    snakebodys.push("#" + newcolor(c1, c2))
    snakebodys.push("#" + c2)
    snakebodys.push("#" + newcolor(c2, c3))
    snakebodys.push("#" + c3)
    snakebodys.push("#" + newcolor(c3, c4))
    snakebodys.push("#" + c4)
    snakebodys.push("#" + newcolor(c4, c5))
    snakebodys.push("#" + c5)
    snakebodys.push("#" + newcolor(c5, c6))
    snakebodys.push("#" + c6)

    return snakebodys
}