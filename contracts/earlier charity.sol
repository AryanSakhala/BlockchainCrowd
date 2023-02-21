pragma solidity ^0.8.0;

contract Charity {
    address public manager;
    uint256 public totalamount = 0;

    // mapping to store the total balance of each user
    mapping(address => uint256) public userBalances;
    // mapping to store the agreement of each user
    mapping(address => bool) public userAgreements;
    // variable to store the total number of donors
    uint256 public totalDonors;
    // mapping to store the total number of votes of each user
    mapping(address => uint256) public userVotes;
    //set to store unique donors
    mapping(address => bool) public donors;

    // constructor
    constructor() public {
        manager = msg.sender;
    }

    function donate() public payable {
        // check if the amount of Ether sent is greater than 0.1 Ether
        require(
            msg.value >= 100 wei,
            "Ether value must be greater than 0.1 Ether"
        );
        if(donors[msg.sender]==false){
        totalDonors++;}
        // mark the user as a donor
        donors[msg.sender] = true;
        // add the received Ether to the total balance
         totalamount += msg.value;
        // userBalances[msg.sender] += msg.value;

        
    }

    

    function checkBalance() public view returns (uint256) {
        require(msg.sender == manager, "Caller is not the manager");
        return totalamount;
    }

    // function to request money
    function requestMoney(address payable user, uint256 amount) public payable {
        // check if the user is a donor
        require(donors[user] == true, "User is not a donor");
        // check if the user has enough balance
        require(
            userBalances[user] >= amount,
            "User does not have enough balance"
        );
        // check if 50% of total donors have agreed
        require(
            userVotes[user] >= (totalDonors / 2),
            "50% of total donors must have agreed to process the request"
        );
        // check if the amount of requested Ether is less than the total amount
        require(amount <= totalamount, "NO FUNDS AVAILABLE");
        // send the requested amount to the user
        user.transfer(amount);
    }

    function vote(address user) public {
        require(donors[msg.sender] == true, "Caller is not a donor");
        userVotes[user]++;
    }
}