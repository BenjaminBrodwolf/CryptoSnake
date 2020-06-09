pragma solidity ^0.4.25;

import "./safeMath.sol";
import "./ownable.sol";
import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract SnakeCreator is Ownable {

    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16; // TODO: Zeile am Schluss event. löschen, da bis jetzt nicht gebraucht
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

    mapping(uint => address) public snakeToOwner;
    mapping(address => uint) ownerSnakeCount;
    mapping(address => bool) public gotInitialSnake;
    
    mapping(uint => bool) public snakeToIsOnMarket;
    
    function updateIsOnMarket (uint snakeId, bool isOnMarket) public {
        snakeToIsOnMarket[snakeId] = isOnMarket;
        //snakes[snakeId].isOnMarket = isOnMarket;
    }
    
    function isOnMarket (uint snakeId) public view returns(bool) {
      return snakeToIsOnMarket[snakeId];
    }


    function _createSnake(string _name, uint _dna) internal returns (uint) {
        require(bytes(_name).length >= 3);
        uint id = snakes.push(Snake(_name, _dna, 1, uint32(now + cooldownTime))) - 1;
        snakeToOwner[id] = msg.sender;
        ownerSnakeCount[msg.sender] = ownerSnakeCount[msg.sender].add(1);
        emit NewSnake(id, _name, _dna);
        return id;
    }

    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus; //To ensure 16 digits in DNA
    }

    function createRandomSnake(string _name) public {
        //require(gotInitialSnake[msg.sender]);
        uint randDna = _generateRandomDna(_name);
        randDna = randDna - randDna % 100; //Marks the last two digits with 00 to identify the Kind of new generated snakes
        _createSnake(_name, randDna);
    }

    //Initial snakes are free of charge and can only generated once per user.
    function createInitialSnake(string _name) public {
        require(!gotInitialSnake[msg.sender]);
        createRandomSnake(_name);
        gotInitialSnake[msg.sender] = true;
    }

    function createPayedSnake(string _name) public payable {
        require(msg.value == 0.001 ether); //Preis of one snake
        createRandomSnake(_name);
    }

    function getSnakesByOwner(address _owner) public view returns (uint[]) {
        uint[] memory snakesByOwner = new uint[](ownerSnakeCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < snakes.length; i++) {
            if (snakeToOwner[i] == _owner) {
                snakesByOwner[counter] = i;
                counter++;
            }
        }
        return snakesByOwner;
    }
    
  
}