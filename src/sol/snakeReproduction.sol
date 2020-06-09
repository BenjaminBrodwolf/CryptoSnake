pragma solidity ^0.4.25;

import "./snakeCreator.sol";

contract SnakeReproduction is SnakeCreator {

    using strings for *;

    mapping(uint => uint[2]) public childToParent;
    mapping(uint => address) snakeFoodToOwner;

    string[] private snakeIncredients = ['Insects', 'Snails', 'Birds', 'Snakes', 'Deer'];

    struct SnakeFood {
        string name;
        uint8 levelUp;
    }

    SnakeFood[] public snakeFoods;

    modifier onlyOwnerOf(uint _snakeId) {
        require(msg.sender == snakeToOwner[_snakeId]);
        _;
    }
    
        modifier snakeNotOnMarket(uint _snakeId) {
        require(!snakeToIsOnMarket[_snakeId]);
        _;
    }
    

    //Prevents a snakes to be paired in short succession
    function _triggerCooldown(Snake storage _snake) internal {
        _snake.readyTime = uint32(now + cooldownTime);
    }

    function _isReady(Snake storage _snake) internal view returns (bool) {
        return (_snake.readyTime <= now);
    }
    
    function isSnakeReady(uint snakeId) public view returns (bool) {
        return snakes[snakeId].readyTime <= now;
    }

    function reproduction(uint _sourceSnakeId, uint _targetSnakeId) public onlyOwnerOf(_sourceSnakeId) onlyOwnerOf(_targetSnakeId) snakeNotOnMarket(_sourceSnakeId) snakeNotOnMarket(_targetSnakeId)    {
        Snake storage mySourceSnake = snakes[_sourceSnakeId];
        Snake storage myTargetSnake = snakes[_targetSnakeId];
        require(_isReady(mySourceSnake) && _isReady(myTargetSnake));
        
        string memory childName = _getChildName(mySourceSnake, myTargetSnake);

        uint newDna = (mySourceSnake.dna + myTargetSnake.dna) / 2;
        newDna = newDna - newDna % 100 + 42;
        //Marks the last 2 digits with 42 to identify the kind of a paired snake.

        uint childId = _createSnake(childName, newDna);
        childToParent[childId] = [_sourceSnakeId, _targetSnakeId];

        _triggerCooldown(mySourceSnake);
        _triggerCooldown(myTargetSnake);
    }
    
    //Takes the first half of the name of one snake and the last half of the name of the second snake.
    //Than it joins the halves to a single name, the child's name.
    function _getChildName(Snake mySourceSnake, Snake myTargetSnake) private pure returns (string){
        uint len1 = uint8(mySourceSnake.name.toSlice().len() / 2);
        uint len2 = uint8(myTargetSnake.name.toSlice().len());
        string memory sub1 = substring(mySourceSnake.name, 0, len1);
        string memory sub2 = substring(myTargetSnake.name, (len2 / 2), len2);
        string memory childName = sub1.toSlice().concat(sub2.toSlice());
        
        return childName;
    }

    function feeding(uint snakeFoodId, uint snakeId) external snakeNotOnMarket(snakeId) {
        require(snakeToOwner[snakeId] == msg.sender && snakeFoodToOwner[snakeFoodId] == msg.sender);

        // TODO: use safemath ?
        snakes[snakeId].level += snakeFoods[snakeFoodId].levelUp;
        delete snakeFoodToOwner[snakeFoodId];
    }

    function buySnakeFood(string secretIngredient) external payable returns (uint) {
        // TODO: Preis anpassen
        require(msg.value == 0.001 ether);
        uint rand = uint(keccak256(abi.encodePacked(secretIngredient)));
        uint8 levelup = uint8((rand % 5) + 1);
        string memory ingredient = snakeIncredients[levelup];
        SnakeFood memory snakeFood = SnakeFood(ingredient, levelup);
        uint id = snakeFoods.push(snakeFood);
        snakeFoodToOwner[id] = msg.sender;

        return id;
    }

    function snakeFoodEquals(SnakeFood sf1, SnakeFood sf2) internal pure returns (bool){
        return (keccak256(abi.encodePacked(sf1.name, sf1.levelUp)) == keccak256(abi.encodePacked(sf2.name, sf2.levelUp)));
    }

    //To connect the name of two snakes
    function substring(string str, uint startIndex, uint endIndex) internal pure returns (string) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex - startIndex);
        for (uint i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = strBytes[i];
        }

        return string(result);
    }

    function getNamesOfParents(uint childId) public view returns (string) {
        uint[2] memory parentsIDs = childToParent[childId];
        string memory snakeName1 = snakes[parentsIDs[0]].name;
        string memory snakeName2 = snakes[parentsIDs[1]].name;

        string memory deliminator = ";";

        return snakeName1.toSlice().concat(deliminator.toSlice()).toSlice().concat(snakeName2.toSlice());

    }
}