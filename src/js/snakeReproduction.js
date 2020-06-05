function pairSnakes(sourceSnakeId, targetSnakeId) {
    return cryptoSnakes.methods.reproduction(sourceSnakeId, targetSnakeId).send({
        from: userAccount
    })
}