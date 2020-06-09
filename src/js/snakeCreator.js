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




const showAllSnakes = async () => {
    let ids = await getSnakeByOwner(userAccount)
    displaySnakes(ids)
}

const initalSnakeCheck = async () => {
    const haveInitialSnake = await gotInitalSnake(userAccount)
    if (!haveInitialSnake) {
        console.log("Hat noch kein InitialSnake")
        document.getElementById("createSnake").style.display = "none"
        document.getElementById("createInitalSnake").style.display = "block"
    } else {
        console.log("Hat bereits ein InitialSnake")
        document.getElementById("createSnake").style.display = "block"
        document.getElementById("createInitalSnake").style.display = "none"
    }
}

const displaySnakes = async snakeIds => {
    console.log("displaySnakes")

    const snakeView = document.getElementById("snakes")
    const snakesLength = snakeIds.length;
    document.getElementById("snakeamount").innerText = snakesLength;
    snakeView.innerHTML = (snakesLength > 0) ? "" : "<h5>You have no Snakes yet. Create your initial Snake for free.</h5>"

    let snakeList = ""
    let i = 0;

    for (id of snakeIds) {
        const snake = await getSnakeDetails(id)

        const snakesvg = await drawSnake(snake);

        const nameArray = await getParentNames(snakeIds[i])

        const names = nameArray.split(";")
        let childOf = "&nbsp;"
        if (names[0] != names[1]) {
            childOf = `Child of  <span style="font-weight: bold">${names[0]}</span>  & <span style="font-weight: bold">${names[1]}</span>`
        }
        const snakeID = snakeIds[i];
        snakeList = `
                    <snake snakeid="${snakeID}">
                        <fieldset class="itemfieldset">
                            <legend class="itemlegend">
                                ${snake.name}
                            </legend>
                  <div class="snakeview">
                        ${snakesvg}
                   </div>

                    <div class="info">
                        <p style="font-size: 0.8rem"> ${childOf} </p>
                        
                        <fieldset>
                            <p><span>ID:    </span> ${snakeID} </p>
                            <p><span>DNA:   </span> ${snake.dna} </p>
                            <p><span>Level: </span> ${snake.level} </p>
                        </fieldset>
                    </div>
                    
                    <div class="toProjectContainer">
                        <div style='float: left;'>
                            <button type="button" onclick="pairingClick(this, ${snakeID})" class="button">
                                Pairing
                             </button> 
                        </div>
                        <div style='float: right;'>
                             <button type="button" onclick="" class="button">
                                Feed
                             </button> 
                        </div>
                    </div>
                    
                    <hr>
                    
                     <div class="toProjectContainer">
                     <h4>Sell Snake on Marktplace</h4>
                        <div style='display: flex'>
<!--                             <label for="sellPriceInput">Sell price:</label>-->
                             <input step="0.01" lang="de-DE" type="number" name="sellPriceInput" class="form-control" placeholder="Sll price e.g. 0.01">
                             <button type="button" onclick="addSnakeToMarketplace(this, ${snakeID})" class="button">Sell</button> 

                         </div>
                       </div>
                       
                    <hr>

                    <div class="toProjectContainer">
                     <h4>Send Snake to someone</h4>
                        <div style='display: flex'>
<!--                             <label for="newOwnerAddressInput">New Owner Address:</label>-->
                             <input type="text" name="newOwnerAddressInput" class="form-control" placeholder="New Owner Account Address">
                             <button type="button" onclick="transferSnakeTo(this, ${snakeID})" class="button">Send</button> 

                        </div>
                    </div>
              
                  </fieldset>
                </snake>`

        snakeView.innerHTML += snakeList;
        i++


    }
}


// ----------------- CONTRACT FUNCTION ---------------


const getSnakeDetails = async snakeId => {
    return await cryptoSnakeOwnership.methods.snakes(snakeId).call();
}

const getOwnerOfSnake = async snakeId => {
    return await cryptoSnakeOwnership.methods.snakeToOwner(snakeId).call()
}

const gotInitalSnake = (address) => {
    return cryptoSnakeOwnership.methods.gotInitialSnake(address).call()
}

const createInitialSnake = async () => {
    let name = nameInputField.value;
    nameInputField.value = ""

    fireNotify(`Don't forget: Accept in the metamask.`, "blue")

    if (name.length < 2) {
        fireNotify(`Nameinput ist empty or to small`, "red")
    } else {
        console.log("createInitialSnake: " + name)
        await cryptoSnakeOwnership.methods.createInitialSnake(name).send({
            from: userAccount
        })
        fireNotify(`Welcome new Snake ${name}`, "green")
    }
    await initalSnakeCheck();
    await showAllSnakes();
}

const createPayedSnake = async () => {
    console.log("createPayedSnake")
    let name = nameInputField.value;
    nameInputField.value = ""

    fireNotify(`Don't forget: Accept in the metamask.`, "blue")

    if (name.length < 2) {
        fireNotify(`Nameinput ist empty or to small`)
    } else {
        await cryptoSnakeOwnership.methods.createPayedSnake(name).send({
            from: userAccount,
            value: window.web3.utils.toWei("0.001", "ether")
        });
        fireNotify(`Welcome new Snake ${name}`, "green")

    }
    await showAllSnakes()

}

function getSnakeByOwner(owner) {
    return cryptoSnakeOwnership.methods.getSnakesByOwner(owner).call()
}


