let pairingSnakes = [];

const pairingClick = snakeId =>{

    const snake1 = snakeId.parentNode.parentNode.parentNode.parentNode;
    console.log(snake1)
    // console.log(snakeId.parentElement.parentElement.parentElement.parentElement )
    // console.log(snakeId.parentNode.parentNode.parentNode.parentNode )

}

function pairSnakes(sourceSnakeId, targetSnakeId) {
    return cryptoSnakes.methods.reproduction(sourceSnakeId, targetSnakeId).send({
        from: userAccount
    })
}