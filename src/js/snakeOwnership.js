
const transferSnakeTo = async (el, snakeID) => {
    const inputField =  el.previousElementSibling.value;
    el.previousElementSibling.value = ""

    console.log(inputField)
    await cryptoSnakeOwnership.methods.transferFrom(userAccount, inputField, snakeID).send({
        from: userAccount
    })
    fireNotify(`Snake with ID ${snakeID} \n is send to: \n ${inputField}`)
    await showAllSnakes()
}



const receiveSnakeFrom = async el => {
    const inputField =  el.previousElementSibling.value;
    el.previousElementSibling.value = ""

    console.log(inputField)
    await cryptoSnakeOwnership.methods.transferFrom(inputField, userAccount).send({
        from: userAccount
    })
    fireNotify(`Snake with ID ${snakeID} \n is send to: \n ${inputField}`)
    await showAllSnakes()
}

const approve = async (receiveAddress, snakeID)  => {

    await cryptoSnakeOwnership.methods.approve(receiveAddress, snakeID).send({
        from: userAccount
    })
    fireNotify("Snake recieved from: \n" + inputField)
    await showAllSnakes()
}

const createReceiveList = async () =>{
    const ids = await getListOfReceivedSnakeIDs();
    const receiveList = document.getElementById("receiveList");
    console.log(ids)

    if (ids.length > 0 ){
        for (id in ids) {
            const receiveAddress = await getAddressToReceivedSnakeID(id);
            const snake = await getSnakeDetails(id)

            const listElement = `<p onclick="approve(${receiveAddress}, ${id}"> ${snake.name} </p>`
            receiveList.innerHTML += listElement;
        }
    } else {
        receiveList.innerHTML = '<p>"There are no received Snakes for you"</p>'
    }

}

const getListOfReceivedSnakeIDs = () =>{
    return cryptoSnakeOwnership.methods.getAllAprovedSnakes(userAccount).call()
}

const getAddressToReceivedSnakeID = snakeId =>{
    return cryptoSnakeOwnership.methods.snakeApprovals(snakeId).call()
}