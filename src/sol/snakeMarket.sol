pragma solidity ^0.4.25;

import "./snakeOwnership.sol";

contract SnakeMarket {

    mapping(uint => address) snakeToSeller;
    mapping(uint => uint) snakeToPrice;

    address addressSos;

    function setAddressSnakeOwnership(address _addressSos) external {
        addressSos = _addressSos;
    }


    function addSnakeToMarketplace(uint snakeId, uint price) external {
        // require sender muss Schlange besitzen
        // require(snakeOwnership.snakeToOwner[snakeId] == msg.sender);

        snakeToSeller[snakeId] = msg.sender;
        snakeToPrice[snakeId] = price;
    }

    function removeSnakeFromMarketplace(uint snakeId) external {
        // require sender muss schlange besitzen
        delete snakeToSeller[snakeId];
        delete snakeToPrice[snakeId];
    }


    function buySnake(uint snakeId) external payable {
        require(snakeToSeller[snakeId] != 0 && msg.value == snakeToPrice[snakeId]);

        address seller = snakeToSeller[snakeId];

        callTransferFrom(seller, msg.sender, snakeId);

        seller.transfer(msg.value);
    }

    function callTransferFrom(address _from, address _to, uint256 _tokenId) external payable {
        ERC721 snakeOwnership = ERC721(addressSos);
        snakeOwnership.transferFrom(_from, _to, _tokenId);
    }
}
