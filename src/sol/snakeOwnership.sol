pragma solidity ^0.4.25;

import "./erc721.sol";
import "./safeMath.sol";
import "./snakeReproduction.sol";

contract SnakeOwnership is SnakeReproduction, ERC721 {

    using SafeMath for uint256;

    mapping(uint => address) snakeApprovals;

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
        _transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId) external payable onlyOwnerOf(_tokenId) {
        snakeApprovals[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }
    
 
}