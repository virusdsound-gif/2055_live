// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MorningStar is ERC721URIStorage, Ownable {

    uint256 public nextTokenId;

    constructor()
        ERC721("The Morning Star", "STAR")
        Ownable(msg.sender)
    {}

    function mint(address to, string memory metadataURI)
        public
        onlyOwner
    {
        uint256 tokenId = nextTokenId;

        _safeMint(to, tokenId);

        _setTokenURI(tokenId, metadataURI);

        nextTokenId++;
    }
}
