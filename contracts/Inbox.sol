// SPDX-License-Identifier: MIT 
pragma solidity >=0.7.0 <0.9.0;

contract Inbox {
    string public message;

    constructor(string memory initMessage) {
        message = initMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}