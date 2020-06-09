const createReceiveList = async () =>{
    const receiveList = document.getElementById("receiveList");

    let ids = await getListOfReceivedSnakeIDs();
    ids = ids.map(e => parseInt(e))
    console.log(ids)

    if (ids.length > 0 ){
        let i =0

        for (let id in ids) {
            console.log(ids[i])
            console.log(ids)

            const snake = await getSnakeDetails(id)
            console.log(snake)
            receiveList.innerHTML += `<p style="font-weight: bold; cursor: pointer" onclick='receiveSnakeFrom(${id})'> ${snake.name} </p>`
            i++;
        }

    } else {
        receiveList.innerHTML = '<h4 style="font-weight: bold;">There are no received Snakes for you </h4>'
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




const getListOfReceivedSnakeIDs = async () =>{
    console.log(userAccount)
    return await cryptoSnakeOwnership.methods.getAllAprovedSnakes(userAccount).call()
}

const getAddressToReceivedSnakeID = snakeId =>{
    return cryptoSnakeOwnership.methods.snakeApprovals(snakeId).call()
}