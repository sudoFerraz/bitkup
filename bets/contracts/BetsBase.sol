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

    mapping (bytes32 => uint256) Matches_Index;

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
        uint256 newMatchIndex = matches.push(_match) - 1;
        Matches_Index[_match.match_id] = newMatchIndex;
    }


    function proofFor(string document) constant returns (bytes32) {
        return sha256(document);
    }

    function getMatch(uint _index) constant returns (string _team1Name, string _team0Name, bytes32 _matchId, uint _team0BetSum, uint _tem1BetSum) {
        Match storage _match = matches[_index];
        return (_match.team1Name, _match.team0Name, _match.match_id, _match.team0BetSum, _match.team1BetSum);
    
    }

    function getLength() public view returns (uint){
        return (matches.length);

    }

    function getIndexById(bytes32 _matchid) constant returns (uint256) {
        uint256 Match_Index = Matches_Index[_matchid];
        return (Match_Index);

    }


    function makeBet(bytes32 _matchid) payable external {
        if (msg.value == 0) throw;
        

    }


}


