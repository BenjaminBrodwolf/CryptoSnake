const snakeMarketABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "snakeId",
                "type": "uint256"
            },
            {
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "addSnakeToMarketplace",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "snakeId",
                "type": "uint256"
            }
        ],
        "name": "buySnake",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "snakeId",
                "type": "uint256"
            }
        ],
        "name": "removeSnakeFromMarketplace",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_addressSos",
                "type": "address"
            }
        ],
        "name": "setAddressSnakeOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]