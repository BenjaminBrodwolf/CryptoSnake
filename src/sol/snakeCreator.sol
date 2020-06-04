pragma solidity ^0.4.25;

import "./safeMath.sol";
import "./ownable.sol";
import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract SnakeCreator is Ownable {

  using SafeMath for uint256;
  using SafeMath32 for uint32;
  using SafeMath16 for uint16;
  using strings for *;

  event NewSnake(uint snakeId, string name, uint dna);
  
  uint dnaDigits = 16;
  uint dnaModulus = 10 ** dnaDigits;
  uint cooldownTime = 30 seconds;

  struct Snake {
    string name;
    uint dna;
    uint32 level;
    uint32 readyTime;
  }

  Snake[] public snakes;

  mapping (uint => address) public snakeToOwner;
  mapping (address => uint) ownerSnakeCount;
  mapping (uint => uint[2]) public childToParent;
  mapping (address => bool) public gotInitialSnake;
  
 
  function _createSnake(string _name, uint _dna) internal returns(uint) {
    require(bytes(_name).length >= 3);  
    uint id = snakes.push(Snake(_name, _dna, 1, uint32(now + cooldownTime))) - 1;
    snakeToOwner[id] = msg.sender;
    ownerSnakeCount[msg.sender] = ownerSnakeCount[msg.sender].add(1);
    emit NewSnake(id, _name, _dna);
    return id;
  }

  function _generateRandomDna(string _str) private view returns (uint) {
    uint rand = uint(keccak256(abi.encodePacked(_str)));
    return rand % dnaModulus; //Damit Zahl 16 Stellen hat
  }

  function createRandomSnake(string _name) public {
    //require(gotInitialSnake[msg.sender]);

    uint randDna = _generateRandomDna(_name);
    randDna = randDna - randDna % 100; //macht letzte beiden Ziffern zu 00
    _createSnake(_name, randDna);
  }
  
 function createInitalSnake(string _name) public {
    require(!gotInitialSnake[msg.sender]);
    createRandomSnake(_name);
    gotInitialSnake[msg.sender] = true;
  }
  
 function createPayedSnake(string _name) public payable {
    require(msg.value == 0.001 ether);  //Schlangenpreis
    createRandomSnake(_name);

  }
  
  function getSnakesByOwner(address _owner) public view onlyOwner returns(uint[]) {
    uint[] memory snakesbyOwner = new uint[](ownerSnakeCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < snakes.length; i++) {
      if (snakeToOwner[i] == _owner) {
        snakesbyOwner[counter] = i;
        counter++;
      }
    }
    return snakesbyOwner;
  }
  
  
  
  
  

}