pragma solidity ^0.4.24;

contract BetsAccessControl {

    event ContractUpgrade(address newContract);

    address public ceoAddress;
    address public arbiterAddress;

    bool public paused = false;

    modifier onlyCEO() {
        require(msg.sender == ceoAddress);
        _;
    }

    modifier onlyArbiter() {
        require(msg.sender == arbiterAddress);
        _;
    }

    function setCEO(address _newCEO) public onlyCEO{
        require(_newCEO != address(0));
        ceoAddress = _newCEO;
    }

    function setArbiter(address _newArbiter) public onlyArbiter {
        require(_newArbiter != address(0));
        arbiterAddress = _newArbiter;
    }

    function withdrawBalance() external onlyCEO {
        ceoAddress.transfer(this.balance);
    }

    modifier whenNotPaused() {
        require(!paused);
        _;
    }

    modifier whenPaused {
        require(paused);
        _;
    }
    
    function pause() public onlyCEO whenNotPaused {
        paused = true;
    }

    function unpause() public onlyCEO whenPaused {
        paused = false;
    }



}

