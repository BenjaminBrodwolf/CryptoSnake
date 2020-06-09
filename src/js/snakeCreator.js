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

    let marketSnakesIds = await getAllSnakeIdsFromMarketplace();
    marketSnakesIds = marketSnakesIds.map(id => parseInt(id))

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
        const snakeID = parseInt(snakeIds[i]);
        const isOnMarket = marketSnakesIds.includes(snakeID)
        const sellPrice = isOnMarket ? `<p class="isOnMarket">Is on Market <br> Price: ${ await getPriceOfSnake(snakeID)} ETH </p>` : ''

        const pairFeedContainer = `
                    <div class="toProjectContainer">
                        <div style='float: left;'>
                         <button type="button" onclick="pairingClick(this, ${snakeID})" class="button" > 
                                Pairing
                             </button> 
                        </div>
                        <div style='float: right;'>
                             <button type="button" onclick="" class="button">
                                Feed
                             </button> 
                        </div>
                    </div>`

        const pairFeedContainerNOT = `
                    <div class="toProjectContainer">
                        <div style='float: left;'>
                         <button type="button" class="button" disabled> 
                                Pairing
                             </button> 
                        </div>
                        <div style='float: right;'>
                             <button type="button" class="button" disabled>
                                Feed
                             </button> 
                        </div>
                    </div>`

        const sellSnakeContainer = `
                     <div class="toProjectContainer">
                        <h4>Sell Snake on Marktplace</h4>
                        <div style='display: flex'>
                             <input step="0.01" lang="de-DE" type="number" name="sellPriceInput" class="form-control" placeholder="Sell price e.g. 0.01">
                             <button type="button" onclick="addSnakeToMarketplace(this, ${snakeID})" class="button" >Sell</button> 
                         </div>
                     </div>`

        const sellSnakeContainerNOT = `
                     <div class="toProjectContainer">
                        <h4>Take Snake back from Market</h4>
                        <div style='display: flex'>
                             <button type="button" onclick="removeSnakeFromMarketplace(${snakeID})" class="button" >revoke</button> 
                         </div>
                     </div>`

        const sendToContainer = `
                     <div class="toProjectContainer">
                        <h4>Send Snake to someone</h4>
                        <div style='display: flex'>
                             <input type="text" name="newOwnerAddressInput" class="form-control" placeholder="New Account Address">
                             <button type="button" onclick="transferSnakeTo(this, ${snakeID})" class="button" >Send</button> 
                        </div>
                    </div>`

        const sendToContainerNOT = `
                     <div class="toProjectContainer">
                        <h4>Send Snake to someone</h4>
                        <div style='display: flex'>
                             <input type="text" name="newOwnerAddressInput" class="form-control" placeholder="New Account Address" disabled>
                             <button type="button" class="button" disabled>Send</button> 
                        </div>
                    </div>`

        const approveContainer = `
                     <div class="toProjectContainer">
                        <h4>Approve received Snake</h4>
                        <div style='display: flex'>
                             <input type="text" name="newOwnerAddressInput" class="form-control" placeholder="Address of rec. Account">
                             <button type="button" onclick="approve(this, ${snakeID})" class="button">Approve</button> 
                        </div>
                    </div>`

        const approveContainerNOT = `
                     <div class="toProjectContainer">
                        <h4>Approve received Snake</h4>
                        <div style='display: flex'>
                             <input type="text" name="newOwnerAddressInput" class="form-control" placeholder="Address of rec. Account" disabled>
                             <button type="button"  class="button" disabled>Approve</button> 
                        </div>
                    </div>`

            snakeList = `
                    <snake snakeid="${snakeID}">
                        <fieldset class="itemfieldset">
                            <legend class="itemlegend">
                                ${snake.name}
                            </legend>
                  <div class="snakeview">
                  
                  ${sellPrice}
                  
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
                    

                    ${isOnMarket ? pairFeedContainerNOT : pairFeedContainer}

                    <hr>
                    
                     ${isOnMarket ? sellSnakeContainerNOT : sellSnakeContainer}

                    <hr>
                     ${isOnMarket ? sendToContainerNOT : sendToContainer}


                     <hr>
                     ${isOnMarket ? approveContainerNOT : approveContainer}


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


