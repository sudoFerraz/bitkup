pragma solidity ^0.4.18;

import "./BetsAccessControl.sol";

contract BetsBase is BetsAccessControl {
    
    event MatchCreation(uint256 match_id);

    event BetMade(uint256 match_id, address indexed from, bool forTeam, uint amount);

    event MatchEnd(uint256 match_id);

    // The main match struct, every match in bitkup is represented by a copy
    // of this structure 
    struct Match {
        //match unique ID
        uint256 match_id;

        string team0Name;
        string team1Name;
        // array of bet sum on each team
        uint team0BetSum;
        uint team1BetSum;
        // array of bet sum per address on each team
        mapping (address => uint) betsToTeam0;
        mapping (address => uint) betsToTeam1;

        uint8 TAX;
    
    }

    function CreateMatch(string _team0Name, string _team1Name) onlyCEO {
    
    
    }
    
    function test() public view returns (string) {
        return("teste");
    }



}


