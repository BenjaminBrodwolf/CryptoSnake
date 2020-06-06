const addSnakeToMarketplace = async () => {
    let snakeId = null; //TODO: connect with input field
    let price = null;   //TODO: connect with input fields
        await cryptoSnakes.methods.addSnakeToMarketplace(snakeId, price).send({from: userAccount});
    console.log("Added Snake " + snakeId + " to market")
};

const removeSnakeFromMarketplace = async () => {
    let snakeId = null; //TODO: connect with input field
    await cryptoSnakes.methods.removeSnakeFromMarketplace(snakeId).send({from: userAccount});
    console.log("Removed Snake " + snakeId + " from market")
};

const buySnake = async () => {
    let snakeId = null; //TODO: connect with input field
    let preis = null; //TODO: connect with input field
    await cryptoSnakes.methods.buySnake(snakeId).send({from: userAccount, value: window.web3.utils.toWei(preis, "ether") //TODO: wie werden die ether hier übergeben?
    });
    console.log("Bought Snake " + snakeId)
};



