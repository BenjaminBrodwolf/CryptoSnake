const snakeCreatorABI = JSON.parse(`
    [
        {
            "constant": true,
            "inputs": [],
            "name": "retreive",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "num",
                    "type": "uint256"
                }
            ],
            "name": "storenumber",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]`)
