pragma solidity ^0.8.0;

contract CrowdFund {
    address public manager;
    uint256 public totalamount = 0;

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
        // add the received Ether to the total balance
        totalamount += msg.value;
    }

    function checkBalance() public view returns (uint256) {
        require(msg.sender == manager, "Caller is not the manager");
        return totalamount;
    }

    // function to request money
    function requestMoney(address payable user, uint256 amount) public payable {
        require(
            msg.value <= amount,
            "Sent value is greater than the requested amount"
        );

        user.transfer(amount);
    }
}

//0xC1A8834517A1359872027146759D0B260AEdc1dB - current smart contract address
//0x1a46a972d482a76d065c5917d993693aa241202f7c398be7203b5cc16169866f
