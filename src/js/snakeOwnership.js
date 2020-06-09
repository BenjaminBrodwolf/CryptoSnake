const approve = async el => {
    const inputField =  el.previousElementSibling.value;
    el.previousElementSibling.value = ""

    console.log(inputField)
    await cryptoSnakeOwnership.methods.approve(inputField, userAccount).send({
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