const createReceiveList = async () =>{
    const receiveList = document.getElementById("receiveList");

    const ids = await getListOfReceivedSnakeIDs();
    console.log(ids)

    if (ids.length > 0 ){
        let i =0

        for (id in ids) {
            console.log(ids[i])
            console.log(id)

            const snake = await getSnakeDetails(id)
            receiveList.innerHTML += `<p onclick='receiveSnakeFrom(${ids[i]})'> ${snake.name} </p>`
            i++;
        }

    } else {
        receiveList.innerHTML = '<p>"There are no received Snakes for you"</p>'
    }

}

// ----------------- CONTRACT FUNCTION ---------------

const receiveSnakeFrom = async snakeID => {

    const receivedFromAddress = await getAddressToReceivedSnakeID(snakeID);

    await cryptoSnakeOwnership.methods.transferFrom(receivedFromAddress, userAccount, snakeID).send({
        from: userAccount
    })

    fireNotify(`Snake with ID ${snakeID} \n is received`)
    await showAllSnakes()
}

const approve = async (el, snakeID)  => {
    const inputField =  el.previousElementSibling.value;
    console.log(inputField)
    await cryptoSnakeOwnership.methods.approve(inputField, snakeID).send({
        from: userAccount
    })
    fireNotify("Snake recieved from: \n" + inputField)
    await showAllSnakes()
}

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




const getListOfReceivedSnakeIDs = () =>{
    return cryptoSnakeOwnership.methods.getAllAprovedSnakes(userAccount).call()
}

const getAddressToReceivedSnakeID = snakeId =>{
    return cryptoSnakeOwnership.methods.snakeApprovals(snakeId).call()
}