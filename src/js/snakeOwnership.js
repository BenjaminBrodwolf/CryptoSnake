const approve = async el => {
    const inputField =  el.previousElementSibling.value;
    console.log(inputField)
    return cryptoSnakeOwnership.methods.approve(inputField, userAccount).send({
        from: userAccount
    })
}

const transferSnakeTo = async el => {
    const inputField =  el.previousElementSibling.value;
    console.log(inputField)
    await cryptoSnakeOwnership.methods.transferFrom(userAccount, inputField).send({
        from: userAccount
    })
    fireNotify("Snake send to:" + tokenID)
}