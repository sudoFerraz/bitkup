pragma solidity 0.4.24;

import "./BetsAccessControl.sol";

contract BetsBase is BetsAccessControl{
    
    event NewBet(bool team0, address indexed from, uint amount);
    
    event MatchCreation(bytes32 match_id);

    event BetsEnd(bytes32 match_id);

    event MatchResolved(bytes32 match_id, uint8 won);

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
        // True if accepts new bets
        bool state;
        uint8 TAX;
        // 1 Team1, 0 Team0, 2 Not Ended
        uint256 won;
    
    }

    mapping (bytes32 => uint256) Matches_Index;

    Match[] matches;

    function Create_Match(string _team0Name, string _team1Name) public {
        Match memory _match = Match({
            match_id: sha256(abi.encodePacked(block.timestamp)),
            team0Name: _team0Name,
            team1Name: _team1Name,
            team0BetSum: 0,
            team1BetSum: 0,
            state: true,
            TAX: 20,
            won: 2
        });
        uint256 newMatchIndex = matches.push(_match) - 1;
        Matches_Index[_match.match_id] = newMatchIndex;
        emit MatchCreation(_match.match_id);
    }



    function getMatch(uint _index) public view returns (string _team1Name, string _team0Name, bytes32 _matchId, uint _team0BetSum, uint _tem1BetSum, bool _state, uint _won) {
        Match storage _match = matches[_index];
        return (_match.team1Name, _match.team0Name, _match.match_id, _match.team0BetSum, _match.team1BetSum, _match.state, _match.won);
    
    }

    function getLength() public view returns (uint){
        return (matches.length);

    }

    function getIndexById(bytes32 _matchid) internal view returns (uint256) {
        uint256 Match_Index = Matches_Index[_matchid];
        return (Match_Index);

    }


    function makeBet(bytes32 _matchid, bool team0) payable external {
        require(msg.value > 0);
        uint256 _match_index = getIndexById(_matchid);
        Match storage _match = matches[_match_index];
        assert(_match.state == true);
        uint prevSum;
        if (team0 == true) {
            prevSum = _match.team0BetSum;
            require((prevSum + msg.value) >= prevSum);
            assert(_match.team0BetSum >= prevSum);
            _match.betsToTeam0[msg.sender] += msg.value;
            _match.team0BetSum += msg.value;
        }
        else {
            prevSum = _match.team1BetSum;
            require((prevSum + msg.value) >= prevSum);
            assert(_match.team1BetSum >= prevSum);
            _match.betsToTeam1[msg.sender] += msg.value;
            _match.team1BetSum += msg.value;
        }
        emit NewBet(team0, msg.sender, msg.value);

        

    }

    function getBetsBalanceByAddress(bytes32 _match_id) external view returns(uint256, uint256) {
        uint256 _match_index = getIndexById(_match_id);
        Match storage _match = matches[_match_index];
        uint balance0 = _match.betsToTeam0[msg.sender];
        uint balance1 = _match.betsToTeam1[msg.sender];
        return (balance0, balance1);
    }

    function getsSumofBets(bytes32 _match_id) external view returns(uint256, uint256){
        uint256 _match_index = getIndexById(_match_id);
        Match storage _match = matches[_match_index];
        uint balance0 = _match.team0BetSum;
        uint balance1 = _match.team1BetSum;
        return (balance0, balance1);
    }


    function endBetsInMatch(bytes32 _matchid) onlyCEO whenNotPaused external {
        uint256 _match_index = getIndexById(_matchid);
        Match storage _match = matches[_match_index];
        assert(_match.state == true);
        _match.state = false;
        emit BetsEnd(_matchid);
    }
    
    function endMatch(bytes32 _matchid, uint8 _won) onlyCEO whenNotPaused external {
        uint256 _match_index = getIndexById(_matchid);
        Match storage _match = matches[_match_index];
        assert(_match.state == false);
        _match.won = _won;
        emit MatchResolved(_matchid, _won);
    }
    
    function withdrawRewards(bytes32 _matchid) whenNotPaused external {
        uint256 _match_index = getIndexById(_matchid);
        Match storage _match = matches[_match_index];
        uint x = 0;
        uint teamLoserSumMinusTaxes;
        require(_match.won != 2);
        if (_match.won == 0){
            require(_match.betsToTeam0[msg.sender] != 0);
            teamLoserSumMinusTaxes = _match.team1BetSum * _match.TAX;
            x = _match.betsToTeam0[msg.sender] * teamLoserSumMinusTaxes;
            x = x / _match.team0BetSum;
            _match.betsToTeam0[msg.sender] = 0;
            msg.sender.transfer(x);
        }
        if (_match.won == 1) {
            require(_match.betsToTeam1[msg.sender] != 0);
            teamLoserSumMinusTaxes = _match.team0BetSum * _match.TAX;
            x = _match.betsToTeam1[msg.sender] * teamLoserSumMinusTaxes;
            x = x / _match.team1BetSum;
            _match.betsToTeam1[msg.sender] = 0;
            msg.sender.transfer(x);
        }
    }

    function kill() external onlyCEO {
        require(msg.sender == ceoAddress);
        selfdestruct(ceoAddress);
    }


    function() public payable{}


}


