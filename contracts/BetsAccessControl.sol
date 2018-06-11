pragma solidity 0.4.24;

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

    function setCEO(address _newCEO) external onlyCEO{
        require(_newCEO != address(0));
        ceoAddress = _newCEO;
    }

    function setArbiter(address _newArbiter) external onlyArbiter {
        require(_newArbiter != address(0));
        arbiterAddress = _newArbiter;
    }

    function withdrawBalance() external onlyCEO {
        ceoAddress.transfer(address(this).balance);
    }

    modifier whenNotPaused() {
        require(!paused);
        _;
    }

    modifier whenPaused {
        require(paused);
        _;
    }
    
    function pause() external onlyCEO whenNotPaused {
        paused = true;
    }

    function unpause() external onlyCEO whenPaused {
        paused = false;
    }



}

