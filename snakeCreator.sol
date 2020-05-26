pragma solidity ^0.4.25;

import "./safeMath.sol";

contract SnakeCreator {

  using SafeMath for uint256;
  using SafeMath32 for uint32;
  using SafeMath16 for uint16;

  event NewSnake(uint snakeId, string name, uint dna);
  
  uint dnaDigits = 16;
  uint dnaModulus = 10 ** dnaDigits;

  struct Snake {
    string name;
    uint dna;
    uint32 level;
  }

  Snake[] public snakes;

  mapping (uint => address) public snakeToOwner;
  mapping (address => uint) ownerSnakeCount;
  

  function _createSnake(string _name, uint _dna) internal {
    uint id = snakes.push(Snake(_name, _dna, 1)) - 1;
    snakeToOwner[id] = msg.sender;
    ownerSnakeCount[msg.sender] = ownerSnakeCount[msg.sender].add(1);
    emit NewSnake(id, _name, _dna);
  }

  function _generateRandomDna(string _str) private view returns (uint) {
    uint rand = uint(keccak256(abi.encodePacked(_str)));
    return rand % dnaModulus;
  }

  function createRandomSnake(string _name) public {
    //require(ownerSnakeCount[msg.sender] == 0);
    uint randDna = _generateRandomDna(_name);
    randDna = randDna - randDna % 100;
    _createSnake(_name, randDna);
  }

}