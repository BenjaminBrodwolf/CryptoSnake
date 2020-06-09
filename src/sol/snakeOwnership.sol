pragma solidity ^0.4.25;

import "./erc721.sol";
import "./safeMath.sol";
import "./snakeReproduction.sol";

contract SnakeOwnership is SnakeReproduction, ERC721 {

    using SafeMath for uint256;

    mapping(uint => address) public snakeApprovals;
    mapping(address => uint) receiverToApprovalsCount;
    mapping(uint => uint) snakeToApprovedId;
    
    uint[] public approvedSnakes;

    function balanceOf(address _owner) external view returns (uint256) {
        return ownerSnakeCount[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        return snakeToOwner[_tokenId];
    }

    function _transfer(address _from, address _to, uint256 _tokenId) private {
        ownerSnakeCount[_to] = ownerSnakeCount[_to].add(1);
        ownerSnakeCount[msg.sender] = ownerSnakeCount[msg.sender].sub(1);
        snakeToOwner[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external payable {
        require(snakeToOwner[_tokenId] == msg.sender || snakeApprovals[_tokenId] == msg.sender);
        
        if(snakeApprovals[_tokenId] == msg.sender){
            delete snakeApprovals[_tokenId];
            receiverToApprovalsCount[msg.sender] -= 1;
            // TODO: remove snake id from array -> approved snakes: swap & delete
            swapAndDelete(_tokenId);
        }
        
        _transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId) external payable onlyOwnerOf(_tokenId) {
        snakeApprovals[_tokenId] = _approved;
        receiverToApprovalsCount[_approved] += 1;
        uint approvedId = approvedSnakes.push(_tokenId);
        snakeToApprovedId[_tokenId] = approvedId;
        emit Approval(msg.sender, _approved, _tokenId);
    }
    
    function swapAndDelete(uint snakeId) private {
        uint index = snakeToApprovedId[snakeId];
        uint lastElement = approvedSnakes[approvedSnakes.length - 1];
        approvedSnakes[index] = lastElement;

        delete approvedSnakes[approvedSnakes.length - 1];
        // TODO: muss man das machen oder geschieht das automatisch ??
        delete snakeToApprovedId[snakeId];
        snakeToApprovedId[lastElement] = index;
    }
    
    function getAllAprovedSnakes(address receiver) external view returns (uint[]) {
       uint[] memory receivedSnakes = new uint[](receiverToApprovalsCount[receiver]);
       
        uint counter = 0;
        for (uint i = 0; i < receivedSnakes.length; i++) {
            if (snakeApprovals[approvedSnakes[i]] == receiver) {
                receivedSnakes[counter] = approvedSnakes[i];
                counter++;
            }
        }
        return receivedSnakes;
    }
}