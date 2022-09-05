// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.3/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.3/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.3/utils/Counters.sol";

contract ModelNFT is ERC721, Ownable {
    struct Model {
        uint256 id;
        string name;
        string loss;
        string epoch;
        bytes32 hash;
        uint256 timestamp;
    }

    using Counters for Counters.Counter;

    mapping(address => Model[]) public models;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("ModelNFT", "MNFT") {}

    function safeMint(string memory name, string memory loss, string memory epoch) public {
        // generate hash
        uint256 tokenId = _tokenIdCounter.current();
        bytes32 hash = keccak256(abi.encodePacked(msg.sender, block.timestamp, tokenId, name, loss, epoch));
        _tokenIdCounter.increment();

        // update models
        Model[] storage modelList = models[msg.sender];
        modelList.push(Model(tokenId, name, loss, epoch, hash, block.timestamp));
        models[msg.sender] = modelList;

        // mint
        _safeMint(msg.sender, tokenId);
    }
}
