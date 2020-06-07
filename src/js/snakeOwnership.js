function approve(approvedAdress, tokenID) {
    return cryptoSnakeReproduction.methods.approve(approvedAdress, tokenID).send({
        from: userAccount
    })
}