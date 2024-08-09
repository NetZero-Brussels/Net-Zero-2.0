// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReputationSystem {
    mapping(address => uint256) public reputation;
    address public admin;

    address[] public users;
    mapping(address => bool) public isUser;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Unauthorized: not an admin.");
        _;
    }

    event ReputationUpdated(address indexed user, uint256 newReputation);

    function addUser(address user) public onlyAdmin {
        if (!isUser[user]) {
            users.push(user);
            isUser[user] = true;
        }
    }

    function increaseReputation(address user, uint256 points) external onlyAdmin {
        require(points > 0, "Error: Points must be positive.");
        if (!isUser[user]) {
            users.push(user);
            isUser[user] = true;
        }
        reputation[user] += points;
        emit ReputationUpdated(user, reputation[user]);
    }

    function decreaseReputation(address user, uint256 points) external onlyAdmin {
        require(points > 0 && reputation[user] >= points, "Error: Invalid points.");
        reputation[user] -= points;
        emit ReputationUpdated(user, reputation[user]);
    }

    function getUsers() external view returns (address[] memory) {
        return users;
    }
}
