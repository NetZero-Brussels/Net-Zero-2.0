// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/ReputationSystem.sol";

contract TestReputationSystem is Test {
    ReputationSystem repSystem;
    address admin = address(this);

    function setUp() public {
        repSystem = new ReputationSystem();
        vm.prank(admin);
        repSystem.increaseReputation(address(2), 100);
    }

    function testIncreaseReputation() public {
        vm.prank(admin);
        repSystem.increaseReputation(address(2), 50);
        assertEq(repSystem.reputation(address(2)), 150);
    }

    function testDecreaseReputation() public {
        vm.prank(admin);
        repSystem.decreaseReputation(address(2), 50);
        assertEq(repSystem.reputation(address(2)), 50);
    }

    function testFailNonAdminCannotIncrease() public {
        vm.prank(address(3));
        repSystem.increaseReputation(address(2), 50);
    }

    function tearDown() public {
        vm.stopPrank();
    }
}
