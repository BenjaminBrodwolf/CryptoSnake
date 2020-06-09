const approve = async el => {
    const inputField =  el.previousElementSibling.value;
    console.log(inputField)
    return cryptoSnakeReproduction.methods.approve(inputField, userAccount).send({
        from: userAccount
    })
}

const transferSnakeTo = async el => {
    const inputField =  el.previousElementSibling.value;
    console.log(inputField)
    await cryptoSnakeReproduction.methods.transferFrom(userAccount, inputField).send({
        from: userAccount
    })
    fireNotify("Snake send to:" + tokenID)
}