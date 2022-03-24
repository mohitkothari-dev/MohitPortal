// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract LinkPortal {

    uint256 totalLinks;

    event NewLink(address indexed from, uint256 timestamp, string message);

    /*
    * This is a custom data type, where we can customize what we want to hold inside it. 
    */
    struct Link {
        address sender; // the address of the sender who sent the link
        string message; // message that user sent
        uint256 timestamp;  // the time when user sent the message
    }

    Link[] links;   //a vairalb link of type Links

    constructor() payable {
        console.log("Hey there! I am smart contract");
    }

    function link(string memory _message) public {
        totalLinks += 1;
        console.log("%s has shared a link!", msg.sender);       //Wallet address of a sender

        links.push(Link(msg.sender,_message,block.timestamp));

        emit NewLink(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = 0.0001 ether;
        require (
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    function getAllLinks() public view returns (Link[] memory) {
        return links;
    }

    function getTotalCount() public view returns (uint256) {
        console.log("We Have %d total links shared", totalLinks);
        return totalLinks;
    }
}