pragma solidity ^0.4.25;

import "./snakeOwnership.sol";

contract SnakeMarket is Ownable {

    mapping(uint => address) snakeToSeller;
    mapping(uint => uint) snakeToPrice;

    ERC721 snakeOwnership;

    modifier ownerOfSnake(uint snakeId) {
        require(snakeOwnership.ownerOf(snakeId) == msg.sender);
        _;
    }

    function setAddressSnakeOwnership(address _addressSos) external onlyOwner {
        snakeOwnership = ERC721(_addressSos);
    }

    function addSnakeToMarketplace(uint snakeId, uint price) external ownerOfSnake(snakeId) {
        snakeToSeller[snakeId] = msg.sender;
        snakeToPrice[snakeId] = price;
    }

    function removeSnakeFromMarketplace(uint snakeId) external ownerOfSnake(snakeId) {
        delete snakeToSeller[snakeId];
        delete snakeToPrice[snakeId];
    }

    function buySnake(uint snakeId) external payable {
        require(snakeToSeller[snakeId] != 0 && msg.value == snakeToPrice[snakeId]);

        address seller = snakeToSeller[snakeId];

        snakeOwnership.transferFrom(seller, msg.sender, snakeId);

        seller.transfer(msg.value);
    }
}
