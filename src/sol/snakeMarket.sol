pragma solidity ^0.4.25;

import "./snakeOwnership.sol";

contract SnakeMarket is Ownable {

    mapping(uint => address) private snakeToSeller;
    mapping(uint => uint) private snakeToPrice;
    mapping(uint => uint) private snakeToMarket;

    uint countOfSnakesOnMarket;
    uint[] snakesOnMarket;

    ERC721 snakeOwnership;
    SnakeCreator snakeCreator;

    modifier ownerOfSnake(uint snakeId) {
        require(snakeOwnership.ownerOf(snakeId) == msg.sender);
        _;
    }

    function setAddressSnakeOwnership(address _addressSos) external onlyOwner {
        snakeOwnership = ERC721(_addressSos);
    }
    
    function setAddressSnakeCreator(address _addressSc) external onlyOwner {
        snakeCreator = SnakeCreator(_addressSc);
    }

    function addSnakeToMarketplace(uint snakeId, uint price) public {
        require(!snakeCreator.isOnMarket(snakeId));
        uint marketId = snakesOnMarket.push(snakeId);
        snakeToMarket[snakeId] = marketId;
        snakeToSeller[snakeId] = msg.sender;
        snakeToPrice[snakeId] = price;
        countOfSnakesOnMarket += 1;
        
        snakeCreator.updateIsOnMarket(snakeId, true);
    }

    function removeSnakeFromMarketplace(uint snakeId) external ownerOfSnake(snakeId) {
        removeSnakeIdFromMarketplace(snakeId);
        
        //snakeCreator.updateIsOnMarket(snakeId, false);
    }

    function removeSnakeIdFromMarketplace(uint snakeId) private {
        swapAndDelete(snakeId);
        delete snakeToSeller[snakeId];
        delete snakeToPrice[snakeId];
        countOfSnakesOnMarket -= 1;
    }

    function swapAndDelete(uint snakeId) private {
        
        uint index = snakeToMarket[snakeId];
        uint lastElement = snakesOnMarket[snakesOnMarket.length - 1];
        snakesOnMarket[index] = lastElement;

        delete snakesOnMarket[snakesOnMarket.length - 1];
        // TODO: muss man das machen oder geschieht das automatisch ??
        delete snakeToMarket[snakeId];
        snakeToMarket[lastElement] = index;
    }

    function buySnake(uint snakeId) external payable {
        require(snakeToSeller[snakeId] != 0 && msg.value == snakeToPrice[snakeId]);

        address seller = snakeToSeller[snakeId];
        address buyer = msg.sender;

        snakeOwnership.transferFrom(seller, buyer, snakeId);
        removeSnakeIdFromMarketplace(snakeId);
        seller.transfer(msg.value);
        
        //snakeCreator.updateIsOnMarket(snakeId, false);
    }

    function getPriceOfSnake(uint snakeId) public view returns (uint){
        return snakeToPrice[snakeId];
    }

    function getAllSnakeIdsFromMarketplace() external view returns (uint[]){
        uint[] memory snakesFromMarketplace = new uint[](snakesOnMarket.length);
        uint counter = 0;
        for (uint i = 0; i < snakesFromMarketplace.length; i++) {

            snakesFromMarketplace[counter] = snakesOnMarket[i];
            counter++;

        }
        return snakesFromMarketplace;
    }
}
