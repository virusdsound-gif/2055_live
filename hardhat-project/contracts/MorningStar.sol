pragma solidity ^0.8.20;

contract MorningStar {
    string public name = "The Morning Star 🌟";
    string public symbol = "STAR";
    string public constant ROOT_FREQUENCY = "0.7 Hz Django Sound";

    event MorningStarAnchored(address deployer);

    constructor() {
        emit MorningStarAnchored(msg.sender);
    }
}
