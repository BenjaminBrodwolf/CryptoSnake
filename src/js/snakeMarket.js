// ----------------- CONTRACT FUNCTION ---------------


const addSnakeToMarketplace = async (element, snakeId) => {
    const inputField = element.previousElementSibling;
    const price = parseFloat(inputField.value)
    console.log(snakeId)
    if (price < 0) {
        fireNotify("Price must be higher then 0")
    } else {
        await cryptoSnakeMarket.methods.addSnakeToMarketplace(snakeId, price).send({from: userAccount});
        console.log("Added Snake " + snakeId + " to market")
    }
};

const removeSnakeFromMarketplace = async () => {
    let snakeId = null; //TODO: connect with input field
    await cryptoSnakeMarket.methods.removeSnakeFromMarketplace(snakeId).send({from: userAccount});
    console.log("Removed Snake " + snakeId + " from market")
};

const buySnake = async () => {
    let snakeId = null; //TODO: connect with input field
    let preis = null; //TODO: connect with input field
    await cryptoSnakeMarket.methods.buySnake(snakeId).send({
        from: userAccount, value: window.web3.utils.toWei(preis, "ether") //TODO: wie werden die ether hier übergeben?
    });
    console.log("Bought Snake " + snakeId)
};



