pragma solidity ^0.8.20;

contract MorningStar {
    string public constant NAME = "The Morning Star 🌟";
    string public constant ROOT = "0.7 Hz Django Sound";

    event Anchored(address deployer);

    constructor() {
        emit Anchored(msg.sender);
    }
}
