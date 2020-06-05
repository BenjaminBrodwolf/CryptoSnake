pragma solidity ^0.4.25;

import "./snakeOwnership.sol";

//contract SnakeOwnership {
//
//    function balanceOf(address _owner) external view returns (uint256) {}
//
//    function ownerOf(uint256 _tokenId) external view returns (address) {}
//
//    function transferFrom(address _from, address _to, uint256 _tokenId) external payable {}
//
//    function approve(address _approved, uint256 _tokenId) external payable onlyOwnerOf(_tokenId) {}
//
//}

contract SnakeMarket {

    SnakeOwnership snakeOwnership;
    SnakeCreator snakeCreator;

    mapping(uint => address) snakeToSeller;
    mapping(uint => uint) snakeToPrice;

    constructor() public {
        snakeOwnership = new SnakeOwnership();
    }

    function addSnakeToMarketplace(uint snakeId, uint price) external {
        // require sender muss Schlange besitzen
        // require(snakeOwnership.snakeToOwner[snakeId] == msg.sender);

        snakeToSeller[snakeId] = msg.sender;
        snakeToPrice[snakeId] = price;
    }

    function removeSnakeFromMarketplace(uint snakeId) external {
        // require sender muss schlnage besitzen
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
