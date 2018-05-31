pragma solidity ^0.4.18;

// import "./BetsAccessControl.sol";

contract BetsBase {
    
    event MatchCreation(uint256 match_id);

    event BetMade(uint256 match_id, address indexed from, bool forTeam, uint amount);

    event MatchEnd(uint256 match_id);

    // The main match struct, every match in bitkup is represented by a copy
    // of this structure 
    struct Match {
        //match unique ID
        bytes32 match_id;

        string team0Name;
        string team1Name;
        // array of bet sum on each team
        uint team0BetSum;
        uint team1BetSum;
        // array of bet sum per address on each team
        mapping (address => uint) betsToTeam0;
        mapping (address => uint) betsToTeam1;
        bool state;
        uint8 TAX;
    
    }

    mapping (bytes32 => Match) Matches;

    function CreateMatch(string _team0Name, string _team1Name) returns (bytes32){
        bytes32 matchid = sha256(block.timestamp);
        Matches[matchid].team0Name = _team0Name;
        Matches[matchid].team1Name = _team1Name;
        Matches[matchid].team0BetSum = 0;
        Matches[matchid].team1BetSum = 0;
        Matches[matchid].state = true;
        Matches[matchid].TAX = 10;
        return (matchid);
    }



    function proofFor(string document) constant returns (bytes32) {
        return sha256(document);
    }



}


