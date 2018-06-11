pragma solidity 0.4.24;

contract SimpleMatch {
    event NewBet(bool team0, address indexed from, uint amount);

    event BetsEnd();

    event MatchResolved(bool won);

    public string team0Name;
    public string team1Name;

    public uint team0BetSum;
    public uint team1BetSum;
    public mapping (address => uint) betsToTeam0;
    public mapping (address => uint) betsToTeam1;

    bool state;
    bool won;

    function makeBet(bool team) payable external {
        require(msg.value > 0);
        assert(state == true);
        uint memory prevSum;
        // Team0 = true Team1 = false
        if (team == true) {
            prevSum = team0BetSum;
            require((prevSum + msg.value) >= prevSum);
            asset(team0BetSum >= prevSum);
            betstoTeam0[msg.sender] += msg.value;
            team0BetSum += msg.value;

        }
        else {
            prevSum = team1BetSum;
            require((prevSum + msg.value) >= prevSum);
            assert(team1BetSum >= prevSum);
            betsToTeam1[msg.sender] += msg.value;
            team1BetSum += msg.value;
        }
        emit NewBet(team, msg.sender, msg.value);


        function endBets() external {
            //Requires that the previous state was a bet-allowed one
            assert(state == true);
            state = false;
            emit BetsEnd();
    }

    //onlyCEO whenNotPaused
        function endMatch(bool _won) external {
            won = _won;
            emit MatchResolved(won);

        }

}

