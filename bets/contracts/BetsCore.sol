pragma solidity ^0.4.24;


import "./BetsBase.sol";

contract BetsCore is BetsBase{

    //Set in case the core contract is broken and an upgrade is required
    address public newContractAddress;

    // Create the main Bet smart contract instance
    function BetCore() public {
        paused = true;
        ceoAddress = msg.sender;
        arbiterAddress = msg.sender;
        // Starts paused
   //     paused = true;
        
        // the creator of the contract is the initial CEO
     //   ceoAddress = msg.sender;

        // the creator of the contract is also the initial arbiter
       // arbiterAddress = msg.sender;

    }

//    function setNewAddress(address _v2Address) public onlyCEO whenPaused {
 //       newContractAddress = _v2Address;
  //      ContractUpgrade(_v2Address);
   // }

    // Reject all ether from being sent here, unless it's from one of
    // the two bet contracts
 //   function() external payable {
   //     require(
     //       msg.sender == address(BetsBase)
       // );
   // }




}

