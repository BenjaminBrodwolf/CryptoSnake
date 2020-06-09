const displaySnakesOnMarket = async () => {
    console.log("display all Snake on Market")

    const marketView = document.getElementById("marketplace");

    const marketSnakesIds = await getAllSnakeIdsFromMarketplace();
    let currentUserSnakeIDs = await getSnakeByOwner(userAccount);
    currentUserSnakeIDs = currentUserSnakeIDs.map(id => parseInt(id))


    const snakesMarketLength = marketSnakesIds.length;

    document.getElementById("snakesMarketAmount").innerText = snakesMarketLength;
    marketView.innerHTML = (snakesMarketLength > 0) ? "" : "<h5>There are no Snakes on sell.</h5>"

    let snakeList = ""
    let i = 0;

    for (id of marketSnakesIds) {
        const snakeID = marketSnakesIds[i];
        const isOnMarket = currentUserSnakeIDs.includes(snakeID)

        if (!isOnMarket) {

            const snake = await getSnakeDetails(id)

            const snakesvg = await drawSnake(snake);

            const nameArray = await getParentNames(snakeID)

            const priceOfSnake = await getPriceOfSnake(snakeID)

            const names = nameArray.split(";")
            let childOf = "&nbsp;"
            if (names[0] != names[1]) {
                childOf = `Child of  <span style="font-weight: bold">${names[0]}</span>  & <span style="font-weight: bold">${names[1]}</span>`
            }
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
                    
                                      
                    <hr>
                    <h4>Price: </h4>
                    <h3> ${priceOfSnake} </h3>
                    <div class="toProjectContainer">
                     <h4>Buy Snake</h4>
                        <div style='display: flex'>
                             <button type="button" onclick="buyTheSnake(${snakeID})" class="button">Buy</button> 
                        </div>
                    </div>
              
                  </fieldset>
                </snake>`

            marketView.innerHTML += snakeList;
        }
        i++
    }
    await showAllSnakes()
}


// ----------------- CONTRACT FUNCTION ---------------


const addSnakeToMarketplace = async (element, snakeId) => {
    const inputField = element.previousElementSibling;
    const price = inputField.value
    console.log(price)
    if (price < 0) {
        fireNotify("Price must be higher then 0")
    } else {
        await cryptoSnakeMarket.methods.addSnakeToMarketplace(snakeId, price).send({from: userAccount});
        console.log("Added Snake " + snakeId + " to market")
        fireNotify("Added Snake " + snakeId + " to market", "green")
        await displaySnakesOnMarket()
    }
};

const removeSnakeFromMarketplace = async snakeId => {
    console.log("Remov Snake " + snakeId + " from market")

    await cryptoSnakeMarket.methods.removeSnakeFromMarketplace(snakeId).call();

    console.log("Removed Snake " + snakeId + " from market")
    fireNotify("Removed Snake " + snakeId + " from market", "green")

    await displaySnakesOnMarket()
    await showAllSnakes()
};

const buyTheSnake = async snakeId => {
    console.log("buyTheSnake")
    const price = await getPriceOfSnake(snakeId)
    await cryptoSnakeMarket.methods.buySnake(snakeId).send({
        from: userAccount,
        value: window.web3.utils.toWei(price, "ether") //TODO: wie werden die ether hier übergeben?
    });
    console.log("Bought Snake " + snakeId)
    fireNotify("Bought Snake " + snakeId, "green")

};

const getPriceOfSnake = snakeId => {
    return cryptoSnakeMarket.methods.getPriceOfSnake(snakeId).call()
}

const getAllSnakeIdsFromMarketplace = () => {
    return cryptoSnakeMarket.methods.getAllSnakeIdsFromMarketplace().call();
}

