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

    Match[] matches;

    function Create_Match(string _team0Name, string _team1Name) returns (bytes32) {
        Match memory _match = Match({
            match_id: sha256(block.timestamp),
            team0Name: _team0Name,
            team1Name: _team1Name,
            team0BetSum: 0,
            team1BetSum: 1,
            state: true,
            TAX: 10
        });
        uint256 newMatchID = matches.push(_match) - 1;
    }




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

    function getMatch(uint _index) constant returns (string _team1Name, bytes32 _matchID, string _team0Name) {
        Match storage _match = matches[_index];
        return (_match.team1Name, _match.match_id, _match.team0Name);
    
    }

    function getLength() public view returns (uint){
        return (matches.length);

    }




}


