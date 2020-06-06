pragma solidity ^0.4.25;

import "./snakeCreator.sol";

contract SnakeReproduction is SnakeCreator {

    using strings for *;

    modifier onlyOwnerOf(uint _snakeId) {
        require(msg.sender == snakeToOwner[_snakeId]);
        _;
    }

    //Prevents a snakes to be paired in short succession
    function _triggerCooldown(Snake storage _snake) internal {
        _snake.readyTime = uint32(now + cooldownTime);
    }

    function _isReady(Snake storage _snake) internal view returns (bool) {
        return (_snake.readyTime <= now);
    }

    function reproduction(uint _sourceSnakeId, uint _targetSnakeId) public onlyOwnerOf(_sourceSnakeId) onlyOwnerOf(_targetSnakeId) {
        Snake storage mySourceSnake = snakes[_sourceSnakeId];
        Snake storage myTargetSnake = snakes[_targetSnakeId];
        require(_isReady(mySourceSnake) && _isReady(myTargetSnake));

        //Takes the first half of the name of one snake and the last half of the name of the second snake.
        //Than it joins the halves to a single name, the child's name.
        uint len1 = uint8(mySourceSnake.name.toSlice().len() / 2);
        uint len2 = uint8(myTargetSnake.name.toSlice().len());
        string memory sub1 = substring(mySourceSnake.name, 0, len1);
        string memory sub2 = substring(myTargetSnake.name, (len2 / 2), len2);
        string memory childName = sub1.toSlice().concat(sub2.toSlice());

        uint newDna = (mySourceSnake.dna + myTargetSnake.dna) / 2;
        newDna = newDna - newDna % 100 + 42; //Marks the last 2 digits with 42 to identify the kind of a paired snake.

        uint childId = _createSnake(childName, newDna);
        childToParent[childId] = [_sourceSnakeId, _targetSnakeId];

        _triggerCooldown(mySourceSnake);
        _triggerCooldown(myTargetSnake);
    }

    function feeding() internal pure {
        //   TODO:
        // 	- Schlange wird gefüttert. Schlangenfutter kaufen.
        //  => wird stärker oder länger. => Wertsteigerung

    }

    //To connect two snake names
    function substring(string str, uint startIndex, uint endIndex) internal pure returns (string) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex - startIndex);
        for (uint i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = strBytes[i];
        }

        return string(result);
    }
}